const {
  getCharger,
  getChargers,
  createCharger,
  updateCharger,
  deleteCharger,
  getMyChargers,
  searchChargersLocation,
  updateChargerStatus,
} = require("../controllers/charger-controller");
const express = require("express");
const multer = require("multer");
const { loginRequired } = require("../controllers/auth-controller");

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10_000_000, files: 1 },
  fileFilter,
  rename: function (fieldname, filename) {
    return filename.replace(/\W+/g, "-").toLowerCase();
  },
});

const chargerRouter = express.Router();

chargerRouter.get("/chargers", getChargers);
chargerRouter.get("/charger/:id", getCharger);
chargerRouter.get("/search", searchChargersLocation);

chargerRouter.use(loginRequired);
chargerRouter.get("/chargers/mychargers", getMyChargers);
chargerRouter.post("/charger/new", upload.single("image"), createCharger);
chargerRouter.put("/charger/:id", upload.single("image"), updateCharger);
chargerRouter.patch("/charger/:id", updateChargerStatus);
chargerRouter.delete("/charger/:id", deleteCharger);

module.exports = {
  chargerRouter,
};
