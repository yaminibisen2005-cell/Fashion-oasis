import Order from '../models/Order.js';
import Customer from '../models/customer.js';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import Product from '../models/Product.js';
import crypto from 'crypto';
import { sendEmail } from '../utils/emailService.js';

export const createOrder = catchAsync(async (req, res, next) => {
  console.log("[createOrder] REQ.BODY:", JSON.stringify(req.body, null, 2));
  console.log("[createOrder] REQ.CUSTOMER:", req.customer ? req.customer._id : "No customer attached");

  const { shippingAddress, billingAddress, paymentMethod, items, totalAmount } = req.body;
  const rawEmail = req.body.customerEmail || req.customer?.email;

  // Clean customer email string if wrapped or formatted
  const customerEmail = typeof rawEmail === "string" ? rawEmail.replace(/\[|\]|\(mailto:[^)]+\)/g, "").trim() : "";

  if (!customerEmail) {
    return next(new AppError('Customer email is required for checkout', 400));
  }

  let customer = req.customer;
  if (!customer) {
    customer = await Customer.findOne({ email: customerEmail });
    if (!customer) {
      customer = await User.findOne({ email: customerEmail });
    }
  }

  const normalizedPayment = (paymentMethod || 'cod').toLowerCase();
  const validPaymentMethod = ['credit_card', 'debit_card', 'upi', 'cod'].includes(normalizedPayment) ? normalizedPayment : 'cod';

  let calculatedTotal = 0;
  const processedItems = [];

  for (const item of items) {
    const product = await Product.findOne({ 
      name: { $regex: new RegExp(`^${item.productName.trim()}$`, 'i') } 
    });
    
    if (product) {
      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        product.totalSold = (product.totalSold || 0) + item.quantity;
        product.totalRevenue = (product.totalRevenue || 0) + (item.price * item.quantity);
        await product.save();
      }
    }
    
    calculatedTotal += item.price * item.quantity;

    processedItems.push({
      productName: item.productName,
      quantity: item.quantity,
      price: item.price,
      image: item.image || (product ? product.image : "") 
    });
  }

  const orderId = `FO-${crypto.randomInt(100000, 999999)}`;
  const customerName = customer 
    ? `${customer.firstName || customer.name || 'Customer'} ${customer.lastName || ''}`.trim() 
    : (shippingAddress?.fullName || 'Customer');

  const order = await Order.create({
    orderId,
    customer: customer ? customer._id : undefined,
    customerEmail,
    customerName,
    shippingAddress: {
      fullName: shippingAddress?.fullName || customerName,
      phoneNumber: shippingAddress?.phoneNumber || shippingAddress?.phone || "9876543210",
      address: shippingAddress?.address || "Main Street",
      addressLine2: shippingAddress?.addressLine2 || shippingAddress?.address2 || "",
      city: shippingAddress?.city || "Mumbai",
      state: shippingAddress?.state || "Maharashtra",
      pincode: shippingAddress?.pincode || "400001"
    },
    billingAddress: billingAddress ? {
      fullName: billingAddress.fullName || customerName,
      phoneNumber: billingAddress.phoneNumber || billingAddress.phone || "9876543210",
      address: billingAddress.address || "Main Street",
      addressLine2: billingAddress.addressLine2 || billingAddress.address2 || "",
      city: billingAddress.city || "Mumbai",
      state: billingAddress.state || "Maharashtra",
      pincode: billingAddress.pincode || "400001"
    } : {
      fullName: shippingAddress?.fullName || customerName,
      phoneNumber: shippingAddress?.phoneNumber || shippingAddress?.phone || "9876543210",
      address: shippingAddress?.address || "Main Street",
      addressLine2: shippingAddress?.addressLine2 || shippingAddress?.address2 || "",
      city: shippingAddress?.city || "Mumbai",
      state: shippingAddress?.state || "Maharashtra",
      pincode: shippingAddress?.pincode || "400001"
    },
    paymentMethod: validPaymentMethod,
    items: processedItems,
    totalAmount
  });

  console.log("[createOrder] ORDER SAVED:", order.orderId);

  const itemsHtml = items.map(item => `<li>${item.quantity}x ${item.productName} - ₹${item.price}</li>`).join('');

  try {
    await sendEmail({
      to: 'fashionoasis082@gmail.com',
      subject: `New Order Placed: ${orderId}`,
      htmlContent: `<p>A new order has been placed by ${customerName} (${customerEmail}).</p>
                    <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
                    <p><strong>Items:</strong></p>
                    <ul>${itemsHtml}</ul>`,
    });

    await sendEmail({
      to: customerEmail,
      subject: `Order Confirmation - ${orderId}`,
      htmlContent: `<p>Hi ${customerName},</p>
                    <p>Your order <strong>${orderId}</strong> has been placed successfully.</p>
                    <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
                    <p><strong>Items:</strong></p>
                    <ul>${itemsHtml}</ul>`,
    });
  } catch (emailErr) {
    console.warn("Order email notification warning:", emailErr?.message || emailErr);
  }

  res.status(201).json({
    success: true,
    message: 'Order placed successfully',
    data: order
  });
});

export const getMyOrders = catchAsync(async (req, res, next) => {
  if (!req.customer) {
    return next(new AppError('Customer session not found', 401));
  }

  const customerId = req.customer._id;
  const customerEmail = req.customer.email;

  const orders = await Order.find({
    $or: [
      { customer: customerId },
      { customerEmail: customerEmail }
    ]
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: orders.length,
    orders: orders,
    data: orders
  });
});

export const getOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  let order;
  if (id.startsWith("FO-")) {
    order = await Order.findOne({ orderId: id });
  } else {
    order = await Order.findById(id);
  }

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  res.status(200).json({
    success: true,
    order: order,
    data: order
  });
});

export const getOrders = catchAsync(async (req, res, next) => {
  const email = req.query.email || req.customer?.email;

  let query = {};
  if (email) {
    query.customerEmail = email;
  } else if (req.customer) {
    query.customer = req.customer._id;
  }

  const orders = await Order.find(query).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: orders.length,
    orders: orders,
    data: orders
  });
});