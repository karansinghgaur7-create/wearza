// controllers/productController.js

import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/ProductModel.js";

// Add Product
const addProduct = async (req, res) => {
  try {
    console.log("BODY => ", req.body);
    console.log("FILES => ", req.files);

    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    // Images
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    // Upload Images To Cloudinary
    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });

        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true",
      image: imagesUrl,
      date: Date.now(),
    };

    console.log(productData);

    const product = new productModel(productData);

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product Added Successfully",
      product,
    });
  } catch (error) {
    console.log("ERROR => ", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// List Products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove Product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);

    res.status(200).json({
      success: true,
      message: "Product Removed Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Single Product
const singleProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.id);

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
};