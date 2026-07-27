import catchAsync from '../utils/catchAsync.js';
import * as dashboardService from '../services/adminDashboard.service.js';

export const getDashboardStats = catchAsync(async (req, res) => {
  const stats = await dashboardService.getStats();
  res.status(200).json({ success: true, data: stats });
});

export const getSalesAnalytics = catchAsync(async (req, res) => {
  const analytics = await dashboardService.getSalesAnalytics(req.query.range);
  res.status(200).json({ success: true, data: analytics });
});

export const getRecentOrders = catchAsync(async (req, res) => {
  const orders = await dashboardService.getRecentOrders(Number(req.query.limit) || 4);
  res.status(200).json({ success: true, data: orders });
});

export const getTopProducts = catchAsync(async (req, res) => {
  const products = await dashboardService.getTopProducts(Number(req.query.limit) || 4);
  res.status(200).json({ success: true, data: products });
});

export const getTopCustomers = catchAsync(async (req, res) => {
  const customers = await dashboardService.getTopCustomers(Number(req.query.limit) || 4);
  res.status(200).json({ success: true, data: customers });
});
