const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 3001;
const { verifyToken } = require("./middleware/auth");
const { authRouter } = require("./routes/auth.js");
const { userRouter } = require("./routes/user.js");
const { chargerRouter } = require("./routes/charger");
const { vehiclesRouter } = require("./routes/vehicle");
const { bookingRouter } = require("./routes/booking");
const { addressRouter } = require("./routes/address");
const { userVehicleRouter } = require("./routes/uservehicle");
const { unavailabilityRouter } = require("./routes/unavailability");
const { paymentRouter } = require("./routes/payment");

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://iev-client.netlify.app",
    "https://staging-iev-client.netlify.app",
    "https://checkout.stripe.com",
    "https://hooks.stripe.com",
  ],
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// Use JSON parser for all non-webhook routes as Stripe function only accept raw req.body
app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use(express.urlencoded({ extended: true }));
// TEMP: Remove when we add Express Routers for various models
// EG >> app.use('/', router) for charging stations

app.use((req, res, next) => verifyToken(req, res, next));

app.use("/auth", authRouter);
app.use("/", paymentRouter);
app.use("/", userRouter);
app.use("/", addressRouter);
app.use("/", userVehicleRouter);
app.use("/", chargerRouter);
app.use("/", bookingRouter);
app.use("/", vehiclesRouter);
app.use("/", unavailabilityRouter);

module.exports = {
  app,
  PORT,
};
