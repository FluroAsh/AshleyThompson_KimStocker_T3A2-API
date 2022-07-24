const { PublicAccessBlockConfiguration } = require("@aws-sdk/client-s3");
const db = require("../models");
const { Charger, User, Address, Plug } = db;
const Op = db.Sequelize.Op;

/** Returns a promise */
async function getAllChargers() {
  try {
    const chargers = await Charger.findAll({
      include: [
        {
          model: Address,
          as: "Address",
        },
        {
          model: User,
          as: "User",
        },
      ],
    });

    return chargers;
  } catch (err) {
    res.status(500);
    return res.json({ error: err.message });
  }
}

async function getChargerById(id) {
  // TODO: eager loading doesnt work
  try {
    const charger = await Charger.findOne({
      where: { id },

      include: [
        {
          model: Address,
          as: "Address",
        },
        {
          model: User,
          as: "User",
        },
      ],
    });

    return charger;
  } catch (err) {
    res.status(500);
    return res.json({ error: err.message });
  }
}

async function deleteChargerById(id) {
  Charger.destroy({
    where: { id },
  });
}

async function getChargersByLocation(location) {
  const chargers = await Charger.findAll({
    include: [
      {
        model: Address,
        attributes: { exclude: ["UserId"] },
        where: {
          [Op.or]: {
            city: { [Op.iLike]: `%${location}%` },
            address: { [Op.iLike]: `%${location}%` },
            postcode: location,
            state: { [Op.iLike]: `%${location}%` },
          },
        },
      },
      {
        model: Plug,
      },
      {
        model: User,
        as: "Host",
        attributes: { exclude: ["email", "password"] },
      },
    ],
  });

  return chargers;
}

module.exports = {
  getAllChargers,
  getChargerById,
  deleteChargerById,
  getChargersByLocation,
};
