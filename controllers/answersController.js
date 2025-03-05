const asyncHandler = require("express-async-handler");
const Answer = require("../models/answerModel");
const factory = require("./factoryHandler");

// @desc    Get list of answers
// @route   GET /api/v1/answers
// @access  Public
exports.getAnswers = factory.getAll(Answer);

// @desc    Get specific answer by id
// @route   GET /api/v1/answers/:id
// @access  Public
exports.getAnswer = factory.getOne(Answer);

// @desc    Create answer
// @route   POST /api/v1/answers
// @access  Private/Admin
exports.createAnswer = factory.createOne(Answer);

// @desc    Update specific answer
// @route   PUT /api/v1/answers/:id
// @access  Private/Admin
exports.updateAnswer = factory.updateOne(Answer);

// @desc    Delete specific answer
// @route   DELETE /api/v1/answers/:id
// @access  Private/Admin
exports.deleteAnswer = factory.deleteOne(Answer);

// @desc    Get answers by category
// @route   GET /api/v1/categories/:categoryId/answers
// @access  Public
exports.getAnswersByCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  const answers = await Answer.find({ category: categoryId });

  res.status(200).json({
    status: "success",
    results: answers.length,
    data: answers,
  });
});
