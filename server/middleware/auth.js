// ==========================================
// middleware/auth.js
// ==========================================

import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    if (
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.userId = decoded.id;
    req.body.userId = decoded.id;

    next();
  } catch (error) {
    console.log("Authentication Error:", error.message);
    console.log("Token sent by client:", req.headers.authorization);
    console.log("JWT_SECRET on server:", process.env.JWT_SECRET);

    res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default authUser;