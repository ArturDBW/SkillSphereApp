const express = require("express");
const userRouter = require("./routes/userRouter");

const app = express();

// Routes

app.use("/skillsphere/users", userRouter);

module.exports = app;
