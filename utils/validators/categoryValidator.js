const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 2 })
    .withMessage("Category name must be at least 2 characters long")
    .isString()
    .withMessage("Category name must be a string"),

  check("nameAr")
    .notEmpty()
    .withMessage("Arabic category name is required")
    .isLength({ min: 2 })
    .withMessage("Arabic category name must be at least 2 characters long")
    .isString()
    .withMessage("Arabic category name must be a string"),

  check("color")
    .optional()
    .isString()
    .withMessage("Color must be a string")
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage("Color must be a valid hex color code (e.g., #ffffff)"),

  validatorMiddleware,
];

exports.updateCategoryValidator = [
  check("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Category name must be at least 2 characters long")
    .isString()
    .withMessage("Category name must be a string"),

  check("nameAr")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Arabic category name must be at least 2 characters long")
    .isString()
    .withMessage("Arabic category name must be a string"),

  check("color")
    .optional()
    .isString()
    .withMessage("Color must be a string")
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage("Color must be a valid hex color code (e.g., #ffffff)"),

  validatorMiddleware,
];

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category ID format"),

  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category ID format"),

  validatorMiddleware,
];
