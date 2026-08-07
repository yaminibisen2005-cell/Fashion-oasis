import Order from '../models/Order.js';
import AppError from '../utils/AppError.js';
import { sendEmail } from '../utils/emailService.js';

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
  
  if (order.customerEmail) {
    await sendEmail({
      to: order.customerEmail,
      subject: `Order Status Update - ${order.orderId || order._id}`,
      htmlContent: `<p>Hi ${order.customerName || 'Customer'},</p>
                    <p>Your order status has been updated to: <strong>${status}</strong>.</p>
                    <p>Thank you for shopping with Fashion Oasis!</p>`,
    });
  }
  
  return order;
};
