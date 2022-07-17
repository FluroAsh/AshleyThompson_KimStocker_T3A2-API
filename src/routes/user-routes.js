const { getUsers } = require('../controllers/user-controller');
const express = require('express');
const userRouter = express.Router();
const { loginRequired } = require('../controllers/auth-controller');




userRouter.use(loginRequired)

userRouter.get('/users', getUsers)


module.exports = {
    userRouter
}