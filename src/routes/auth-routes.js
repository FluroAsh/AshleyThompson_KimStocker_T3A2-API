const { signUp } = require("../controllers/auth-controller");
const express = require('express');

const authRouter = express.Router()

authRouter.post('/signup', signUp)


module.exports = {
    authRouter
};