const db = require("../models");
const sequelize = db.sequelize;
const { Address } = db;

async function createAddress(req, res) {
  const data = { ...req.body };
  try {
    await sequelize.transaction(async (t) => {
      const address = await Address.create(data, { transaction: t });
      res.status(200).json(address);
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  createAddress,
};
