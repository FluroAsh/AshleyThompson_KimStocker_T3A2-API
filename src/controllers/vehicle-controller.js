const { getAllVehicles, getVehiclePlugs } = require('../utils/vehicle-utils');

async function getVehicles(req, res) {
  try {
    const vehicles = await getAllVehicles();
    console.log(vehicles);
    if (!vehicles) {
      throw Error;
    }
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(404).json({ error: 'No vehicles found!' });
  }
}

module.exports = { getVehicles };
