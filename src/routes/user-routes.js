const { getUsers } = require('../controllers/user-controller');
const express = require('express');

const userRouter = express.Router()

userRouter.get('/users', getUsers)


module.exports = {
    userRouter
};