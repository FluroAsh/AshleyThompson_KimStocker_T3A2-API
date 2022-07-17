const db = require('../models');
const Vehicle = db.Vehicle;
const Plug = db.Plug;
const Op = db.Sequelize.Op;

/* Vehicle Queries */
exports.getAllVehicles = () => Vehicle.findAll();

/* Plug Queries */
exports.getVehiclePlugs = () =>
  Vehicle.findOne({
    where: {
      model: 'e-tron suv',
    },
    include: Plug,
  });
