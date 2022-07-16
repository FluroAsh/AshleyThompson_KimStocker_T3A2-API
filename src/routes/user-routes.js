const express = require('express');
const { getUsers, getUser } = require('../controllers/user-controller');

const userRouter = express.Router();

userRouter.get('/users', getUsers);
userRouter.get('/user/:id', getUser);

module.exports = {
  userRouter,
};
