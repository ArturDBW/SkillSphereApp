const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = express();

const port = 4000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
