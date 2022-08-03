const { createStripeSession, webHook } = require("../controllers/payment-controller");
const express = require("express");

const paymentRouter = express.Router();

paymentRouter.post("/create-checkout-session", createStripeSession);
paymentRouter.post("/payments/webhook", webHook);


module.exports = {
  paymentRouter,
};
