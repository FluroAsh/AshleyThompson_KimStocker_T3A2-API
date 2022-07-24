const express = require("express");
const vehiclesRouter = express.Router();

const { getVehicles } = require("../controllers/vehicle-controller");

vehiclesRouter.get("/vehicles", getVehicles);

module.exports = {
  vehiclesRouter,
};
