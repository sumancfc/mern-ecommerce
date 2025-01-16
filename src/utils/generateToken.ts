import jwt from "jsonwebtoken";

// Generate Token
export const generateToken = (id: string): string => {
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    throw new Error("JWT_SECRET_KEY is not defined in environment variables");
  }

  return jwt.sign({ id }, secretKey, {
    expiresIn: "30d",
  });
};
