const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const sanitizeData = require("../utils/sanitizeData");
const generateToken = require("../utils/generateToken");
const ApiError = require("../utils/apiError");
const User = require("../models/userModel");

// @desc    Sign up / Register new user
// @route   POST /api/v1/auth/signup
// @access  Public
exports.signUp = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      status: "success",
      token,
      data: sanitizeData(user),
    });
  } catch (error) {
    // Handle duplicate email error
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return next(
        new ApiError(
          "Email already in use. Please use a different email address",
          400
        )
      );
    }
    // Pass other errors to the global error handler
    next(error);
  }
});

// @desc   Login
// @route  POST /api/v1/auth/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ApiError(
        "Authentication failed: Missing credentials. Please provide both email and password.",
        400
      )
    );
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(
      new ApiError(
        "Authentication failed: Invalid credentials. The email or password you entered is incorrect.",
        401
      )
    );
  }

  // Generate token
  const token = generateToken(user._id);

  res.status(200).json({
    status: "success",
    token,
    data: sanitizeData(user),
  });
});

exports.protect = asyncHandler(async (req, res, next) => {
  // 1- check if token exists, if exists get it
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new ApiError(
        "Authentication failed: No token provided. Please login to access this resource.",
        401
      )
    );
  }
  let decode;
  try {
    decode = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(
        new ApiError(
          "Authentication failed: Invalid token signature. Please login again with valid credentials.",
          401
        )
      );
    } else if (error.name === "TokenExpiredError") {
      return next(
        new ApiError(
          "Authentication failed: Your session has expired. Please login again to continue.",
          401
        )
      );
    } else {
      return next(
        new ApiError(
          `Authentication failed: ${
            error.message || "Token verification error"
          }. Please login again with valid credentials.`,
          401
        )
      );
    }
  }
  // Check if user exists
  const currentUser = await User.findById(decode.userId);
  if (!currentUser) {
    return next(
      new ApiError(
        "Authentication failed: User account not found. The account associated with this token may have been deleted.",
        401
      )
    );
  }

  if (req.path === "/changeMyPassword" || req.path === "/recoverMe") {
    req.user = currentUser;
    return next();
  }

  if (!currentUser.active) {
    return next(
      new ApiError(
        "Authentication failed: Your account is deactivated. Please recover your account to continue.",
        403
      )
    );
  }

  if (currentUser.passwordChangedAt) {
    const passwordChangedTimeStamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    if (passwordChangedTimeStamp > decode.iat) {
      return next(
        new ApiError(
          "Authentication failed: Password was recently changed. For security reasons, please login again with your new password.",
          401
        )
      );
    }
  }
  req.user = currentUser;
  next();
});

// @desc Authorization (User Permissions)
// ["admin","manager"]
exports.allowedTo = (...roles) =>
  // 1) access roles
  // 2) access registered user (req.user.role)
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          `Authorization failed: Access denied. Your role (${req.user.role}) does not have permission to access this resource.`,
          403
        )
      );
    }
    next();
  });

// @desc    Change user password
// @route   PUT /api/v1/auth/changeMyPassword
// @access  Private/Protected
exports.changeMyPassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  // Check if current password and new password are provided
  if (!currentPassword || !newPassword) {
    return next(
      new ApiError(
        "Password change failed: Missing information. Please provide both your current password and new password.",
        400
      )
    );
  }

  // Get user with password
  const user = await User.findById(req.user._id).select("+password");

  // Check if current password is correct
  if (!(await bcrypt.compare(currentPassword, user.password))) {
    return next(
      new ApiError(
        "Password change failed: Current password verification failed. Please enter your correct current password.",
        401
      )
    );
  }

  // Update password
  user.password = newPassword;
  user.passwordChangedAt = Date.now();
  await user.save();

  // Generate new token
  const token = generateToken(user._id);

  res.status(200).json({
    status: "success",
    message: "Password changed successfully",
    token,
    data: sanitizeData(user),
  });
});

// @desc    Recover deactivated user account
// @route   PUT /api/v1/auth/recoverMe
// @access  Private/Protected
exports.recoverMe = asyncHandler(async (req, res, next) => {
  // Update user to active
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { active: true },
    { new: true }
  );

  // Generate new token
  const token = generateToken(user._id);

  res.status(200).json({
    status: "success",
    message: "Account recovered successfully",
    token,
    data: sanitizeData(user),
  });
});

// @desc    Logout user
// @route   GET /api/v1/auth/logout
// @access  Private/Protected
exports.logout = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
});
