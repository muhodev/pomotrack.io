import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
// import xss from "xss-clean";
import hpp from "hpp";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import { AppError } from "./@utils/index.js";
import { errorController as globalErrorHandler } from "./controllers/index.js";
import { authRoutes } from "./routes/index.js";

// Start express app
const app = express();
app.set("view engine", "pug");
app.set("views", path.join(path.dirname("."), "views"));

// 1) GLOBAL MIDDLEWARES
// Implement CORS
// TODO: check whitelist control here
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development" ? "http://localhost:3000" : [],
    credentials: true,
  })
);

app.options(
  "*",
  cors({
    origin:
      process.env.NODE_ENV === "development" ? "http://localhost:3000" : [],
    credentials: true,
  })
);

// Serving static files
// app.use(express.static(path.join(__dirname, "public")));

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many requests from this IP, please try again in an hour!",
// });

// app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
// app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

// app.use(compression());

app.use("/api/v1/auth", authRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
