const express = require("express");
const connectToDb = require("./db/connection.js");
var bodyParser = require("body-parser");
const {
  fetchNotesMiddleware,
  createNewNote,
} = require("./middlewares/fetch_notes_middleware.js");
const {
  signUpUser,
  loginUser,
  authorizeUser,
} = require("./authentication/authMiddlewares.js");
var cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.post("/signup", signUpUser, (req, res) => {
  if (req.user) {
    res.status(200).send("user registered successfully");
  }
});

app.post("/signin", loginUser, (req, res) => {
  if (req.token) {
    res.status(200).json({
      token: req.token,
      message: "user login successfully",
    });
  }
});

app.get("/notes", authorizeUser, fetchNotesMiddleware, (req, res) => {
  if (req.user) {
    if (req.notes) {
      res.status(200).json({
        token: req.token,
        message: "fetched notes successfully",
        notes: req.notes,
      });
    } else {
      res.status(401).send("unable to fetch notes for this user");
    }
  } else {
    res.status(401).send("Unauthorized Req");
  }
});

app.post("/createNote", authorizeUser, createNewNote, (req, res) => {
  if (req.user) {
    if (req.notes) {
      res.status(200).json({
        token: req.token,
        message: "created notes successfully",
        notes: req.notes,
      });
    } else {
      res.status(401).send("unable to fetch notes for this user");
    }
  } else {
    res.status(401).send("Unauthorized Req");
  }
});

app.put("/updateNote", authorizeUser, fetchNotesMiddleware, (req, res) => {
  if (req.user) {
    if (req.notes) {
      res.status(200).json({
        token: req.token,
        message: "fetched notes successfully",
        notes: req.notes,
      });
    } else {
      res.status(401).send("unable to fetch notes for this user");
    }
  } else {
    res.status(401).send("Unauthorized Req");
  }
});

connectToDb().then(
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  })
);
