import { RequestHandler } from "express";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import { Product } from "../model/Product";
import { IUser, IProduct, IReview, ProductRequestBody, ProductRequestBodyWithImage } from "../interfaces";
import { handleNotFound } from "../utils";
import { BadRequestError, UnauthorizedError } from "../utils/errors";

// Get All Products
export const getProducts: RequestHandler = asyncHandler(async (req, res) => {
  const { pageNumber, keyword } = req.query;

  const pageSize: number = 10;
  const page: number = Number(pageNumber) || 1;
  const newKeyword = keyword
    ? {
        name: {
          $regex: keyword,
          $options: "i",
        },
      }
    : {};

  const count: number = await Product.countDocuments({ ...newKeyword });
  const products: IProduct[] = await Product.find({ ...newKeyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res
    .status(200)
    .json({ count, page, pages: Math.ceil(count / pageSize), products });
});

// Get Product by Id
export const getProductById: RequestHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product: IProduct | null = await Product.findById(id);

  if (handleNotFound(product, "Product", res)) {
    res.status(200).json(product);
  }
});

// Create Product
export const createProduct: RequestHandler = asyncHandler(async (req, res) => {
  if (!req.user?._id) {
    throw new UnauthorizedError("User not authenticated.");
  }

  const productData = req.body as ProductRequestBody;

  const product = new Product({
    ...productData,
    image: "/images/playstation.jpg",
    user: req.user._id,
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
});

// Update Product
export const updateProduct: RequestHandler = asyncHandler(async (req, res) => {
  const productData =
    req.body as ProductRequestBodyWithImage;

  const { id } = req.params;

  const product = await Product.findById(id);

  if (handleNotFound(product, "Product", res)) {
    Object.assign(product, productData);

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  }
});

// Delete Product
export const deleteProduct: RequestHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (handleNotFound(product, "Product", res)) {
    await product.deleteOne({ _id: id });

    res.status(200).json({ message: "Product Deleted" });
  }
});

// Review Product
export const reviewProduct: RequestHandler = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const { id } = req.params;

  // Check if the user is authenticated
  if (!req.user || !req.user._id) {
    throw new UnauthorizedError("User not authenticated.");
  }

  // Type guard: assert that req.user exists
  const user: IUser = req.user;

  // Find the product by ID
  const product: IProduct | null = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found.");
  }

  // Ensure reviews array is initialized
  if (!product.reviews) {
    product.reviews = [];
  }

  // Check if the user has already reviewed this product
  const reviewExists = product.reviews.find((review) =>
    review.user.equals(user._id)
  );

  if (reviewExists) {
    throw new BadRequestError("Product already reviewed.");
  }

  // Create a new review object
  const review: Partial<IReview> = {
    name: user.name,
    rating: Number(rating),
    comment,
    user: new mongoose.Types.ObjectId(user._id),
  };

  // Add the review to the product's reviews array
  product.reviews.push(review as IReview);
  product.numReviews = product.reviews.length;

  // Calculate the new average rating
  product.rating =
    product.reviews.reduce((acc, item) => acc + item.rating, 0) /
    product.reviews.length;

  // Save the product with the new review
  await product.save();

  res.json({ message: "Review Added" });
});
