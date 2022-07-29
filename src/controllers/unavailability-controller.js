const db = require("../models");
const sequelize = db.sequelize;
const { Unavailability } = db;
const { getChargerById } = require("../utils/charger-utils");
const { authoriseUser } = require("./auth-controller");

// create unavailability
async function createUnavailability(req, res) {
  try {
    const data = { ...req.body };
    const reqUserId = req.user.id;

    const charger = await getChargerById(data.ChargerId);
    authoriseUser(reqUserId, charger.Host.id); // request UserId should match the Hosts id

    await sequelize.transaction(async (t) => {
      const unavailability = await Unavailability.create(data, {
        transaction: t,
      });
      res.status(201).json(unavailability);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// destroy unavailabiblity

module.exports = {
  createUnavailability,
};
