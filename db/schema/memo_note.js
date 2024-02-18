const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var memoNoteSchema = Schema({
  title: String,
  points: [
    {
      type: String,
    },
  ],
  date: Date,
});

var memoNote = mongoose.model("MemoNote", memoNoteSchema);
module.exports(memoNote);
