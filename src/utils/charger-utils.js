const db = require('../models');
const { Charger, Image } = db;
const Op = db.Sequelize.Op;

/** Returns a promise */
exports.getAllChargers = () => Charger.findAll({
    include: Image,
    as: "image"
});

// exports.getUserById = (id) =>
//   User.findByPk(id, {
//     include: Address,
//   });

// exports.getAllVehicles = () =>
//   Vehicle.findAll({
//     include: Plug,
//   });