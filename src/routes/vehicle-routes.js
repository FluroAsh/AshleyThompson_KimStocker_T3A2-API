const express = require('express');
const vehiclesRouter = express.Router();

const { getVehicles } = require('../controllers/vehicle-controller');

vehiclesRouter.get('/', getVehicles);

module.exports = {
  vehiclesRouter,
};
