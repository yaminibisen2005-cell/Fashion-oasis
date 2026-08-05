import catchAsync from '../utils/catchAsync.js';
import * as sellerDashboardService from '../services/sellerDashboard.service.js';

export const getDashboardStats = catchAsync(async (req, res) => {
  const stats = await sellerDashboardService.getStats(req.user._id);
  res.status(200).json({ success: true, data: stats });
});

export const getSalesAnalytics = catchAsync(async (req, res) => {
  const analytics = await sellerDashboardService.getSalesAnalytics(req.user._id, req.query.range);
  res.status(200).json({ success: true, data: analytics });
});

export const getRecentOrders = catchAsync(async (req, res) => {
  const orders = await sellerDashboardService.getRecentOrders(req.user._id, Number(req.query.limit) || 4);
  res.status(200).json({ success: true, data: orders });
});

export const getTopProducts = catchAsync(async (req, res) => {
  const products = await sellerDashboardService.getTopProducts(req.user._id, Number(req.query.limit) || 4);
  res.status(200).json({ success: true, data: products });
});

export const getTopCustomers = catchAsync(async (req, res) => {
  const customers = await sellerDashboardService.getTopCustomers(req.user._id, Number(req.query.limit) || 4);
  res.status(200).json({ success: true, data: customers });
});

export const getEarnings = catchAsync(async (req, res) => {
  const earnings = await sellerDashboardService.getEarnings(req.user._id);
  res.status(200).json({ success: true, data: earnings });
});
