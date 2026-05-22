// ==============================
// server.js
// ==============================

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// LOAD ENV FIRST
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();

// ==============================
// MIDDLEWARE
// ==============================

app.use(express.json());

app.use(cors());

// ==============================
// ROUTES
// ==============================

app.use("/api/user", userRouter);

app.use("/api/product", productRouter);

app.use("/api/cart", cartRouter);

app.use("/api/order", orderRouter);

// ==============================
// CLOUDINARY CONFIG
// ==============================

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// ==============================
// MONGODB CONNECTION
// ==============================

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

// ==============================
// TEST ROUTE
// ==============================

app.get("/", (req, res) => {
  res.send("API Working");
});

// ==============================
// SERVER
// ==============================

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});