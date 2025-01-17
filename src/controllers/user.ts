import { Response, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { User } from "../model/User";
import {  AuthenticatedRequest, Register, Login } from "../interfaces";
import { generateToken } from "../utils/generateToken";
import { formatUserResponse, handleNotFound } from "../utils"
import { BadRequestError, UnauthorizedError } from "../utils/errors";

// Register User
export const register: RequestHandler = asyncHandler(async (req, res) => {
  const userData: Register = req.body;

  if (!userData.name || !userData.email || !userData.password) {
    throw new BadRequestError("Name, Email and password are required.");
  }

  const userExists = await User.findOne({ email: userData.email });

  if (userExists) {
    throw new BadRequestError("User already exists.");
  }

  const user = new User({ ...userData});

  const createUser = await user.save();

  res.status(201).json(formatUserResponse(createUser));
});

// Login User
export const login: RequestHandler = asyncHandler(async (req, res) => {
  const loginData: Login = req.body;

  if (!loginData.email || !loginData.password) {
    throw new BadRequestError("Email and password are required.");
  }

  const user = await User.findOne({ email: loginData.email });

  if (user && (await user.matchPassword(loginData.password))) {
    res
      .status(200)
      .json({
        ...formatUserResponse(user),
        token: generateToken(user._id),
      });
  } else {
    throw new BadRequestError("Invalid email or password.");
  }
});

// Get All Users (Admin Only)
export const getAllUsers: RequestHandler = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  res.status(200).json(users);
});

// Get User Profile
export const getUserProfile = asyncHandler(
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user?._id) {
      throw new UnauthorizedError("User not authenticated.");
    }

    const user = await User.findById(req.user._id);

    if (handleNotFound(user, "User", res)) {
      res.status(200).json(formatUserResponse(user));
    }
  }
);

// Update User Profile
export const updateUserProfile = asyncHandler(
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user?._id) {
      throw new UnauthorizedError("User not authenticated.");
    }

    const user = await User.findById(req.user._id);

    if (handleNotFound(user, "user", res)) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.status(200).json(formatUserResponse(updatedUser));
    }
  }
);

// Get User By ID (Admin Only)
export const getUserById: RequestHandler = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (handleNotFound(user, "User", res)) {
    res.status(200).json(user);
  }
});

// Update User (Admin Only)
export const updateUser: RequestHandler = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (handleNotFound(user, "User", res)) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin ?? user.isAdmin;

    const updatedUser = await user.save();

    res.status(200).json(formatUserResponse(updatedUser));
  }
});

// Delete User (Admin Only)
export const deleteUser: RequestHandler = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (handleNotFound(user, "User", res)) {
    await user.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: "User deleted successfully." });
  }
});
