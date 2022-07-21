const db = require('../models');
const User = db.User;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const { findUser } = require('../utils/auth-utils.js');
const bcrypt = require('bcrypt');

// TODO check the password and password_confirmation match can be done in front end?

async function signUp(req, res) {
  if (req.body.password === req.body.password_confirmation) {
    try {
      const newUser = await User.create(req.body);

      const { username, email, id } = newUser.dataValues;

      console.log('new User----', newUser.dataValues);
      console.log('username----', username);

      const token = jwt.sign({ username, email, id }, process.env.SECRET_KEY);

      res.status(201);

      return res.json({ username, jwt: token });
    } catch (err) {
      res.status(500);
      return res.json({ error: err.message });
    }
  } else {
    // res.status(402)
    return res.json({
      error: 'Password confirmation does not match password entered',
    });
  }
}

async function signIn(req, res) {
  try {
    // const user = findUser(req.body.email);

    const user = await findUser(req.body.email);

    const { username, email, id, password } = user.dataValues;

    if (!user || !bcrypt.compareSync(req.body.password, password)) {
      res.status(400);
      return res.json({ error: 'authentication failed' });
    } else {
      res.status(200);
      //res.send(user.username)
      const token = jwt.sign({ username, email, id }, process.env.SECRET_KEY);
      return res.json({ username, jwt: token });
    }
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
    return res.json({ error: 'Unauthorised operation' });
  }
};

// const checkOwnership to handle update and delete

module.exports = {
  signUp,
  signIn,
  loginRequired,
};
