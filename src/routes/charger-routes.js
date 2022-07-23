const {
  getCharger,
  getChargers,
  createCharger,
  updateCharger,
  deleteCharger,
  searchChargersLocation,
} = require('../controllers/charger-controller');
const express = require('express');
const multer = require('multer');

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true);
  } else {
    cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000, files: 1 },
  fileFilter,
  rename: function(fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase();
  },
});

const chargerRouter = express.Router();

chargerRouter.get('/search', searchChargersLocation);
chargerRouter.get('/chargers', getChargers);
chargerRouter.get('/chargers/:id', getCharger);
chargerRouter.post('/chargers/new', upload.single('image'), createCharger);
chargerRouter.put('/chargers/:id', updateCharger);
chargerRouter.patch('/chargers/:id', updateCharger);
chargerRouter.delete('/chargers/:id', deleteCharger);

module.exports = {
  chargerRouter,
};
