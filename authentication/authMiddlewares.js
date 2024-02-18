var jwt = require("jsonwebtoken");
const user = require("../db/schema/user.js");
const authorizeUser = (req, res, next) => {
  const { token } = req.headers;
  if (token) {
    try {
      var decoded = jwt.verify(token, process.env.JWTSECRETKEY);
      req.user = decoded;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

const loginUser = async function (req, res, next) {
  try {
    const { username, password } = req.headers;
    const doc = await user.findOne({ username: "username" }).exec();
    if (doc) {
      if (doc.password == this.password) {
        req.user = doc;
        var token = jwt.sign({ foo: "bar" }, process.env.JWTSECRETKEY);
        req.token = token;
        next();
      } else {
        req.status(401).json({ error: "InCorrect Password" });
      }
    } else {
      req.status(401).json({ error: "User Not Found" });
    }
  } catch (error) {
    next(error);
  }
};

const signUpUser = async function (req, res, next) {
  try {
    const { username, password } = req.headers;
    const doc = await user.findOne({ username: "username" }).exec();
    if (!doc) {
      user.insertOne({ username: username, password: password });
      req.user = { username, password };
      next();
    } else {
      req.status(401).json({ error: "User Already Exists" });
    }
  } catch (error) {
    next(err);
  }
};

module.exports = { authorizeUser, signUpUser, loginUser };
