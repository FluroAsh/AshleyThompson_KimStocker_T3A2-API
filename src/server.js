const express = require("express");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 3001;
const jwt = require("jsonwebtoken");
const { authRouter } = require("./routes/auth-routes.js");
const { userRouter } = require("./routes/user-routes.js");
const { chargerRouter } = require("./routes/charger-routes");
const { vehiclesRouter } = require("./routes/vehicle-routes");
const { bookingRouter } = require("./routes/booking-routes");
const { addressRouter } = require("./routes/address-routes");
const { userVehicleRouter } = require("./routes/uservehicle-routes");
const { unavailabilityRouter } = require("./routes/unavailability-routes");
const { paymentRouter } = require("./routes/payment-routes")

const corsOptions = {
  origin: ["http://localhost:3000", "https://iev-client.netlify.app", "https://checkout.stripe.com", "https://hooks.stripe.com"],
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Use JSON parser for all non-webhook routes as Stripe function only accept raw req.body
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use(express.urlencoded({ extended: true }));
// TODO: Add CORS once localhost version stable

// TEMP: Remove when we add Express Routers for various models
// EG >> app.use('/', router) for charging stations

/** Verify JWT if incoming request contains authorization header */
app.use((req, res, next) => {
  if (req.headers && req.headers.authorization) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.SECRET_KEY,
      (err, user) => {
        if (err) {
          req.user = undefined;
        } else {
          console.log("decode", user);
          req.user = user;
        }
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }

  // if (error instanceof multer.MulterError) {
  //   if (error.code === 'LIMIT_FILE_SIZE') {
  //     return res.status(400).json({
  //       message: 'File is too large',
  //     });
  //   }

  //   if (error.code === 'LIMIT_FILE_COUNT') {
  //     return res.status(400).json({
  //       message: 'File limit reached',
  //     });
  //   }

  //   if (error.code === 'LIMIT_UNEXPECTED_FILE') {
  //     return res.status(400).json({
  //       message: 'File must be an image',
  //     });
  //   }
  // }
});

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
