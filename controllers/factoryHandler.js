const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Category = require("../models/categoryModel");

exports.createOne = (Model, modelName) =>
  asyncHandler(async (req, res) => {
    const document = await Model.create(req.body);
    // Update category with the new document
    if (document.category) {
      await Category.findByIdAndUpdate(
        document.category,
        { $push: { documents: document._id } },
        { new: true }
      );
    }
    res.status(201).json({
      status: "success",
      data: document,
    });
  });

exports.getAll = (Model) =>
  asyncHandler(async (req, res) => {
    const documents = await Model.find();
    res.status(200).json({
      status: "success",
      results: documents.length,
      data: documents,
    });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);

    if (!document) {
      return next(new ApiError(`No document found with id ${id}`, 404));
    }

    res.status(200).json({
      status: "success",
      data: document,
    });
  });

exports.getOneWithPopulate = (Model, populateOptions) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id).populate(populateOptions);
    if (!document) {
      return next(new ApiError(`No document found with this id: ${id}`));
    }
    res.status(200).json({
      status: "success",
      data: document,
    });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!document) {
      return next(new ApiError(`No document found with id ${id}`, 404));
    }
    res.status(200).json({
      status: "success",
      data: document,
    });
  });

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);

    if (!document) {
      return next(new ApiError(`No document found with id ${id}`, 404));
    }

    // Check if the document has answers before deleting it
    if (document.answers && document.answers.length > 0) {
      return next(
        new ApiError(
          `Cannot delete document with id ${id} because it has associated answers. Delete the answers first or move them to another category.`,
          400
        )
      );
    }

    // Remove document from category
    if (document.category) {
      await Category.findByIdAndUpdate(
        document.category,
        { $pull: { documents: document._id } },
        { new: true }
      );
    }

    // If no associated answers, delete the document
    await Model.findByIdAndDelete(id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
