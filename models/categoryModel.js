const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A category must have a name"],
      unique: true,
      trim: true,
    },
    nameAr: {
      type: String,
      required: [true, "A category must have an Arabic name"],
      unique: true,
      trim: true,
    },
    answers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Answer",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Middleware to populate answers when finding a category
categorySchema.pre(/^find/, function (next) {
  this.populate({
    path: "answers",
    select: "-__v",
  });
  next();
});
module.exports = mongoose.model("Category", categorySchema);
