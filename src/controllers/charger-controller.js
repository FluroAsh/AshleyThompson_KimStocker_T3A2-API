const db = require("../models");
const sequelize = db.sequelize;
const Charger = db.Charger;
const {
  getAllChargers,
  getChargerById,
  deleteChargerById,
} = require("../utils/charger-utils");
const { findUser } = require("../utils/auth-utils");
const { v4: uuidv4 } = require("uuid");
const {
  uploadImageToS3,
  getSignedS3Url,
} = require("../services/awsS3-services");

// TODO: Double check all res.status

async function createCharger(req, res) {
  const data = { ...req.body };

  console.log("FILE NAME", req.file);
  const key = `uploads/${uuidv4()}-${req.file.originalname}`;

  data['bucket'] = process.env.AWS_BUCKET_NAME;
  data['key'] = key;

  try {
    // transaction ensure the record will be rolledback if an error occured during the try/catch block
    const result = await sequelize.transaction(async (t) => {
      const newCharger = await Charger.create(data, { transaction: t });
      await uploadImageToS3(req.file, key);

      res.status(200);

      // TODO: Exclude key, bucket and region out of the returned charger data
      return res.json(newCharger);
    });
  } catch (err) {
    res.status(500);
    return res.json({ error: err.message });
  }
}

async function getChargers(req, res) {
  const chargers = await getAllChargers();

  const chargersWithUrls = await Promise.all(
    chargers.map(async (charger) => {
      const imageUrl = await getSignedS3Url(charger.bucket, charger.key);
      return {
        ...charger.toJSON(),
        imageUrl,
      };
    })
  );

  res.status(201);
  // TODO: Exclude key, bucket and region out of the returned charger data
  res.send(chargersWithUrls);
}

async function getCharger(req, res) {
  try {
    const charger = await getChargerById(req.params.id);

    if (!charger) {
      throw Error;
    }

    const imageUrl = await getSignedS3Url(charger.bucket, charger.key);

    const chargerWithUrl = {
      ...charger.toJSON(),
      imageUrl,
    };
    // TODO: handle return data excluding key,bucket info

    res.status(200);
    res.send(chargerWithUrl);
  } catch (err) {
    res.status(404);
    res.json({ error: "No charger found" });
  }

  // TODO: Exclude key, bucket and region out of the returned charger data
}

async function updateCharger(req, res) {
  try {
    await sequelize.transaction(async (t) => {
      const charger = await getChargerById(req.params.id);

      if (!charger) {
        throw Error;
      }

      // TODO: Create function for the below
      const data = { ...req.body };

      const key = `uploads/${uuidv4()}-${req.file.originalname}`;

      data["bucket"] = process.env.AWS_BUCKET_NAME;
      data["key"] = key;
      ////

      const updatedCharger = await charger.update(data, { transaction: t });

      // TODO: handle reupload image
      await uploadImageToS3(req.file, key);

      res.status(200);

      // TODO: Exclude key, bucket and region out of the returned charger data
      return res.json(updatedCharger);
    });
  } catch (err) {
    res.status(404);
    return res.json({ error: err.message });
  }
}
async function deleteCharger(req, res) {
  try {
    await deleteChargerById(req.params.id);
    //TODO: res status
    res.status(204);
    // res.json({message: "charger details deleted"})
  } catch (err) {
    res.status(404);
    return res.json({ error: err.message });
  }
}

async function getUserChargers(req, res) {
  try {
    // TODO handle errors and make userchargerwithurls a separated function

    const user = await findUser(req.user.email);

    const chargers = await Promise.all(
      Charger.findAll({
        where: {
          UserId: user.id,
        },
      })
    );

    const UserChargersWithUrls = await Promise.all(
      chargers.map(async (charger) => {
        const imageUrl = await getSignedS3Url(charger.bucket, charger.key);
        return {
          ...charger.toJSON(),
          imageUrl,
        };
      })
    );
    res.status(200);
    res.send(UserChargersWithUrls);
  } catch (err) {
    res.status(500);
    res.json({ error: "No chargers found" });
  }
}

module.exports = {
  getCharger,
  getChargers,
  createCharger,
  updateCharger,
  deleteCharger,
  getUserChargers,
};
