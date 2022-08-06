const { getAllVehicles } = require("../utils/vehicle-utils");
const db = require("../models");
const sequelize = db.sequelize;
const { Vehicle } = db;

async function getVehicles(req, res) {
  try {
    const vehicles = await getAllVehicles();
    if (!vehicles) {
      throw Error;
    }
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(404).json({ error: "No vehicles found!" });
  }
}

async function createVehicle(req, res) {
  const data = { ...req.body };
  try {
    await sequelize.transaction(async (t) => {
      const vehicle = await Vehicle.create(data, { transaction: t });
      res.status(200)
      res.json(vehicle);
    });
  } catch (err) {
    res.status(500)
    res.json({ error: err.message });
  }
}

module.exports = { getVehicles, createVehicle };
