import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Notes = new Schema({
  notesName: String,
  date: { type: Date, default: Date.now },
  status: { type: Boolean },
  desc: { type: String },
});

const MyModel = mongoose.model("list", Notes);

export default MyModel;
