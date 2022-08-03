const { createStripeSession } = require("../controllers/payment-controller");
const express = require("express");

const paymentRouter = express.Router();

paymentRouter.post("/create-checkout-session", createStripeSession);

module.exports = {
  paymentRouter,
};
