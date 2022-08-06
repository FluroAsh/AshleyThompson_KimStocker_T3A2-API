const express = require("express");
const userRouter = express.Router();

const {
  getUsers,
  getUser,
  checkHostPrivledge,
} = require("../controllers/user-controller");
const { loginRequired } = require("../controllers/auth-controller");

/** 'Public' requests */
userRouter.get("/users", getUsers);
userRouter.get("/user/check-host", checkHostPrivledge);
userRouter.get("/user/:id", getUser);

/** 'Private'  requests */
/**
 * Include loginRequired middleware after the route URL
 * eg: userRouter.put('/user/:id', loginRequired, updateUser)
 */

module.exports = {
  userRouter,
};
