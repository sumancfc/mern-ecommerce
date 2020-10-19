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

exports.createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    // image,
    price,
    brand,
    category,
    description,
    rating,
    numReviews,
    countInStock,
  } = req.body;

  const product = new Product({
    name,
    image: "/images/playstation.jpg",
    price,
    brand,
    category,
    description,
    rating: 0,
    numReviews: 0,
    countInStock,
    user: req.user._id,
  });

  const createdProduct = await product.save();

  res.json(createdProduct);
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    price,
    brand,
    category,
    description,
    rating,
    numReviews,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.image = image;
    product.price = price;
    product.brand = brand;
    product.category = category;
    product.description = description;
    product.rating = 0;
    product.numReviews = 0;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } else {
    req.status(404);
    throw new Error("Product not found");
  }
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.status(200).json({ message: "Product Deleted" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});
