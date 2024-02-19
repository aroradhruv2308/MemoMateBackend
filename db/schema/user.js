const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  notes: { type: Schema.Types.ObjectId, ref: "Notes" },
});

var user = mongoose.model("User", userSchema);
module.exports = { user, userSchema };
