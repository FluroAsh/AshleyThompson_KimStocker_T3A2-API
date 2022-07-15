const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { userRouter } = require('./routes/user-routes');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// TODO: Add CORS once localhost version stable

// TEMP: Remove when we add Express Routers for various models
// EG >> app.use('/', router) for charging stations
app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.use('/', userRouter);

module.exports = {
  app,
  PORT,
};
