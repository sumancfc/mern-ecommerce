const mongoose = require("mongoose");
require("dotenv").config();
const users = require("./data/users");
const products = require("./data/products");
const User = require("./model/User");
const Product = require("./model/Product");
const Order = require("./model/Order");

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => console.log(err));

const dataImport = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(users);
    const adminUser = createdUser[0]._id;

    const productSample = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(productSample);

    console.log("Data Imported");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const dataDestroy = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  dataDestroy();
} else {
  dataImport();
}
