
const express = require('express');
const { getUsers, getUser } = require('../controllers/user-controller');
const { loginRequired } = require('../controllers/auth-controller');

const userRouter = express.Router();

/** 'Public' requests */
userRouter.get('/users', getUsers);
userRouter.get('/user/:id', getUser);

/** 'Private'  requests */
userRouter.use(loginRequired) 

module.exports = {
  userRouter,
};

