const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "An answer must have a title"],
      trim: true,
    },
    titleAr: {
      type: String,
      required: [true, "An answer must have an Arabic title"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "An answer must have content"],
    },
    contentAr: {
      type: String,
      required: [true, "An answer must have Arabic content"],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "An answer must belong to a category"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timeseries: true }
);

module.exports = mongoose.model("Answer", answerSchema);
