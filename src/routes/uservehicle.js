const express = require("express");
const userVehicleRouter = express.Router();
const { createUserVehicle } = require("../controllers/uservehicle-controller");

userVehicleRouter.post("/uservehicle/new", createUserVehicle);

module.exports = {
  userVehicleRouter,
};
