const {
    getCharger, 
    getChargers, 
    createCharger, 
    updateCharger, 
    deleteCharger 
} = require('../controllers/charger-controller')
const express = require('express');
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const chargerRouter = express.Router();

chargerRouter.get('/chargers', getChargers)
chargerRouter.get('/chargers/:id', getCharger)
chargerRouter.post('/chargers/new', upload.single('image'), createCharger)
chargerRouter.put('/chargers/:id', updateCharger)
chargerRouter.patch('/chargers/:id', updateCharger)
chargerRouter.delete('/chargers/:id', deleteCharger)


module.exports = {
  chargerRouter,
};

