const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const { findUser } = require("../utils/auth-utils.js");
const bcrypt = require("bcrypt");

// TODO check the password and password_confirmation match can be done in front end?

async function signUp(req, res) {
  // check password + confirmation first
  if (req.body.password === req.body.password_confirmation) {
    try {
      console.log(req.body);
      const newUser = await User.create(req.body);
      const { firstName, username, email, id } = newUser;

      console.log("new User----", newUser);
      console.log("username----", username);

      const token = jwt.sign({ username, email, id }, process.env.SECRET_KEY);

      res.status(201);

      return res.json({ firstName, username, jwt: token });
    } catch (err) {
      console.log(err.errors[0].message);
      res.status(500);
      return res.json({ error: err.errors[0].message || err });
    }
  } else {
    // res.status(402)
    return res.status(422).json({
      error: "Password confirmation does not match password entered",
    });
  }
}

async function signIn(req, res) {
  try {
    // const user = findUser(req.body.email);

    const user = await findUser(req.body.username);
    // if destructure fails (no user) then it's assigned an empty object
    const { firstName, lastName, username, email, id, password } = user || {};

    if (!user || !bcrypt.compareSync(req.body.password, password)) {
      res.status(400);
      return res.json({ error: "Authentication failed" });
    }

    res.status(200);
    const token = jwt.sign({ username, email, id }, process.env.SECRET_KEY);
    return res.json({ firstName, lastName, username, jwt: token });
  } catch (err) {
    res.status(500);
    return res.json({ error: err.message });
  }
}

// use loginRequired in other model routes. See example in user_controller (similar to before action authenticate in rails)
const loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401);
    return res.json({ error: "Unauthorised operation" });
  }
};

const authoriseUser = (reqUserId, ownerId) => {
  if (reqUserId != ownerId) {
    throw Error("Unauthorised Operation");
  }
  console.log("[✓] User Verified");
};

// const checkOwnership to handle update and delete

module.exports = {
  signUp,
  signIn,
  loginRequired,
  authoriseUser,
};
