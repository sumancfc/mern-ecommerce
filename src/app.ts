import path from "path";
import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import { errorHandler, errorNotFound } from "./middleware/errorHandler";
import userRoutes from "./routes/user";
import productRoutes from "./routes/product";
import orderRoutes from "./routes/order";

dotenv.config();

const app: Application = express();
const port: string | number = process.env.PORT || 8000;

// Database Connection
mongoose
  .connect(process.env.DATABASE as string)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Database Connection Error:", err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Route Middleware
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

//intests->pm.environment.set('TOEKN',pm.response.json().token)

// Error Middleware
app.use(errorNotFound);
app.use(errorHandler);

// Start Server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
