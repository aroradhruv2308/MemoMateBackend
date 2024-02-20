const user = require("../db/schema/user.js");

const fetchNotesMiddleware = async function (req, res, next) {
  const { username, password } = req.user;

  console.log(username);
  result = await user.findOne({ username: username });
  console.log(result);
  req.notes = result.notes;
  next();
};

const createNewNote = async function (req, res, next) {
  const { username, password } = req.user;

  console.log(username);
  result = await user.findOne({ username: username });
  const newNote = { title: req.body.title, subtitle: req.body.subtitle };

  result.notes.push(newNote);

  try {
    await result.save();
    console.log("Note added and document saved successfully.");
  } catch (error) {
    console.error("Error saving document:", error);
  }
  console.log(result);
  req.notes = result.notes;
  next();
};

const updateExistingNote = async function (req, res, next) {
  const { username } = req.user;
  const noteIndex = req.params.noteIndex;

  try {
    const result = await user.findOne({ username: username });
    const notes = result.notes;

    if (noteIndex !== -1) {
      notes[noteIndex].title = req.body.title;
      notes[noteIndex].subtitle = req.body.subtitle;
      await result.save();
      console.log("Note updated successfully.");
      req.notes = result.notes;
    } else {
      console.log("Note not found.");
    }
  } catch (error) {
    console.error("Error updating note:", error);
  }

  next();
};

module.exports = { fetchNotesMiddleware, createNewNote, updateExistingNote };
