import express from 'express';
import * as sellerDashboardController from '../controllers/sellerDashboard.controller.js';
import { protectSeller } from '../middlewares/auth.middleware.js'; // Note: protectSeller enforces role === 'seller'

const router = express.Router();

router.use(protectSeller);

router.get('/stats', sellerDashboardController.getDashboardStats);
router.get('/sales-analytics', sellerDashboardController.getSalesAnalytics);
router.get('/recent-orders', sellerDashboardController.getRecentOrders);
router.get('/top-products', sellerDashboardController.getTopProducts);
router.get('/top-customers', sellerDashboardController.getTopCustomers);
router.get('/earnings', sellerDashboardController.getEarnings);

export default router;
