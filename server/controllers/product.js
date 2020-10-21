const Product = require("../model/Product");
const asyncHandler = require("express-async-handler");

//Get all products
exports.getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNunber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
});

//Get product by id
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

//Create Product
exports.createProduct = asyncHandler(async (req, res) => {
  const { name, price, brand, category, description, countInStock } = req.body;

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

//Update Product
exports.updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    price,
    brand,
    category,
    description,
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
    product.countInStock = countInStock;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } else {
    req.status(404);
    throw new Error("Product not found");
  }
});

//Delete Product
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.status(200).json({ message: "Product Deleted" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

//Review Product
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
