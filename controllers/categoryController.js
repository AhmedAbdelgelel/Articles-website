const Category = require("../models/categoryModel");
const factory = require("./factoryHandler");

// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategories = factory.getAll(Category);

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategory = factory.getOne(Category);

// @desc    Create category
// @route   POST /api/v1/categories
// @access  Private/Admin
exports.createCategory = factory.createOne(Category);

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private/Admin
exports.updateCategory = factory.updateOne(Category);

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
exports.deleteCategory = factory.getOne(Category);

// @desc    Get category with answers
// @route   GET /api/v1/categories/:id/with-answers
// @access  Public
exports.getCategoryWithAnswers = factory.getOneWithPopulate(
  Category,
  "answers"
);
