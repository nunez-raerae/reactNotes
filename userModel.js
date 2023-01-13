import mongoose from "mongoose";
mongoose instanceof mongoose.Mongoose;
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  username: String,
  password: String,
  accessToken: String,
});


const UserSignUp = mongoose.model("user", User);

export default UserSignUp;
