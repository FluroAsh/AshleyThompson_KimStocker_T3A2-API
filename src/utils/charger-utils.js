const { PublicAccessBlockConfiguration } = require("@aws-sdk/client-s3");
const db = require("../models");
const { Charger, User, Address, Plug } = db;
const Op = db.Sequelize.Op;

/** Returns a promise */
async function getAllChargers() {
  return await Charger.findAll({
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

async function getChargerById(id) {
  // TODO: eager loading doesnt work

  return await Charger.findByPk(id, {
    include: [
      {
        model: Address,
        // attributes: { exclude: ['UserId'] },
      },
      {
        model: User,
      },
    ],
  });
}
// return await Charger.findOne({
//   where: { id },

//   include: [
//     {
//       model: Address,
//       as: "Address",
//     },
//     {
//       model: User,
//       as: "User",
//     },
//   ],
// });

async function deleteChargerById(id) {
  Charger.destroy({
    where: { id },
  });
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
};
