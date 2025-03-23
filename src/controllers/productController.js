const Product = require("../models/Product");
const mongoose = require("mongoose");

// Create a product
exports.createProduct = async (req, res) => {
  try {
    // If you need to convert category to ObjectId, uncomment the next line:
    // req.body.category = mongoose.Types.ObjectId(req.body.category);
    const product = await Product.create(req.body);
    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create product", error: error.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    if (products.length === 0) {
      return res
        .status(200)
        .json({ message: "No products available", products: [] });
    }
    res.status(200).json({
      message: "Products retrieved successfully",
      products,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve products", error: error.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product retrieved successfully",
      product,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve product", error: error.message });
  }
};

// Update a product by ID

exports.updateProduct = async (req, res) => {
  try {
    // If category is provided, convert it to ObjectId using "new"
    if (req.body.category) {
      req.body.category = new mongoose.Types.ObjectId(req.body.category);
    }
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("category");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to update product", error: error.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete product", error: error.message });
  }
};
