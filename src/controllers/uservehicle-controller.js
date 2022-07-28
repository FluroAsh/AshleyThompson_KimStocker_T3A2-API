const db = require("../models");
const sequelize = db.sequelize;
const { UserVehicle } = db;

async function createUserVehicle(req, res) {
  const data = { ...req.body };
  try {
    await sequelize.transaction(async (t) => {
      const userVehicle = await UserVehicle.create(data, { transaction: t });
      res.status(201).json(userVehicle);
    });
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
}

module.exports = {
  createUserVehicle,
};
