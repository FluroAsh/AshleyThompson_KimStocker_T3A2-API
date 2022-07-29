const express = require("express");
const {
  createUnavailability,
} = require("../controllers/unavailability-controller");
const unavailabilityRouter = express.Router();

unavailabilityRouter.post("/unavailability/new", createUnavailability);
unavailabilityRouter.delete("/unavailability/:id");

module.exports = {
  unavailabilityRouter,
};
