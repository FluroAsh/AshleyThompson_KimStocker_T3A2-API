const db = require("../models");
const sequelize = db.sequelize;
const { Charger, Address, User } = db;
const {
  getAllChargers,
  getChargerById,
  deleteChargerById,
  getPlugId,
  getChargersByLocation
} = require("../utils/charger-utils");
const { findUser } = require("../utils/auth-utils");
const { v4: uuidv4 } = require("uuid");
const {
  uploadImageToS3,
  getSignedS3Url
} = require("../services/awsS3-services");
const plug = require("../models/plug");

// TODO: Double check all res.status

/** S3 Charger URL Helper Method */
async function getChargersWithUrl(chargers) {
  const chargersWithUrls = await Promise.all(
    chargers.map(async charger => {
      const imageUrl = await getSignedS3Url(charger.bucket, charger.key);
      return {
        ...charger.toJSON(),
        imageUrl
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
      charger =>
        charger.status === "active" &&
        req.user?.username !== charger.User.username
    );

    /**
     * Chargers that return empty object === true, so raise an error if it doesn't have any keys in the object
     * .filter returns empty array, so check if it's length is equal to 0 and raise an error if true
     */
    if (!Object.keys(chargers) || filteredChargers.length === 0) {
      return res.status(404).json({ error: "No chargers found" });
    }

    const urlChargers = await getChargersWithUrl(filteredChargers);
    res.status(200).json(urlChargers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createCharger(req, res) {
  const data = { ...req.body };

  console.log("THIS IS FORM DATA", data);

  // TODO: Handle error when user not found
  const user = await findUser(data.username);

  // if (user) {
  //   // res.status(500)
  //   res.json({error: "Pls log in first"})
  // }
  const plugId = await getPlugId(data.plugName);

  console.log("THIS IS USER ", user);
  data["UserId"] = user.id;
  data["AddressId"] = user.Address.dataValues.id;
  data["PlugId"] = plugId;

  console.log("FILE NAME", req.file);
  const key = `uploads/${uuidv4()}`;
  // -${req.file.originalname}

  data["bucket"] = process.env.AWS_BUCKET_NAME;
  data["key"] = key;

  try {
    // transaction ensure the record will be rolledback if an error occured during the try/catch block
    const result = await sequelize.transaction(async t => {
      const newCharger = await Charger.create(data, { transaction: t });
      await uploadImageToS3(req.file, key);

      res.status(204);

      // TODO: Exclude key, bucket and region out of the returned charger data
      return res.json(newCharger);

      // res.send(chargersWithUrls);
    });
  } catch (err) {
    console.log(err.message);
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

    const chargerWithUrl = {
      ...charger.toJSON(),
      imageUrl
    };
    // TODO: handle return data excluding key,bucket info

    res.status(200);
    res.json(chargerWithUrl);
  } catch (err) {
    res.status(500);
    return res.json({ error: err.message });
  }
  // TODO: Exclude key, bucket and region out of the returned charger data
}

async function updateCharger(req, res) {
  try {
    await sequelize.transaction(async t => {
      const charger = await getChargerById(req.params.id);

      if (!charger) {
        res.status(404);
        res.json({ error: "No charger found" });
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

      res.status(200);

      // TODO: Exclude key, bucket and region out of the returned charger data
      // return res.json(updatedCharger);
      res.json(updatedCharger);
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

async function getChargers(req, res) {
  const chargers = await getAllChargers();

  if (chargers === null) {
    res.status(404);
    res.json({ error: "No chargers found" });
    return;
  }

  const filteredChargers = chargers.filter(
    charger =>
      charger.status === "active" &&
      req.user?.username !== charger.User.username
  );

  const chargersWithUrls = await getChargersWithUrl(filteredChargers);

  res.status(200);
  // TODO: Exclude key, bucket and region out of the returned charger data
  res.send(chargersWithUrls);
}

async function getMyChargers(req, res) {
  console.log("req.user", req.user);
  if (req.user) {
    try {
      // TODO handle errors and make userchargerwithurls a separated function
      const user = await findUser(req.user.username);

      const chargers = await Charger.findAll({
        where: {
          UserId: user.id
        },
        include: [
          {
            model: Address,
            as: "Address"
          },
          {
            model: User,
            as: "User"
          }
        ]
      });

      console.log("THIS IS MY CHARGERS", chargers);

      const UserChargersWithUrls = await getChargersWithUrl(chargers);

      res.status(200);
      res.send(UserChargersWithUrls);
    } catch (err) {
      console.trace();
      res.status(500);
      res.json({ error: err.message });
    }
  } else {
    res.json({ error: "log in the see your list of chargers" });
  }
}

module.exports = {
  getCharger,
  getChargers,
  createCharger,
  updateCharger,
  deleteCharger,
  getMyChargers,
  searchChargersLocation
};
