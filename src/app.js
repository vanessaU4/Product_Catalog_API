const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
require("dotenv").config();

const app = express();
connectDB();

app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

module.exports = app;
