const express = require("express");
const morgan = require("morgan");

const userRouter = require("./routes/userRouter");

const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`)); // pozwala odczytać w wwww statyczne pliki takie jak html, img...

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes

app.use("/skillsphere/users", userRouter);

module.exports = app;
