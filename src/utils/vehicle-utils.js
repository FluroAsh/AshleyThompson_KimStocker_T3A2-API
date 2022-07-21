const db = require('../models');
const { Vehicle } = db;
const Plug = db.Plug;
const Op = db.Sequelize.Op;

async function getAllVehicles() {
  
  try {

    return await Vehicle.findAll({
      include: Plug,
    });

  } catch (err) {

    res.status(500);
    return res.json({ error: err.message });
    
  }
}

module.exports = {
  getAllVehicles
}