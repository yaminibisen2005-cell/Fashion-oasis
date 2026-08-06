import Order from '../models/Order.js';
import AppError from '../utils/AppError.js';

export const getSellerOrders = async (sellerId) => {
  return await Order.find({ seller: sellerId })
    .populate('customer', 'name email')
    .sort({ createdAt: -1 })
    .lean();
};

export const updateOrderStatus = async (orderId, sellerId, status) => {
  const order = await Order.findOne({ _id: orderId, seller: sellerId });
  if (!order) throw new AppError('Order not found or unauthorized', 404);
  
  order.status = status;
  await order.save();
  return order;
};
