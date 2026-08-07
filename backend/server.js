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
import categoryRoutes from "./routes/category.routes.js";
import orderRoutes from "./routes/order.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import adminOrderRoutes from "./routes/adminOrder.routes.js";
import adminCustomerRoutes from "./routes/adminCustomer.routes.js";
import adminReviewRoutes from "./routes/adminReview.routes.js";
import adminCouponRoutes from "./routes/adminCoupon.routes.js";
import adminAnalyticsRoutes from "./routes/adminAnalytics.routes.js";
import sellerDashboardRoutes from "./routes/sellerDashboard.routes.js";
import sellerProductRoutes from "./routes/sellerProduct.routes.js";
import sellerOrderRoutes from "./routes/sellerOrder.routes.js";
import sellerReviewRoutes from "./routes/sellerReview.routes.js";
import inquiryRoutes from "./routes/inquiry.routes.js";

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Global Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10kb" }));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin/dashboard", adminDashboardRoutes);
app.use("/api/v1/admin/analytics", adminAnalyticsRoutes);
app.use("/api/v1/admin/products", productRoutes);
app.use("/api/v1/admin/categories", categoryRoutes);
app.use("/api/v1/admin/orders", adminOrderRoutes);
app.use("/api/v1/admin/customers", adminCustomerRoutes);
app.use("/api/v1/admin/reviews", adminReviewRoutes);
app.use("/api/v1/admin/coupons", adminCouponRoutes);
app.use("/api/v1/seller/dashboard", sellerDashboardRoutes);
app.use("/api/v1/seller/products", sellerProductRoutes);
app.use("/api/v1/seller/orders", sellerOrderRoutes);
app.use("/api/v1/seller/reviews", sellerReviewRoutes);
app.use("/api/v1/customer", customerAuthRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/inquiry", inquiryRoutes);

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
    `Server running in ${process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
});