const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const compression = require("compression");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");
const connectDB = require("./config/db.js");
const globalError = require("./middlewares/errorHandler");
dotenv.config();

connectDB();

const app = express();
//Middleware
app.use(express.json({ limit: "20kb" }));
app.use(cors());
app.options("*", cors());
app.use(compression());
app.use(xss());
app.use(mongoSanitize());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

//Mount routes
const mountRoutes = require("./routes/mountRoutes");
mountRoutes(app);

// Catch all undefined routes
app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.statusCode = 404;
  err.status = "fail";
  next(err);
});

//Global error handling middleware
app.use(globalError);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    `Swagger documentation available at http://localhost:${PORT}/api-docs`
  );
});
process.on("unhandledRejection", (err) => {
  console.log(`UnhandledRejection Errors: ${err.message} | ${err.name}`);
  server.close(() => {
    process.exit(1);
  });
});
