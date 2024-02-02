const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routes/userRouter");
const app = express();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss");
//// MIDDLEWARES ----------------------------------------------------->

//// SECURITY
// PROTECT - HTTP headers
app.use(helmet());

// PROTECT - limiter request
const limiter = rateLimit({
  max: 100,
  windowsMs: 60 * 60 * 100,
  message: "To many request from this IP, please try again an hour!",
});
app.use("/api", limiter);

// PROTECT - Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// PROTECT - Data sinitization against XSS
app.use(xss());

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
