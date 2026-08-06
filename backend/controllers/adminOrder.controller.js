import catchAsync from '../utils/catchAsync.js';
import * as adminOrderService from '../services/adminOrder.service.js';

export const getOrders = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  
  const data = await adminOrderService.getAllOrders(page, limit);
  
  res.status(200).json({
    success: true,
    data: data.orders,
    pagination: data.pagination
  });
});

export const updateOrderStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const order = await adminOrderService.updateOrderStatus(id, status);
  
  res.status(200).json({
    success: true,
    message: 'Order status updated successfully',
    data: order
  });
});
