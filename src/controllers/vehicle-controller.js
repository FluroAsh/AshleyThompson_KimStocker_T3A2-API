const {
  getAllVehicles,
  getAllUserVehicles,
} = require('../utils/vehicle-utils');

async function getVehicles(req, res) {
  try {
    const vehicles = await getAllVehicles();
    if (!vehicles) {
      throw Error;
    }
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(404).json({ error: 'No vehicles found!' });
  }
}

async function getUserVehicles(req, res) {
  try {
    const userVehicles = await getAllUserVehicles();
    if (!userVehicles) {
      throw Error;
    }
    res.status(200).json(userVehicles);
  } catch (err) {
    res.status(404).json({ error: 'No vehicles found!' });
  }
}

module.exports = { getVehicles, getUserVehicles };
