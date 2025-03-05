const express = require("express");
const {
  getAnswers,
  getAnswer,
  createAnswer,
  updateAnswer,
  deleteAnswer,
} = require("../controllers/answersController");

const { protect, allowedTo } = require("../controllers/authController");
const {
  createAnswerValidator,
  updateAnswerValidator,
  getAnswerValidator,
  deleteAnswerValidator,
} = require("../utils/validators/answerValidator");

const router = express.Router();

/**
 * @swagger
 * /answers:
 *   get:
 *     summary: Get all answers
 *     tags: [Answers]
 *     responses:
 *       200:
 *         description: List of answers retrieved successfully
 *   post:
 *     summary: Create a new answer
 *     tags: [Answers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Answer created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router
  .route("/")
  .get(getAnswers)
  .post(protect, allowedTo("admin"), createAnswerValidator, createAnswer);

/**
 * @swagger
 * /answers/{id}:
 *   get:
 *     summary: Get answer by ID
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Answer found successfully
 *       404:
 *         description: Answer not found
 *   put:
 *     summary: Update answer
 *     tags: [Answers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Answer updated successfully
 *       404:
 *         description: Answer not found
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete answer
 *     tags: [Answers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Answer deleted successfully
 *       404:
 *         description: Answer not found
 *       401:
 *         description: Unauthorized,
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "You are not authorized to access this resource"
 */
router
  .route("/:id")
  .get(getAnswerValidator, getAnswer)
  .put(protect, allowedTo("admin"), updateAnswerValidator, updateAnswer)
  .delete(protect, allowedTo("admin"), deleteAnswerValidator, deleteAnswer);

/**
 * @swagger
 * components:
 *   schemas:
 *     Answer:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID
 *         title:
 *           type: string
 *           description: Title of the answer
 *         content:
 *           type: string
 *           description: Content of the answer
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *       example:
 *         _id: "60c72b2f12345678abcdef01"
 *         title: "Sample Answer"
 *         content: "This is a sample answer content"
 *         createdAt: "2023-01-01T12:00:00.000Z"
 *         updatedAt: "2023-01-01T12:00:00.000Z"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

module.exports = router;
