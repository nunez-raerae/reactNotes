import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import UserSignUp from "./userModel.js";
dotenv.config();

async function ReqHandler({ verifyRes }) {
  const dec = jwt.verify(
    verifyRes,
    process.env.SECRETE_KEY,
    (error, decoded) => {
      if (error) {
        return "error";
      }
      return decoded;
    }
  );
  return dec;
}

export default ReqHandler;
