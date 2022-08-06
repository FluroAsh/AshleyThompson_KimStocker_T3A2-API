const db = require("../models");
const { Vehicle } = db;
const Plug = db.Plug;
const Op = db.Sequelize.Op;

exports.getAllVehicles = () =>
  Vehicle.findAll({
    include: Plug,
  });
