const { createCheckoutSession, webHook } = require("../controllers/payment-controller");
const express = require("express");

const paymentRouter = express.Router();

paymentRouter.post("/create-checkout-session", createCheckoutSession);
paymentRouter.post("/payments/webhook", webHook);


module.exports = {
  paymentRouter,
};
