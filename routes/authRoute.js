const express = require("express");
const {
  signUp,
  login,
  protect,
  changeMyPassword,
  recoverMe,
  logout,
} = require("../controllers/authController");
const {
  signupValidator,
  loginValidator,
} = require("../utils/validators/authValidator");

const router = express.Router();

router.post("/signup", signupValidator, signUp);
router.post("/login", loginValidator, login);

// Protected routes
router.use(protect);
router.put("/changeMyPassword", changeMyPassword);
router.put("/recoverMe", recoverMe);
router.get("/logout", logout);

module.exports = router;
