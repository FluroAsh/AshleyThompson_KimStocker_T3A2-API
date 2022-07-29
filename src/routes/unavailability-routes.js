const express = require("express");
const unavailabilityRouter = express.Router();

unavailabilityRouter.post("/unavailability/new");
unavailabilityRouter.delete("/unavailability");

module.exports = {
  unavailabilityRouter,
};
