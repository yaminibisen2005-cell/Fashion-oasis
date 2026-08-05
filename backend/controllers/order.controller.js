 import Order from '../models/Order.js';
import Customer from '../models/customer.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import Product from '../models/Product.js';
import crypto from 'crypto';

export const createOrder = catchAsync(async (req, res, next) => {
  const { customerEmail, shippingAddress, billingAddress, paymentMethod, items, totalAmount } = req.body;

  if (!customerEmail) {
    return next(new AppError('Customer email is required for checkout', 400));
  }

  const customer = await Customer.findOne({ email: customerEmail });
  if (!customer) {
    return next(new AppError('Customer not found', 404));
  }

  const validPaymentMethods = ['credit_card', 'debit_card', 'upi', 'cod'];
  if (!validPaymentMethods.includes(paymentMethod)) {
    return next(new AppError('Invalid payment method', 400));
  }

  // Verify products, stock, and prices
  let calculatedTotal = 0;
  for (const item of items) {
    const product = await Product.findOne({ name: item.productName });
    if (!product) {
      return next(new AppError(`Product not found: ${item.productName}`, 404));
    }
    if (product.status !== 'Active') {
      return next(new AppError(`Product is not active: ${item.productName}`, 400));
    }
    if (product.stock < item.quantity) {
      return next(new AppError(`Insufficient stock for product: ${item.productName}`, 400));
    }
    if (product.price !== item.price) {
      return next(new AppError(`Price mismatch for product: ${item.productName}`, 400));
    }
    calculatedTotal += item.price * item.quantity;
    
    // Decrease stock
    product.stock -= item.quantity;
    product.totalSold += item.quantity;
    product.totalRevenue += item.price * item.quantity;
    await product.save();
  }

  if (calculatedTotal !== totalAmount) {
    return next(new AppError('Total amount mismatch', 400));
  }

  const orderId = `FO-${crypto.randomInt(100000, 999999)}`;

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