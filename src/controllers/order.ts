import {Request, RequestHandler} from "express";
import asyncHandler from "express-async-handler";
import {Order, IOrder, IOrderItem, IShippingAddress} from "../model/Order";
import {IUser} from "../model/User";

interface OrderRequestBody {
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  itemsPrice: number;
}

export const createOrder: RequestHandler = asyncHandler(async (req, res) => {
  if (!req.user?._id) {
    res.status(401); // Unauthorized
    throw new Error("User not authenticated.");
  }

  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
    itemsPrice,
  } : OrderRequestBody = req.body ;

  if (orderItems && orderItems.length === 0) {
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
      itemsPrice,
    });

    const createOrder = await order.save();

    res.status(201).json(createOrder);
  }
});

export const getOrderById: RequestHandler = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export const updateOrderToPaid: RequestHandler = asyncHandler(async (req, res) => {
  const order: IOrder | null = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt =new Date();

    const updateOrder: IOrder = await order.save();

    res.status(200).json(updateOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export const updateOrderToDelivered: RequestHandler = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = new Date();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export const orderList: RequestHandler = asyncHandler(async (req, res) => {
  if (!req.user?._id) {
    res.status(401); // Unauthorized
    throw new Error("User not authenticated.");
  }

  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
});

export const getAllOrders: RequestHandler = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");

  res.json(orders);
});
