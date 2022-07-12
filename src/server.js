const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// TODO: Add CORS once localhost version stable

// TEMP: Remove when we add Express Routers for various models
// EG >> app.use('/', router) for charging stations
app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

module.exports = {
  app,
  PORT,
};
