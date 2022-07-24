require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "iev_development",
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "iev_test",
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  production: {
    username: "root",
    password: null,
    database: "DATABASE_URL",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
