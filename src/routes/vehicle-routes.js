const express = require('express');
const vehiclesRouter = express.Router();

const {
  getVehicles,
  getUserVehicles,
} = require('../controllers/vehicle-controller');

vehiclesRouter.get('/', getVehicles);
vehiclesRouter.get('/user-vehicles', getUserVehicles);

module.exports = {
  vehiclesRouter,
};
