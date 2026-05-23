// ==========================================
// controllers/orderController.js
// FULL FIXED CODE
// ==========================================

import mongoose from "mongoose";

import Order from "../models/orderModel.js";

import userModel from "../models/userModel.js";

import productModel from "../models/productModel.js";

// ==========================================
// CREATE ORDER
// ==========================================

const createOrder = async (req, res) => {

  try {

    const userId = req.userId;

    const {
      items,
      shippingAddress,
    } = req.body;

    console.log("ORDER ITEMS:", items);

    // CHECK EMPTY CART
    if (!items || items.length === 0) {

      return res.json({
        success: false,
        message: "Cart is empty",
      });
    }

    let orderItems = [];

    let totalAmount = 0;

    // LOOP ITEMS
    for (const item of items) {

      console.log(
        "PRODUCT ID:",
        item._id
      );

      // VALIDATE OBJECT ID
      if (
        !mongoose.Types.ObjectId.isValid(
          item._id
        )
      ) {

        return res.json({
          success: false,
          message:
            `Invalid Product ID: ${item._id}`,
        });
      }

      // FIND PRODUCT
      const product =
        await productModel.findById(
          item._id
        );

      // PRODUCT NOT FOUND
      if (!product) {

        return res.json({
          success: false,
          message: "Product not found",
        });
      }

      // PREPARE ORDER ITEM
      const itemData = {
        name: product.name,
        image: product.image[0],
        quantity: item.quantity,
        price: product.price,
        size: item.size,
      };

      // TOTAL
      totalAmount +=
        product.price *
        item.quantity;

      // PUSH
      orderItems.push(itemData);
    }

    // DELIVERY FEE
    totalAmount += 10;

    // CREATE ORDER
    const newOrder = new Order({
      userId,
      items: orderItems,
      shippingAddress,
      totalAmount,
    });

    // SAVE ORDER
    await newOrder.save();

    // CLEAR USER CART
    await userModel.findByIdAndUpdate(
      userId,
      {
        cartData: [],
      }
    );

    // RESPONSE
    res.json({
      success: true,
      message:
        "Order placed successfully",
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET USER ORDERS
// ==========================================

const getUserOrders = async (
  req,
  res
) => {

  try {

    const userId = req.userId;

    const orders = await Order.find({
      userId,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      orders,
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET ALL ORDERS
// ==========================================

const getAllOrders = async (
  req,
  res
) => {

  try {

    const orders = await Order.find()
      .populate(
        "userId",
        "name email"
      )
      .sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      orders,
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// UPDATE ORDER STATUS
// ==========================================

const updateOrderStatus =
  async (req, res) => {

    try {

      const {
        orderId,
        status,
      } = req.body;

      await Order.findByIdAndUpdate(
        orderId,
        {
          orderStatus: status,
        }
      );

      res.json({
        success: true,
        message:
          "Order status updated",
      });

    } catch (error) {

      console.log(error);

      res.json({
        success: false,
        message: error.message,
      });
    }
  };

// ==========================================
// EXPORTS
// ==========================================

export {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
};