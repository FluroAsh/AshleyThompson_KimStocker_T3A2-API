const db = require("../models");
const { User, Address, Booking, Charger, Vehicle } = db;
const Op = db.Sequelize.Op;

async function findUser(userInput) {
  return User.findOne({
    // can login with either username OR email
    where: { [Op.or]: [{ username: userInput }, { email: userInput }] },
    include: Address,
  });
}

module.exports = {
  findUser,
};
