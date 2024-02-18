const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  notesList: [{ type: Schema.Types.ObjectId, ref: "MemoNote" }],
});

var notes = mongoose.model("Note", noteSchema);
module.exports(notes);
