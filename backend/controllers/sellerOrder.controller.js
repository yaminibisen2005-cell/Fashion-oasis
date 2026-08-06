import catchAsync from '../utils/catchAsync.js';
import * as sellerOrderService from '../services/sellerOrder.service.js';

export const getOrders = catchAsync(async (req, res) => {
  const orders = await sellerOrderService.getSellerOrders(req.user._id);
  res.status(200).json({ success: true, data: orders });
});

export const updateOrderStatus = catchAsync(async (req, res) => {
  const order = await sellerOrderService.updateOrderStatus(req.params.id, req.user._id, req.body.status);
  res.status(200).json({ success: true, data: order });
});
