const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const express = require("express");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {})
  .then(() => {
    console.log("DB connection successful!");
  })
  .catch((err) => console.log(`Error with DB connection, ${err}`));

const port = 4000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
