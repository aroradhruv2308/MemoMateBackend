const express = require("express");
const connectToDb = require("./db/connection.js");
var cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectToDb().then(
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  })
);
