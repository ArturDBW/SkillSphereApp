const express = require("express");
const morgan = require("morgan");
const path = require("path");
const viewRouter = require("./routes/viewRouter");
const userRouter = require("./routes/userRouter");
const courseRouter = require("./routes/courseRouter");
const reviewRouter = require("./routes/reviewRouter");
const buyRouter = require("./routes/buyRouter");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

const corsOptions = {
  // origin: "http://localhost:5173",
  origin: "https://skill-sphere-app-frontend.vercel.app",
  credentials: true, // Zezwól na przekazywanie plików cookie
};

// Dostęp do folderu ze zdjęciami z backendu dla wykorzystania w UI
app.use(
  "/public",
  express.static(path.join(__dirname, "public", "img", "users"))
);

app.use(
  "/public",
  express.static(path.join(__dirname, "public", "img", "courses"))
);

app.use(cors(corsOptions));

//// MIDDLEWARES
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

// PROTECT - Prevent parametr pollution
app.use(
  hpp({
    whitelist: ["duration"], // ustawiam parametry ktore moga sie pojawic wiecej niz raz w URL
  })
);

// Odpala środowisko developmentu
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.use(express.json());
app.use(express.static(`${__dirname}/public`)); // pozwala odczytać w wwww statyczne pliki takie jak html, img...

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use("/", viewRouter);
app.use("/skillsphere/users", userRouter);
app.use("/skillsphere/courses", courseRouter);
app.use("/skillsphere/reviews", reviewRouter);
app.use("/skillsphere/buy", buyRouter);

module.exports = app;
