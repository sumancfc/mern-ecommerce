const Product = require("../model/Product");
const asyncHandler = require("express-async-handler");

exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.status(200).json(products);
});

exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});
