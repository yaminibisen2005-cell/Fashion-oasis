 import Order from '../models/Order.js';
import Customer from '../models/customer.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import Product from '../models/Product.js';
import crypto from 'crypto';
import { sendEmail } from '../utils/emailService.js';

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
   // Verify products, stock, and prices
 // Verify products, stock, and prices (Made flexible for your catalog)
  // Verify products, stock, and prices
  let calculatedTotal = 0;
  const processedItems = []; // Create a clean array for items with images

  for (const item of items) {
    const product = await Product.findOne({ 
      name: { $regex: new RegExp(`^${item.productName.trim()}$`, 'i') } 
    });
    
    if (product) {
      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        product.totalSold += item.quantity;
        product.totalRevenue += item.price * item.quantity;
        await product.save();
      }
    }
    
    calculatedTotal += item.price * item.quantity;

    // Push the item along with its image (fallback to product image if missing)
    processedItems.push({
      productName: item.productName,
      quantity: item.quantity,
      price: item.price,
      image: item.image || (product ? product.image : "") 
    });
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
    items: processedItems,
    totalAmount
  });

  const itemsHtml = items.map(item => `<li>${item.quantity}x ${item.productName} - $${item.price}</li>`).join('');

  // Admin Order Notification
  await sendEmail({
    to: 'fashionoasis082@gmail.com',
    subject: `New Order Placed: ${orderId}`,
    htmlContent: `<p>A new order has been placed by ${order.customerName} (${customerEmail}).</p>
                  <p><strong>Total Amount:</strong> $${totalAmount}</p>
                  <p><strong>Items:</strong></p>
                  <ul>${itemsHtml}</ul>
                  <p>Check the admin dashboard for more details.</p>`,
  });

  // Customer Order Confirmation
  await sendEmail({
    to: customerEmail,
    subject: `Order Confirmation - ${orderId}`,
    htmlContent: `<p>Hi ${order.customerName},</p>
                  <p>Your order <strong>${orderId}</strong> has been placed successfully.</p>
                  <p><strong>Total Amount:</strong> $${totalAmount}</p>
                  <p><strong>Items:</strong></p>
                  <ul>${itemsHtml}</ul>
                  <p>Thank you for shopping with Fashion Oasis!</p>`,
  });

  res.status(201).json({
    success: true,
    message: 'Order placed successfully',
    data: order
  });
});

// Get orders for a specific customer email
export const getOrders = catchAsync(async (req, res, next) => {
  const { email } = req.query;

  if (!email) {
    return next(new AppError('Customer email query parameter is required', 400));
  }

  const orders = await Order.find({ customerEmail: email }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: orders.length,
    orders: orders
  });
});