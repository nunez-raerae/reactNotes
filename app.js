import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";

// import mongoose from "mongoose";
import db from "./db.js";
import bodyParser from "body-parser";
import MyModel from "./notesModel.js";
import UserSignUp from "./userModel.js";
import Auth from "./auth.js";
// import IsError from "./errorhandling.js";
import VerifyUser from "./verifyUser.js";
import ReqHandler from "./reqHandler.js";

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen("8080", () => {
  console.log("running on 8080");
});
db();

app.get("/", async (req, res) => {
  const verifyRes = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoidXNlclJhZTEiLCJwYXNzd29yZCI6InVzZXJSYWUiLCJhY2Nlc3NUb2tlbiI6ImR3YWR3YWQiLCJfaWQiOiI2M2MwZWU5M2ExODc5ZjUwODRjMWZhOWYiLCJfX3YiOjB9LCJpYXQiOjE2NzM1ODgzNzEsImV4cCI6MTY3MzU5MTk3MX0.ag21yGC-yL7bKh734OTjylOix5fXev1N3pgXvz6kH64";
  const reQuest = await ReqHandler({ verifyRes });
  if (reQuest === "error") {
    res.send("error");
    return;
  }
  res.send("Hello World!");
});

app.post("/post", (req, res) => {
  const newD = MyModel.create(req.body);
  res.send(newD);
});

app.post("/signUp", async (req, res) => {
  let params = [];
  params.push({
    username: req.body.username,
    password: req.body.password,
    accessToken: "dwadwad",
  });
  const exist = await UserSignUp.findOne({ username: req.body.username });
  if (exist) {
    res.send({ success: false, message: "Account Already Exist!" });
    return;
  }

  var user = new UserSignUp(params[0]);
  const userDetails = await user
    .save()
    .then((save) => {
      return save;
    })
    .catch((error) => {
      console.log(error);
    });

  if (userDetails) {
    const token = jwt.sign({ data: userDetails }, process.env.SECRETE_KEY, {
      expiresIn: "1hr",
    });
    const result = await Auth({ token, userDetails });
    if (result.errors) {
      res.send({ success: false, message: result.message });
      return;
    }
    res.send({ tkn: result.accessToken });
  }
});

app.post("/login", async (req, res) => {
  const params = req.body;
  const loginRes = await UserSignUp.findOne(params);
  if (loginRes) {
    const verifyRes = await VerifyUser({ loginRes });
    if (verifyRes === "error") {
      res.send({ success: false, message: "auth Error" });
      return;
    }
    const test = await ReqHandler({ verifyRes });

    res.send({ success: true, tkn: verifyRes });
    return;
  }
  res.send({ success: false, message: "auth Error" });
});
