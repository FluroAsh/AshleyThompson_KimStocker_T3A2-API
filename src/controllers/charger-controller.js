const db = require('../models');
const sequelize = db.sequelize;
const Charger = db.Charger;
const { getAllChargers, getOneCharger } = require('../utils/charger-utils');

const { v4: uuidv4 } = require('uuid');
const {
  uploadImageToS3,
  getSignedS3Url,
} = require('../services/awsS3-services');

// TODO: Double check all res.status

async function createCharger(req, res) {
  const data = { ...req.body };

  const key = `uploads/${uuidv4()}-${req.file.originalname}`;

  data['bucket'] = process.env.AWS_BUCKET_NAME;
  data['key'] = key;

  try {
    // transaction ensure the record will be rolledback if an error occured during the try/catch block
    await sequelize.transaction(async (t) => {
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
    const charger = await getOneCharger(req.params.id);

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
    res.json({ error: 'No charger found' });
  }

  // TODO: Exclude key, bucket and region out of the returned charger data
}

async function updateCharger() {}
async function deleteCharger() {}

module.exports = {
  getCharger,
  getChargers,
  createCharger,
  updateCharger,
  deleteCharger,
};
