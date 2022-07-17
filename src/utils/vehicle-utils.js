const db = require('../models');
const Vehicle = db.Vehicle;
const Plug = db.Plug;
const Op = db.Sequelize.Op;

exports.getAllVehicles = () => Vehicle.findAll();

exports.getAllUserVehicles = () =>
  Vehicle.findAll({
    include: Plug,
  });
