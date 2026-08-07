import Order from '../models/Order.js';
import AppError from '../utils/AppError.js';
import { sendEmail } from '../utils/emailService.js';

export const getAllOrders = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
  
  const total = await Order.countDocuments();
  
  return {
    orders,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total
    }
  };
};

export const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true, runValidators: true }
  ).lean();

  if (!order) {
    throw new AppError('Order not found', 404);
  }
  
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
