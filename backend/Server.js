const Product = require("./models/Product");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// connect MongoDB
mongoose.connect("your_mongodb_url")
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err));

// start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});

// GET all products
app.get("/api/products", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});