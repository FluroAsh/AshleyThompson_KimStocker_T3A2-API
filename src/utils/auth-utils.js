const db = require("../models");
const { User, Address, Booking, Charger, Vehicle } = db;
const Op = db.Sequelize.Op;

async function findUser(username) {
  try {
    const user = await User.findOne({
      where: { username },
      include: Address,
      // [{ model: Address }, { model: Booking }, { model: Charger }, {model: Vehicle}],
    });
    return user.dataValues;
  } catch (err) {
    console.log(err.message);

    // res.status(500);
    // return res.json({ error: err.message });
  }
}

module.exports = {
  findUser,
};
