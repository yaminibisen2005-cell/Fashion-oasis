import express from 'express';
import * as sellerDashboardController from '../controllers/sellerDashboard.controller.js';
import { protectAdmin } from '../middlewares/auth.middleware.js'; // Note: protectAdmin allows 'seller'

const router = express.Router();

router.use(protectAdmin);

router.get('/stats', sellerDashboardController.getDashboardStats);
router.get('/sales-analytics', sellerDashboardController.getSalesAnalytics);
router.get('/recent-orders', sellerDashboardController.getRecentOrders);
router.get('/top-products', sellerDashboardController.getTopProducts);
router.get('/top-customers', sellerDashboardController.getTopCustomers);

export default router;
