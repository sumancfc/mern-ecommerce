import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Order } from "../model/Order";
import { IUser, AuthenticatedRequest, OrderRequestBody } from "../interfaces";
import { handleNotFound } from "../utils";
import { UnauthorizedError } from "../utils/errors";

// Create Order
export const createOrder = asyncHandler(async (req: AuthenticatedRequest
                                               , res: Response): Promise<void> => {
  if (!req.user?._id) {
    throw new UnauthorizedError("User not authenticated.");
  }

  const orderData = req.body as OrderRequestBody;

  if (!orderData.orderItems || orderData.orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  const order = new Order({
    ...orderData,
    user: req.user._id,
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});

// Get Order By Id
export const getOrderById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const order = await Order.findById(req.params.id).populate<{ user: IUser }>("user", "name email");

  if (handleNotFound(order, "Order", res)) {
    res.status(200).json(order);
  }
});

// Update Order to Paid
export const updateOrderToPaid = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const order = await Order.findById(req.params.id);

  if (handleNotFound(order, "Order", res)) {
    order.isPaid = true;
    order.paidAt = new Date();

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  }
});

// Update Order to Delivered
export const updateOrderToDelivered = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const order = await Order.findById(req.params.id);

  if (handleNotFound(order, "Order", res)) {
    order.isDelivered = true;
    order.deliveredAt = new Date();

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  }
});

// Order List
export const orderList = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  if (!req.user?._id) {
    throw new UnauthorizedError("User not authenticated.");
  }

  const orders = await Order.find({ user: req.user._id });

  res.status(200).json(orders);
});

// Get All Orders
export const getAllOrders = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const orders = await Order.find({}).populate<{ user: IUser }>("user", "id name");

  res.status(200).json(orders);
});
