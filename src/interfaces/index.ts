import { Request } from "express";
import {Document, Schema, Types} from "mongoose";

// JWT Token
export interface JwtPayload {
    id: string;
}

// User interface
export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

export interface AuthenticatedRequest extends Request {
    user?: IUser;
}

export interface Register {
    name: string;
    email: string;
    password: string;
}

export interface Login {
    email: string;
    password: string;
}

export interface UserResponse {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
}

// Product and Review interface
export interface IReview extends Document {
    name: string;
    rating: number;
    comment: string;
    user: Types.ObjectId;
}

export interface IProduct extends Document {
    name: string;
    image: string;
    price: number;
    brand: string;
    category: string;
    description: string;
    reviews?: IReview[];
    rating?: number;
    numReviews?: number;
    countInStock: number;
    user: Types.ObjectId;
}

export interface ProductRequestBody {
    name: string;
    price: number;
    brand: string;
    category: string;
    description: string;
    countInStock: number;
}

export interface ProductRequestBodyWithImage extends ProductRequestBody {
    image: string;
}

// Order interface
export interface IOrderItem {
    name: string;
    qty: number;
    image: string;
    price: number;
    product: Schema.Types.ObjectId;
}

export interface IShippingAddress {
    address:string;
    city: string;
    postalCode: string;
    country: string;
}

export interface IOrder extends Document {
    user: Types.ObjectId;
    orderItems: IOrderItem[];
    shippingAddress: IShippingAddress;
    paymentMethod: string;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: Date;
    isDelivered: boolean;
    deliveredAt?: Date;
}

export interface OrderRequestBody {
    orderItems: IOrderItem[];
    shippingAddress: IShippingAddress;
    paymentMethod: string;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    itemsPrice: number;
}
