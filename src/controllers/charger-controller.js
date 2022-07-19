const express = require("express");
// const models = require("../../models");
const db = require('../models');
const { Charger, Image } = db;
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const aws = require("aws-sdk");
const s3 = new aws.S3({
  signatureVersion: "v4",
  region: "ap-southeast-2",
});

const S3_BUCKET = "image-upload-storage";


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
        getSignedUrl(charger.image.bucket, charger.image.key),
      ]);
      return {
        ...charger.toJSON(),
        imageUrl,
      };
    })
  );

  res.send(chargers);
}

async function createCharger() {
  const id = uuidv4();
  await Promise.all([
    uploadImageToS3(`images/${id}`, req.file.buffer, req.file.mimetype),
  ]);

  try {

  const newCharger = await Charger.create(req.body)

  const newImage = await Image.create({
    id,
    bucket: S3_BUCKET,
    key: `images/${id}`,
    "ChargerId": newCharger.id
  })


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
