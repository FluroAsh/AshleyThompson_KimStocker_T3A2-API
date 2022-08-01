const db = require("../models");
const sequelize = db.sequelize;
const { Charger, Address, User } = db;
const {
  getAllChargers,
  getChargerById,
  deleteChargerById,
  getPlugId,
  getChargersByLocation,
  getChargerByUserId,
} = require("../utils/charger-utils");
const { findUser } = require("../utils/auth-utils");
const { v4: uuidv4 } = require("uuid");
const {
  uploadImageToS3,
  getSignedS3Url,
} = require("../services/awsS3-services");
const plug = require("../models/plug");
const { UploadPartCopyRequest } = require("@aws-sdk/client-s3");

// TODO: Double check all res.status

/** S3 Charger URL Helper Method */
async function getChargersWithUrl(chargers) {
  const chargersWithUrls = await Promise.all(
    chargers.map(async (charger) => {
      const imageUrl = await getSignedS3Url(charger.bucket, charger.key);
      // Exclude key, bucket out of the returned charger data
      charger.bucket = undefined;
      charger.key = undefined;
      return {
        ...charger.toJSON(),
        imageUrl,
      };
    })
  );
  return chargersWithUrls;
}

/** Action Methods */
async function searchChargersLocation(req, res) {
  // Query will always be received as a string
  let { location } = req.query;
  // frontend replaces spaces with +'s and trims leading and trailing spaces
  location = location.replaceAll("+", " ");
  try {
    const chargers = await getChargersByLocation(location);
    // Uses the ?. (optional chaining method) to return undefined if username doesn't exist
    // resulting in no match between req.user.username and charger.User.username
    const filteredChargers = chargers.filter(
      (charger) =>
        charger.status === "active" &&
        req.user?.username !== charger.Host.username
    );

    /**
     * Chargers that return empty object === true, so raise an error if it doesn't have any keys in the object
     * .filter returns empty array, so check if it's length is equal to 0 and raise an error if true
     */
    if (Object.keys(chargers).length === 0 || filteredChargers.length === 0) {
      // return 200 as this is not user error. No records match searched keyword
      res.status(200)
      return res.json({ error: "No matched chargers found" });
    }

    const urlChargers = await getChargersWithUrl(filteredChargers);
    res.status(200)
    return res.json(urlChargers);
  } catch (err) {
    res.status(500)
    return res.json({ error: err.message });
  }
}

async function createCharger(req, res) {
  const data = { ...req.body };

  const user = await findUser(data.username);
  if (!user) {
    res.status(404);
    return res.json({ error: `Unknown user ${data.username}` });
  }

  const plugId = await getPlugId(data.plugName);

  data["UserId"] = user.id;
  data["AddressId"] = user.Address.dataValues.id;
  data["PlugId"] = plugId;

  const key = `uploads/${uuidv4()}`;
  // -${req.file.originalname}

  data["bucket"] = process.env.AWS_BUCKET_NAME;
  data["key"] = key;

  try {
    // transaction ensure the record will be rolledback if an error occured during the try/catch block
    const result = await sequelize.transaction(async (t) => {
      const newCharger = await Charger.create(data, { transaction: t });
      await uploadImageToS3(req.file, key);

      // Exclude key, bucket out of the returned charger data
      newCharger.bucket = undefined;
      newCharger.key = undefined;

      res.status(204);
      return res.json(newCharger);
    });
  } catch (err) {
    console.log(err);
    res.status(500);
    return res.json({ error: err.message });
  }
}

async function getCharger(req, res) {
  try {
    const charger = await getChargerById(req.params.id);

    // TODO: handle all no found data like this
    if (charger === null) {
      res.status(404);
      res.json({ error: "No charger found" });
      return;
    }

    const imageUrl = await getSignedS3Url(charger.bucket, charger.key);

    // TODO: handle return data excluding key,bucket info
    charger.bucket = undefined;
    charger.key = undefined;

    const chargerWithUrl = {
      ...charger.toJSON(),
      imageUrl,
    };

    res.status(200);
    res.json(chargerWithUrl);
  } catch (err) {
    res.status(500);
    return res.json({ error: err.message });
  }
}

async function updateCharger(req, res) {
  try {
    await sequelize.transaction(async (t) => {
      const charger = await getChargerById(req.params.id);

      if (!charger) {
        res.status(404);
        res.json({ error: "No charger found" });
        return;
      } else if (charger.Host.username !== req.user.username) {
        res.status(401);
        res.json({ error: "Unauthorised operation" });
        return;
      }

      // TODO: Create function for the below
      const data = { ...req.body };

      const key = `uploads/${uuidv4()}`;
      // -${req.file.originalname}

      data["bucket"] = process.env.AWS_BUCKET_NAME;
      data["key"] = key;
      ////

      const updatedCharger = await charger.update(data, { transaction: t });

      // TODO: handle reupload image
      await uploadImageToS3(req.file, key);

      // Exclude key, bucket out of the returned charger data
      updatedCharger.bucket = undefined;
      updatedCharger.key = undefined;

      res.status(200);
      res.json(updatedCharger);
    });
  } catch (err) {
    res.status(500);
    return res.json({ error: err.message });
  }
}
async function deleteCharger(req, res) {
  try {
    const charger = await getChargerById(req.params.id);

    if (!charger) {
      res.status(404);
      res.json({ error: "No charger found" });
      return;
    } else if (charger.Host.username !== req.user.username) {
      res.status(401);
      res.json({ error: "Unauthorised operation" });
      return;
    }

    await deleteChargerById(req.params.id);
    res.status(204);
    res.json({ message: "charger details deleted" });
  } catch (err) {
    console.log("Error deleting charger", err);
    res.status(500);
    return res.json({ error: err.message });
  }
}

async function getChargers(req, res) {
  try {
    const chargers = await getAllChargers();

    if (chargers === null) {
      res.status(404);
      res.json({ error: "No chargers found" });
      return;
    }

    const filteredChargers = chargers.filter(
      (charger) =>
        charger.status === "active" &&
        req.user?.username !== charger.Host.username
    );

    const chargersWithUrls = await getChargersWithUrl(filteredChargers);

    res.status(200);
    res.send(chargersWithUrls);
  } catch (err) {
    res.status(500);
    return res.json({ error: err.message });
  }
}

async function getMyChargers(req, res) {
  try {
    if (req.user) {
      // TODO handle errors and make userchargerwithurls a separated function
      const user = await findUser(req.user.username);

      const chargers = await getChargerByUserId(user.id);

      const UserChargersWithUrls = await getChargersWithUrl(chargers);

      res.status(200);
      res.send(UserChargersWithUrls);
    } else {
      res.status(401);
      res.json({ error: "log in the see your list of chargers" });
    }
  } catch (err) {
    res.status(500);
    res.json({ error: err.message });
  }
}

async function updateChargerStatus(req, res) {
  try {
    await sequelize.transaction(async (t) => {
      const charger = await getChargerById(req.params.id);

      if (!charger) {
        res.status(404);
        res.json({ error: "No charger found" });
        return;
      } else if (charger.Host.username !== req.user.username) {
        res.status(401);
        res.json({ error: "Unauthorised operation" });
        return;
      }
      charger.status = req.body.status;
      charger.save();

      res.status(204);
      res.json(charger);
    });
  } catch (err) {
    res.status(500);
    res.json({
      message: "Unable to update charger status, pls try again later",
    });
  }
}

module.exports = {
  getCharger,
  getChargers,
  createCharger,
  updateCharger,
  deleteCharger,
  getMyChargers,
  searchChargersLocation,
  updateChargerStatus,
};
