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
    console.log(err.message);
    // TODO: propagate error

    // res.status(500);
    // return res.json({ error: err.message });
  }
}

async function getChargerById(id) {
  // TODO: eager loading doesnt work
  return await Charger.findOne({
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
}

async function deleteChargerById(id) {
  Charger.destroy({
    where: { id },
  });
}

async function getPlugId(plugName) {
  try {
    const plug = await Plug.findOne({
      where: { plugName },
    });

    return plug.id;
  } catch (err) {
    console.log(err.message);
    // res.status(500);
    // return res.json({ error: err.message });
  }
}

module.exports = {
  getAllChargers,
  getChargerById,
  deleteChargerById,
  getPlugId,
};
