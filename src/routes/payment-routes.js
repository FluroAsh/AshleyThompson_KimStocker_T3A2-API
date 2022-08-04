const { createCheckoutSession, webHook } = require("../controllers/payment-controller");
const express = require("express");

const paymentRouter = express.Router();

paymentRouter.post("/create-checkout-session", createCheckoutSession);
paymentRouter.post("/webhook", express.raw({type: 'application/json'}), webHook);


module.exports = {
  paymentRouter,
};
