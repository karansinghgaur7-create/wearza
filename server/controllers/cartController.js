// controllers/cartController.js

import userModel from "../models/userModel.js";

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
    let cartData = userData.cartData || {};

    // Add item logic
    if (cartData[itemId]) {

      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }

    } else {

      cartData[itemId] = {};
      cartData[itemId][size] = 1;

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

    const { userId, itemId, size, quantity } = req.body;

    // Validation
    if (!userId || !itemId || !size || quantity == null) {
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

    let cartData = userData.cartData || {};

    // Check item
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    // Remove item if quantity <= 0
    if (quantity <= 0) {

      delete cartData[itemId][size];

      // Remove product if no sizes left
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }

    } else {

      cartData[itemId][size] = quantity;

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
    let cartData = userData.cartData || {};

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