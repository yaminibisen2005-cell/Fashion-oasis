import express from 'express';
import {
  getDashboardStats,
  getSalesAnalytics,
  getRecentOrders,
  getTopProducts,
  getTopCustomers,
} from '../controllers/adminDashboard.controller.js';
import { protectAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Apply auth middleware to protect all admin dashboard endpoints
router.use(protectAdmin);

router.get('/stats', getDashboardStats);
router.get('/sales-analytics', getSalesAnalytics);
router.get('/recent-orders', getRecentOrders);
router.get('/top-products', getTopProducts);
router.get('/top-customers', getTopCustomers);

export default router;
