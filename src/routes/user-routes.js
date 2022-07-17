
const express = require('express');
const { getUsers, getUser } = require('../controllers/user-controller');
const { loginRequired } = require('../controllers/auth-controller');

const userRouter = express.Router();

userRouter.use(loginRequired)
userRouter.get('/users', getUsers);
userRouter.get('/user/:id', getUser);

module.exports = {
  userRouter,
};

