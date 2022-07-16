const db = require('../models');
const Vehicle = db.Vehicle;

exports.getAllVehicles = () => Vehicle.findAll();
