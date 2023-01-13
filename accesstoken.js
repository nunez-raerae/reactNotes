import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AccessToken = new Schema({
  accessToken: { type: String, required: true },
  userId: String,
});

const AccessTkn = mongoose.model("token", AccessToken);

export default AccessTkn;
