// controllers/cartController.js

import userModel from "../models/userModel.js";
import productModel from "../models/ProductModel.js";

// ==========================
// Add Product To Cart
// ==========================
const addToCart = async (req, res) => {
  try {

    const { userId, itemId, size } = req.body;

    // Validation
    if (!userId || !itemId || !size) {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Find user
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // Get cart data
    let cartData = userData.cartData || [];
    if (!Array.isArray(cartData)) {
      cartData = [];
    }

    // Find if the item already exists in the cart array with the same size
    const existingIndex = cartData.findIndex(
      (item) => item._id === itemId && item.size === size
    );

    if (existingIndex !== -1) {
      cartData[existingIndex].quantity += 1;
    } else {
      // Find product details
      const product = await productModel.findById(itemId);
      if (!product) {
        return res.json({
          success: false,
          message: "Product not found",
        });
      }
      cartData.push({
        _id: itemId,
        name: product.name,
        image: product.image[0],
        price: product.price,
        quantity: 1,
        size,
      });
    }

    // Update database
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      success: true,
      message: "Added To Cart",
      cartData,
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// Update Cart
// ==========================
const updateCart = async (req, res) => {
  try {

    const { userId, cartData } = req.body;

    // Validation
    if (!userId || !cartData) {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Find user
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // Save
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      success: true,
      message: "Cart Updated",
      cartData,
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// Get User Cart
// ==========================
const getUserCart = async (req, res) => {
  try {

    const { userId } = req.body;

    // Validation
    if (!userId) {
      return res.json({
        success: false,
        message: "User ID is required",
      });
    }

    // Find user
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // Cart data
    let cartData = userData.cartData || [];
    if (!Array.isArray(cartData)) {
      cartData = [];
    }

    res.json({
      success: true,
      cartData,
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });

  }
};

export {
  addToCart,
  updateCart,
  getUserCart
};