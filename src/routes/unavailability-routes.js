const express = require("express");
const {
  createUnavailability,
  deleteUnavailability,
} = require("../controllers/unavailability-controller");
const unavailabilityRouter = express.Router();

unavailabilityRouter.post("/unavailability/new", createUnavailability);
unavailabilityRouter.delete("/unavailability/:id", deleteUnavailability);

module.exports = {
  unavailabilityRouter,
};
