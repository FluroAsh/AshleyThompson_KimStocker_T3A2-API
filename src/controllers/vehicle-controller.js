const { getAllVehicles } = require("../utils/vehicle-utils");
const db = require("../models");
const sequelize = db.sequelize;
const { Vehicle } = db;
const { findUser } = require("../utils/auth-utils");
const { getPlugId } = require("../utils/charger-utils");

async function getVehicles(req, res) {
  try {
    const vehicles = await getAllVehicles();
    if (!vehicles) {
      throw Error;
    }
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(404).json({ error: "No vehicles found!" });
  }
}

async function createVehicle(req, res) {
  const data = { ...req.body };

  console.log("THIS IS DAT RECEIVE", data)
  const user = await findUser(req.user.username);
  if (!user) {
    res.status(404);
    return res.json({ error: `Unknown user ${data.username}` });
  }

  const plugId = await getPlugId(data.plugName);

  data["UserId"] = user.id;
  data["PlugId"] = plugId;

  try {
    await sequelize.transaction(async (t) => {
      const vehicle = await Vehicle.create(data, { transaction: t });
      res.status(200);
      res.json({ message: "Vehicle successfully created" });
    });
  } catch (err) {

    console.log("THIS IS THE ERRROR FROM CREate vehicle", err.message)
    res.status(500);
    res.json({ message: err.message });
  }
}

module.exports = { getVehicles, createVehicle };
