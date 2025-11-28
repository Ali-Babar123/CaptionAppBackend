// controllers/categoryController.js
const Category = require("../models/Category");

// ADD CATEGORY
const addCategory = async (req, res) => {
  try {
    const { type } = req.body;

    if (!type) {
      return res.status(400).json({ message: "Type is required" });
    }

    const newCategory = await Category.create({ type });

    res.status(201).json({
      message: "Category added successfully",
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// GET ALL CATEGORIES
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Categories fetched",
      categories,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// DELETE CATEGORY
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await Category.findByIdAndDelete(id);

    res.status(200).json({
      message: "Category deleted",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  addCategory,
  getCategories,
  deleteCategory,
};
