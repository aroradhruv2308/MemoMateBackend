const user = require("../db/schema/user.js");

const fetchNotesMiddleware = async (req, res, next) => {
  const username = req.username;
  let res = await user.findOne({ username: username }).exe();
  console.log(res);
};

module.exports = { fetchNotesMiddleware };
