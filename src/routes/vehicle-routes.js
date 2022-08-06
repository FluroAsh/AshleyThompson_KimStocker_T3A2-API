const express = require("express");
const vehiclesRouter = express.Router();

const { getVehicles, createVehicle } = require("../controllers/vehicle-controller");

vehiclesRouter.get("/vehicles", getVehicles);
vehiclesRouter.post("/vehicle/new", createVehicle);



module.exports = {
  vehiclesRouter,
};
