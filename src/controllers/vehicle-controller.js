const { getAllVehicles } = require('../utils/vehicle-utils');

async function getVehicles(req, res) {
  try {
    const vehicles = await getAllVehicles;
    if (!vehicles) {
      throw Error;
    }
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(400).json({ error: 'No vehicles found!' });
  }
}

module.exports = { getVehicles };
