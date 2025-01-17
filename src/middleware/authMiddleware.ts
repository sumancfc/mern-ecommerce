import { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User } from "../model/User";
import { JwtPayload, IUser } from "../interfaces";

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

// Get Token from Header
const getTokenFromHeader = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  return null;
};

// Verify and Decode Token
const verifyAndDecodeToken = (token: string): JwtPayload => {
  const secret = process.env.JWT_SECRET_KEY as string;

  if (!secret) {
    throw new Error("JWT_SECRET_KEY is not defined");
  }

  return jwt.verify(token, secret) as JwtPayload;
};

const getUserFromToken = async (userId: string): Promise<IUser> => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

// Check User Authenticate
export const auth: RequestHandler = asyncHandler(
  async (
req, res, next
  ) => {
    const token: string | null = getTokenFromHeader(req);

    if (!token) {
      res.status(401).json({ message: "Not authorized, no token" });
      return;
    }

    try {
      const decoded: JwtPayload = verifyAndDecodeToken(token);
      req.user = await getUserFromToken(decoded.id);
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, access denied" });
      return;
    }
  }
);

// Check Admin Authenticate
export const authAdmin: RequestHandler =async (
  req,
  res,
  next
) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
     res.status(403).json({ message: "Not authorized as an admin" });
     return
  }
};
