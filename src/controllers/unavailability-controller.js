const db = require("../models");
const { getChargerById } = require("../utils/charger-utils");
const { authoriseUser } = require("./auth-controller");
const sequelize = db.sequelize;

// create unavailability
async function createUnavailability(req, res) {
  try {
    const data = { ...req.body };
    const reqUserId = req.user.id;

    const charger = await getChargerById(data.ChargerId);
    authoriseUser(reqUserId, charger.Host.id); // request UserId should match the Hosts id
    res.status(200).json({ message: "It worked!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// destroy unavailabiblity

module.exports = {
  createUnavailability,
};
