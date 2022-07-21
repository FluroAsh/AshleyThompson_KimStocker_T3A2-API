const db = require("../models");
const sequelize = db.sequelize
const Charger = db.Charger;
const { v4: uuidv4 } = require("uuid");
const { getAllChargers } = require("../utils/charger-utils");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");

async function uploadImageToS3(file, key) {
  const s3client = new S3Client();

  return await s3client.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
    })
  );
}

async function getSignedS3Url(bucket, key, expires = 3600) {
  const client = new S3Client();
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });
  return await getSignedUrl(client, command, { expiresIn: expires });
}

async function getChargers(req, res) {
  let chargers = await getAllChargers();
  let chargersWithUrls = await Promise.all(
    chargers.map(async (charger) => {
      const imageUrl = await getSignedS3Url(charger.bucket, charger.key);
      return {
        ...charger.toJSON(),
        imageUrl,
      };
    })
  );

  // TODO: Exclude key, bucket and region out of the returned charger data
  res.send(chargersWithUrls);
}

async function createCharger(req, res) {

  const data = { ...req.body };

  const key = `uploads/${uuidv4()}-${req.file.originalname}`;

  data["bucket"] = process.env.AWS_BUCKET_NAME;
  data["key"] = key;

  try {

    // transaction ensure the record will be rolledback if an error occured during the try/catch block
    await sequelize.transaction(async (t) => {

      const newCharger = await Charger.create(data, { transaction: t });
      const imageData = await uploadImageToS3(req.file, key);
      console.log("s3 result", imageData);

      res.status(200);

      // TODO: Exclude key, bucket and region out of the returned charger data
      return res.json(newCharger);  
    });
  

  } catch (err) {
    res.status(500);
    return res.json({ error: err.message });
  }
}

async function getCharger() {}

async function updateCharger() {}
async function deleteCharger() {}

module.exports = {
  getCharger,
  getChargers,
  createCharger,
  updateCharger,
  deleteCharger,
};
