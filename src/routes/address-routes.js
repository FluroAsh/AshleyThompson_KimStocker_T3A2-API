const express = require("express");
const addressRouter = express.Router();
const { createAddress } = require("../controllers/address-controller");

addressRouter.get("/address/new", createAddress);

module.exports = {
  addressRouter,
};
