const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var memoNoteSchema = Schema({
  title: String,
  date: { type: Date, default: Date.now },
});

var MemoNote = mongoose.model("MemoNote", memoNoteSchema);
module.exports = MemoNote;
