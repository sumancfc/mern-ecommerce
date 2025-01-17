import { Response, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { User } from "../model/User";
import {  AuthenticatedRequest, Register, Login } from "../interfaces";
import { generateToken } from "../utils/generateToken";
import { formatUserResponse, handleNotFound } from "../utils"

// Register User
export const register: RequestHandler = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body as Register;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json(formatUserResponse(user));
  } else {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});

// Login User
export const login: RequestHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body as Login;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res
      .status(200)
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
  } else {
    res.status(401);
    throw new Error("Invalid email or password.");
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
      res.status(401); // Unauthorized
      throw new Error("User not authenticated.");
    }

    const user = await User.findById(req.user._id);

    if (user) {
      res.status(200).json(formatUserResponse(user));
    } else {
      res.status(404);
      throw new Error("User not found.");
    }
  }
);

// Update User Profile
export const updateUserProfile = asyncHandler(
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user?._id) {
      res.status(401); // Unauthorized
      throw new Error("User not authenticated.");
    }

    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      res.status(200).json(formatUserResponse(updatedUser));
    } else {
      res.status(404);
      throw new Error("User not found.");
    }
  }
);

// Get User By ID (Admin Only)
export const getUserById: RequestHandler = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

// Update User (Admin Only)
export const updateUser: RequestHandler = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin ?? user.isAdmin;

    const updatedUser = await user.save();

    res.status(200).json(formatUserResponse(updatedUser));
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

// Delete User (Admin Only)
export const deleteUser: RequestHandler = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "User deleted successfully." });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});
