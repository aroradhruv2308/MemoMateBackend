const mongoose = require("mongoose");

async function connectToDb() {
  await mongoose.connect(process.env.URI);
  console.log("db connected successfully");
}

module.exports = connectToDb;
