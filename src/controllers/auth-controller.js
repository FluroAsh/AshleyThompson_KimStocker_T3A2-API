const db = require("../models");
const User = db.User;
const sequelize = db.sequelize;
const Address = db.Address;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const { findUser } = require("../utils/auth-utils.js");
const bcrypt = require("bcrypt");
require("dotenv").config();

// TODO check the password and password_confirmation match can be done in front end?

async function signUp(req, res) {
  // check password + confirmation first
  if (req.body.password === req.body.password_confirmation) {
    try {
      await sequelize.transaction(async (t) => {
        console.log(req.body);

        let userData = {};
        userData.username = req.body.username;
        userData.firstName = req.body.firstName;
        userData.lastName = req.body.lastName;
        userData.email = req.body.email;
        userData.password = req.body.password;

        const newUser = await User.create(userData, { transaction: t });
        const { firstName, lastName, username, email, id } = newUser;

        console.log("new User----", newUser);
        console.log("username----", username);

        const token = jwt.sign({ username, email, id }, process.env.SECRET_KEY);

        let addressData = {};

        const { address, city, postcode, state } = req.body;

        addressData.address = address;
        addressData.city = city;
        addressData.postcode = postcode;
        addressData.state = state;
        addressData.UserId = newUser.id;

        const newAddress = await Address.create(addressData, {
          transaction: t,
        });
        console.log("NEW ADDRESS", newAddress);

      });


      res.status(201);
      return res.json({ firstName, lastName, username, jwt: token });
    } catch (err) {
      // console.log(err.errors[0].message);
      res.status(500);
      return res.json({ error: err.message || err.errors[0].message });
    }
  } else {
    res.status(422);
    return res.json({
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
      return res.json({ error: "Username or password is incorrect" });
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
    return res.json({ error: "Please sign in to continue" });
  }
};

// TODO: May need to handle this differently. Refer to handleUnauthorised function
const authoriseUser = (reqUserId, ownerId) => {
  if (reqUserId != ownerId) {
    throw Error("Unauthorised Operation");
  }
  console.log("[✓] User Verified");
};

module.exports = {
  signUp,
  signIn,
  loginRequired,
  authoriseUser,
};
