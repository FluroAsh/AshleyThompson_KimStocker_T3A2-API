const express = require("express");
// const models = require("../../models");
const db = require('../models');
const Charger = db.Charger;
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const aws = require("aws-sdk");
const { S3 } = require("aws-sdk");
const s3 = new aws.S3({
  signatureVersion: "v4",
  region: "ap-southeast-2",
});

const S3_BUCKET = "iev";


async function uploadImageToS3(key, buffer, mimetype) {
  return new Promise((resolve, reject) => {
    s3.putObject(
      {
        Bucket: S3_BUCKET,
        ContentType: mimetype,
        Key: key,
        Body: buffer,
      },
      () => resolve()
    );
  });
}

function getSignedUrl(bucket, key, expires = 3600) {
  return new Promise((resolve, reject) => {
    s3.getSignedUrl(
      "getObject",
      {
        Bucket: bucket,
        Key: key,
        Expires: expires,
      },
      function (err, url) {
        if (err) throw new Error(err);

        resolve(url);
      }
    );
  });
}

async function getChargers(req, res) {
  let chargers = await getAllChargers();

  chargers = await Promise.all(
    chargers.map(async (charger) => {
      const imageUrl = await Promise.all([
        getSignedUrl(charger.bucket, charger.key),
      ]);
      return {
        ...charger.toJSON(),
        imageUrl,
      };
    })
  );

  res.send(chargers);
}

async function createCharger(req, res) {
  const uuid = uuidv4();
  await Promise.all([
    uploadImageToS3(`images/${uuid}`, req.file.buffer, req.file.mimetype),
  ]);

  const data = {...req.body}
  data["uuid"] = uuid;
  data["bucket"] = S3_BUCKET;
  data["key"] = `images/${uuid}`;

  try {

    const newCharger = await Charger.create(data);
    res.status(201);
    return res.json(newCharger);

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
