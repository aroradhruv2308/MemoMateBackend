var jwt = require("jsonwebtoken");
const { user } = require("../db/schema/user.js");
const { MemoNote } = require("../db/schema/memo_note.js");
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
    const doc = await user.findOne({ username: username }).exec();
    if (doc) {
      if (doc.password == password) {
        var token = jwt.sign({ foo: "bar" }, process.env.JWTSECRETKEY);
        req.token = token;
        next();
      } else {
        res.status(401).json({ error: "InCorrect Password" });
      }
    } else {
      res.status(401).json({ error: "User Not Found" });
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
      const newUser = new user({
        username: username,
        password: password,
      });

      const memoNote1 = new MemoNote({ title: "Go To Gym" });
      const memoNote2 = new MemoNote({ title: "Crazy Study" });
      const memoNote3 = new MemoNote({ title: "Do Office Work" });
      const memoNote4 = new MemoNote({ title: "Sleep Early" });

      savedUser = await newUser.save();
      console.log(savedUser);
      req.user = newUser;
      next();
    } else {
      req.status(401).json({ error: "User Already Exists" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { authorizeUser, signUpUser, loginUser };
