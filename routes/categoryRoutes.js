// routes/categoryRoutes.js
const express = require("express");
const { addCategory, getCategories, deleteCategory } = require("../controller/categoryController");

const router = express.Router();

router.post("/add", addCategory);
router.get("/all", getCategories);
router.delete("/delete/:id", deleteCategory);




module.exports = router;
