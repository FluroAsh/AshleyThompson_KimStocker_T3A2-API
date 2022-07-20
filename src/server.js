const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const jwt = require('jsonwebtoken');
const { authRouter } = require('./routes/auth-routes.js');
const { userRouter } = require('./routes/user-routes.js');
const { chargerRouter } = require('./routes/charger-routes')
const { vehiclesRouter } = require('./routes/vehicle-routes');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// TODO: Add CORS once localhost version stable

// TEMP: Remove when we add Express Routers for various models
// EG >> app.use('/', router) for charging stations

/** Verify JWT if incoming request contains authorization header */
app.use((req, res, next) => {
  if (req.headers && req.headers.authorization) {
    jwt.verify(
      req.headers.authorization.split(' ')[1],
      process.env.SECRET_KEY,
      (err, user) => {
        if (err) {
          req.user = undefined;
        } else {
          console.log('decode', user);
          req.user = user;
        }
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

app.use('/auth', authRouter);
app.use('/', userRouter);
app.use('/', vehiclesRouter);
app.use('/', chargerRouter);



module.exports = {
  app,
  PORT,
};
