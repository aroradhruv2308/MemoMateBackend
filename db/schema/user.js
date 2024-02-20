const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemoNote = new Schema({
  title: String,
  subtitle: String,
});

const userSchema = new Schema({
  username: String,
  password: String,
  notes: [MemoNote],
});

const user = mongoose.model("User", userSchema);
module.exports = user;
