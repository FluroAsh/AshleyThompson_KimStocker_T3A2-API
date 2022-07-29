const { PublicAccessBlockConfiguration } = require("@aws-sdk/client-s3");
const db = require("../models");
const { Charger, User, Address, Plug, Unavailability } = db;
const Op = db.Sequelize.Op;

/** Returns a promise */
async function getAllChargers() {
  return await Charger.findAll({
    include: [
      {
        model: User,
        as: "Host",
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      },
      {
        model: Address,
        as: "Address",
      },
    ],
  });
}

async function getChargerById(id) {
  return await Charger.findByPk(id, {
    include: [
      {
        model: User,
        as: "Host",
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      },
      {
        model: Address,
        as: "Address",
      },
      {
        model: Unavailability,
      },
    ],
  });
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
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      },
    ],
  });

  return chargers;
}

async function getPlugId(plugName) {
  const plug = await Plug.findOne({
    where: { plugName },
  });

  return plug.id;
}

module.exports = {
  getAllChargers,
  getChargerById,
  deleteChargerById,
  getPlugId,
  getChargersByLocation,
};
