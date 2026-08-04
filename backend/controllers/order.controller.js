 import Order from '../models/Order.js';
import Customer from '../models/customer.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

export const createOrder = catchAsync(async (req, res, next) => {
  const { customerEmail, shippingAddress, billingAddress, paymentMethod, items, totalAmount } = req.body;

  if (!customerEmail) {
    return next(new AppError('Customer email is required for checkout', 400));
  }

  const customer = await Customer.findOne({ email: customerEmail });
  if (!customer) {
    return next(new AppError('Customer not found', 404));
  }

  const orderId = `FO-${Math.floor(100000 + Math.random() * 900000)}`;

  const order = await Order.create({
    orderId,
    customer: customer._id,
    customerEmail, // <--- Added this line so Mongoose gets the required field
    customerName: `${customer.firstName} ${customer.lastName}`,
    shippingAddress,
    billingAddress,
    paymentMethod,
    items,
    totalAmount
  });

  res.status(201).json({
    success: true,
    message: 'Order placed successfully',
    data: order
  });
});