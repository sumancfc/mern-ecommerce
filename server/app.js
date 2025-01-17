const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

const { errorHandler, errorNotFound } = require("./middleware/errorHandler");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");
const uploadRoutes = require("./routes/upload");

//database connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => console.log(err));

//middleware
app.use(bodyParser.json());
app.use(cors());
// const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//route middleware
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

//intests->pm.environment.set('TOEKN',pm.response.json().token)

//error middleware
app.use(errorNotFound);
app.use(errorHandler);

//port
const port = process.env.PORT || 8000;

//server running
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
