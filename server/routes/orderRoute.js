// ==========================================
// routes/orderRoute.js
// ==========================================

import express from "express";

import {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import authUser from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

// ==========================================
// USER ROUTES
// ==========================================

// CREATE ORDER
orderRouter.post(
  "/create",
  authUser,
  createOrder
);

// GET USER ORDERS
orderRouter.get(
  "/my-orders",
  authUser,
  getUserOrders
);

// ==========================================
// ADMIN ROUTES
// ==========================================

// GET ALL ORDERS
orderRouter.get(
  "/admin/orders",
  adminAuth,
  getAllOrders
);

// UPDATE STATUS
orderRouter.put(
  "/admin/status",
  adminAuth,
  updateOrderStatus
);

export default orderRouter;