const {
    getCharger, 
    getChargers, 
    createCharger, 
    updateCharger, 
    deleteCharger,
    getMyChargers
} = require('../controllers/charger-controller')
const express = require('express');
const multer = require("multer");
const { loginRequired } = require('../controllers/auth-controller');


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
        return filename.replace(/\W+/g, '-').toLowerCase();}
});

const chargerRouter = express.Router();

chargerRouter.get('/chargers', getChargers)
chargerRouter.get('/chargers/:id', getCharger)

chargerRouter.use(loginRequired)
chargerRouter.post('/chargers/new', upload.single('image'), createCharger)
chargerRouter.get('/chargers/mychargers', getMyChargers)
chargerRouter.put('/chargers/:id', updateCharger)
chargerRouter.patch('/chargers/:id', updateCharger)
chargerRouter.delete('/chargers/:id', deleteCharger)



module.exports = {
  chargerRouter,
};

