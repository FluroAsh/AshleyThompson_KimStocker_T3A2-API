const db = require("../models");
const { Charger, User, Address } = db;
const Op = db.Sequelize.Op;

/** Returns a promise */
async function getAllChargers() {
  try {
    const chargers = await Charger.findAll({
      include: Address,
    });

    return chargers;
  } catch (err) {
    res.status(500);
    return res.json({ error: err.message });
  }
}

async function getOneCharger(id) {
  try {
    const charger = await Charger.findOne(
      { where: { id: `${id}` } },
      {
        include: User,
      }
    );

    return charger;
  } catch (err) {
    res.status(500);
    return res.json({ error: err.message });
  }
}

module.exports = {
  getAllChargers,
  getOneCharger,
};
