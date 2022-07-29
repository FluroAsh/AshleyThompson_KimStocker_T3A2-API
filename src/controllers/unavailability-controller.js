const db = require("../models");
const unavailability = require("../models/unavailability");
const sequelize = db.sequelize;
const { Unavailability, Charger } = db;
const { getChargerById } = require("../utils/charger-utils");
const { authoriseUser } = require("./auth-controller");

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
async function deleteUnavailability(req, res) {
  try {
    const { id: UnavailabilityId } = req.params;
    const reqUserId = req.user.id;

    const unavailability = await Unavailability.findByPk(UnavailabilityId, {
      include: Charger,
    });
    const charger = await getChargerById(unavailability.Charger.id);

    authoriseUser(reqUserId, charger.Host.id); // request UserId should match the Hosts id
    unavailability.destroy();

    res.status(200).json({
      message: `Unavailability ${UnavailabilityId} successfully deleted`,
    });
  } catch (err) {
    res
      .status(404)
      .json({ error: "Bad request, please try again or check the URL" });
  }
}

module.exports = {
  createUnavailability,
  deleteUnavailability,
};
