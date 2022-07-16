const express = require('express');
const { getVehicles } = require('../controllers/vehicle-controller');
const vehiclesRouter = express.Router();

vehiclesRouter.get('/', getVehicles);

module.exports = {
  vehiclesRouter,
};
