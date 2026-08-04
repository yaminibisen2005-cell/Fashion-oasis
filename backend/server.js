import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import errorHandler from "./middlewares/error.middleware.js";
import AppError from "./utils/AppError.js";

import customerAuthRoutes from "./routes/customerAuth.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminDashboardRoutes from "./routes/adminDashboard.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Global Middlewares
app.use(cors());
app.use(express.json({ limit: "10kb" }));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin/dashboard", adminDashboardRoutes);
app.use("/api/v1/admin/products", productRoutes);
app.use("/api/v1/customer", customerAuthRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Fashion Oasis API is running cleanly",
  });
});

// 404 Handler
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
});