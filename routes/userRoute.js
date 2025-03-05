const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData,
} = require("../controllers/userController");

const { protect, allowedTo } = require("../controllers/authController");

const router = express.Router();

router.use(protect);

// logged-in users
router.get("/getMe", getLoggedUserData, getUser);
router.put("/updateMyPassword", updateLoggedUserPassword);
router.put("/updateMe", updateLoggedUserData);
router.delete("/deleteMe", deleteLoggedUserData);

router.use(allowedTo("admin"));

// Admin routes
router.route("/").get(getUsers).post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
