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
    // rating,
    // numReviews,
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

exports.reviewProduct = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const reviewExists = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (reviewExists) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
