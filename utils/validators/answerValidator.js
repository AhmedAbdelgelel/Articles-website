const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createAnswerValidator = [
  check("title")
    .notEmpty()
    .withMessage("Answer title is required")
    .isLength({ min: 3 })
    .withMessage("Answer title must be at least 3 characters long")
    .isString()
    .withMessage("Answer title must be a string"),

  check("titleAr")
    .notEmpty()
    .withMessage("Arabic answer title is required")
    .isLength({ min: 3 })
    .withMessage("Arabic answer title must be at least 3 characters long")
    .isString()
    .withMessage("Arabic answer title must be a string"),

  check("content")
    .notEmpty()
    .withMessage("Answer content is required")
    .isString()
    .withMessage("Answer content must be a string"),

  check("contentAr")
    .notEmpty()
    .withMessage("Arabic answer content is required")
    .isString()
    .withMessage("Arabic answer content must be a string"),

  check("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Invalid category ID format"),

  validatorMiddleware,
];

exports.updateAnswerValidator = [
  check("title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Answer title must be at least 3 characters long")
    .isString()
    .withMessage("Answer title must be a string"),

  check("titleAr")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Arabic answer title must be at least 3 characters long")
    .isString()
    .withMessage("Arabic answer title must be a string"),

  check("content")
    .optional()
    .isString()
    .withMessage("Answer content must be a string"),

  check("contentAr")
    .optional()
    .isString()
    .withMessage("Arabic answer content must be a string"),

  check("category")
    .optional()
    .isMongoId()
    .withMessage("Invalid category ID format"),

  validatorMiddleware,
];

exports.getAnswerValidator = [
  check("id").isMongoId().withMessage("Invalid answer ID format"),

  validatorMiddleware,
];

exports.deleteAnswerValidator = [
  check("id").isMongoId().withMessage("Invalid answer ID format"),

  validatorMiddleware,
];
