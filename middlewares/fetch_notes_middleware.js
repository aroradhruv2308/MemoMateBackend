const user = require("../db/schema/user.js");
const mongoose = require("mongoose");

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
  const noteIndex = req.query.index;

  try {
    const result = await user.findOne({ username: username });
    console.log("printing username", username);
    console.log("printin result", result);
    console.log("printin noteIndex", noteIndex);

    const notes = result.notes;
    if (noteIndex !== -1) {
      result.notes[noteIndex].title = req.body.title;
      result.notes[noteIndex].subtitle = req.body.subtitle;
      console.log("edited result", req.body);
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

const addNewNote = async function (req, res, next) {
  const { username } = req.user;
  const newNote = {
    title: req.body.title,
    subtitle: req.body.subtitle,
  };

  try {
    const result = await user.findOneAndUpdate(
      { username: username },
      { $push: { notes: newNote } },
      { new: true }
    );
    console.log("New note added successfully:", newNote);
    req.notes = result.notes;
  } catch (error) {
    console.error("Error adding new note:", error);
  }

  next();
};

const deleteExistingNote = async function (req, res, next) {
  const { username } = req.user;
  const noteIndex = parseInt(req.query.index); // Convert to number
  console.log("delete", noteIndex);
  let result; // Declare result variable outside the try block

  try {
    result = await user.findOneAndUpdate(
      { username: username },
      { $unset: { [`notes.${noteIndex}`]: "" } }, // Unset the note at the specified index
      { new: true }
    );
    console.log("Note deleted successfully:", noteIndex);
    req.notes = result.notes.filter(Boolean); // Remove null values from the array
  } catch (error) {
    console.error("Error deleting note:", error);
  }

  next();
};

module.exports = {
  fetchNotesMiddleware,
  createNewNote,
  updateExistingNote,
  addNewNote,
  deleteExistingNote,
};
