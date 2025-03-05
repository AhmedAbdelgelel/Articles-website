const ApiError = require("../utils/apiError");

const sendErrorForDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorForProd = (err, res) => {
  // For operational, trusted errors: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } 
  // For programming or unknown errors: don't leak error details
  console.error('ERROR 💥', err);
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong',
  });
};
const handleJwtInvalidSignature = () => {
  return new ApiError(
    "Authentication failed: Invalid token signature. Please login again with valid credentials.",
    401
  );
};
const handleJwtExpired = () => {
  return new ApiError(
    "Authentication failed: Your session has expired. Please login again to continue.",
    401
  );
};

// Handle MongoDB duplicate key error
const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  const message = `Validation failed: Duplicate ${field} value '${value}'. Please use a different ${field}.`;
  return new ApiError(message, 400);
};

// Handle validation errors
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((val) => val.message);
  const message = `Validation failed: ${errors.join(". ")}`;
  return new ApiError(message, 400);
};

// Handle cast errors (invalid ID format)
const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}. Please provide a valid ID.`;
  return new ApiError(message, 400);
};

const globalError = (err, req, res, next) => {
  // Set default status code and status
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  
  // Set header to ensure response is JSON
  res.setHeader('Content-Type', 'application/json');
  
  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;
    
    if (err.name === "JsonWebTokenError") {
      error = handleJwtInvalidSignature();
    }
    if (err.name === "TokenExpiredError") {
      error = handleJwtExpired();
    }
    // Handle MongoDB duplicate key error
    if (err.code === 11000) {
      error = handleDuplicateKeyError(err);
    }
    // Handle Mongoose validation errors
    if (err.name === "ValidationError") {
      error = handleValidationError(err);
    }
    // Handle Mongoose cast errors (invalid ID format)
    if (err.name === "CastError") {
      error = handleCastError(err);
    }
    sendErrorForProd(error, res);
  }
};
module.exports = globalError;
