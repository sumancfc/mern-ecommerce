const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const { errorHandler, errorNotFound } = require("./middleware/errorHandler");
const productRoutes = require("./routes/product");

//database connection
mongoose
  .connect(process.env.DATABASE, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => console.log(err));

//middleware
app.use(bodyParser.json());
app.use(cors());

//route middleware
app.use("/api", productRoutes);

//error middleware
app.use(errorNotFound);
app.use(errorHandler);

//port
const port = process.env.PORT || 8000;

//server running
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
