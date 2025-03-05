const express = require("express");
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryWithAnswers,
} = require("../controllers/categoryController");

const { protect, allowedTo } = require("../controllers/authController");
const {
  createCategoryValidator,
  updateCategoryValidator,
  getCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");

const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(protect, allowedTo("admin"), createCategoryValidator, createCategory);

router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(protect, allowedTo("admin"), updateCategoryValidator, updateCategory)
  .delete(protect, allowedTo("admin"), deleteCategoryValidator, deleteCategory);

// Get category with its answers
router.get("/:id/with-answers", getCategoryValidator, getCategoryWithAnswers);

module.exports = router;
