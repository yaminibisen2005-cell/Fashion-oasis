 import Customer from '../models/customer.js';
import Order from '../models/Order.js';
import Review from '../models/Review.js';
import AppError from '../utils/AppError.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/emailService.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

const FIREBASE_PUBLIC_KEYS_URL = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';

const verifyFirebaseIdToken = async (idToken) => {
  if (!idToken || typeof idToken !== 'string') {
    throw new AppError('Firebase ID token is required for Google authentication', 400);
  }

  const decodedToken = jwt.decode(idToken, { complete: true });
  if (!decodedToken || !decodedToken.payload || !decodedToken.header) {
    throw new AppError('Invalid Firebase ID token', 400);
  }

  const projectId = process.env.FIREBASE_PROJECT_ID || decodedToken.payload.aud;
  if (!projectId) {
    throw new AppError('Firebase project ID is not configured on the server', 500);
  }

  const response = await fetch(FIREBASE_PUBLIC_KEYS_URL);
  if (!response.ok) {
    throw new AppError('Unable to verify Firebase token at this time', 502);
  }

  const publicKeys = await response.json();
  const publicKey = publicKeys[decodedToken.header.kid];

  if (!publicKey) {
    throw new AppError('Invalid Firebase token signature key', 401);
  }

  try {
    const verifiedToken = jwt.verify(idToken, publicKey, {
      algorithms: ['RS256'],
      issuer: `https://securetoken.google.com/${projectId}`,
      audience: projectId,
    });
    return verifiedToken;
  } catch (error) {
    throw new AppError('Invalid or expired Firebase ID token', 401);
  }
};
// Local Nodemailer sendEmail removed; using shared Brevo sendEmail utility.

// @desc    Register new customer
// @route   POST /api/v1/customer/auth/register
 export const registerCustomer = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    // Accept either 'phone' or 'phoneNumber' from the frontend form
    const phone = req.body.phone || req.body.phoneNumber;

    if (password !== confirmPassword) {
      return next(new AppError('Passwords do not match', 400));
    }

    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return next(new AppError('Email is already registered', 400));
    }

    const customer = await Customer.create({
      firstName,
      lastName,
      email,
      password,
      phone: phone || ''
    });

    const token = signToken(customer._id);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      data: {
        id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone
      }
    });
  } catch (error) {
    next(error);
  }
};
// @desc    Login customer
// @route   POST /api/v1/customer/auth/login
export const loginCustomer = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }

    // Find customer and include password field
    const customer = await Customer.findOne({ email }).select('+password');

    if (!customer || !(await customer.comparePassword(password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    const token = signToken(customer._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      data: {
        id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot Password - Send Reset Token Email via Brevo
// @route   POST /api/v1/customer/auth/forgot-password
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(200).json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent.',
      });
    }

    // Generate random reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Hash token and set to resetPasswordToken field with 10 minutes expiry
    customer.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    customer.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await customer.save({ validateBeforeSave: false });

    // Create reset URL (pointing to frontend reset page)
    const resetUrl = `${req.protocol}://localhost:5173/reset-password/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email.`;

    try {
      await sendEmail({
        to: customer.email,
        subject: 'Password Reset Token (Valid for 10 mins)',
        htmlContent: message,
      });

      res.status(200).json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent.',
      });
    } catch (err) {
      customer.resetPasswordToken = undefined;
      customer.resetPasswordExpire = undefined;
      await customer.save({ validateBeforeSave: false });

      return next(new AppError('There was an error sending the email. Try again later!', 500));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Reset Password
// @route   PUT /api/v1/customer/auth/reset-password/:token
export const resetPassword = async (req, res, next) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const customer = await Customer.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!customer) {
      return next(new AppError('Token is invalid or has expired', 400));
    }

    // Set new password
    customer.password = req.body.password;
    customer.resetPasswordToken = undefined;
    customer.resetPasswordExpire = undefined;
    await customer.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully!',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current customer profile
export const getProfile = async (req, res, next) => {
  try {
    let customer = req.customer;

    const emailQuery = req.query.email || req.query.userEmail;
    if (!customer && emailQuery) {
      customer = await Customer.findOne({ email: emailQuery.toLowerCase() });
    }

    if (!customer) {
      return next(new AppError('Customer not found. Please log in.', 404));
    }

    res.status(200).json({
      success: true,
      data: {
        id: customer._id,
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        email: customer.email,
        phone: customer.phone || '',
        gender: customer.gender || '',
        dob: customer.dob || '',
        address: customer.address || '',
        twoFactorEnabled: customer.twoFactorEnabled || false
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update customer profile supporting originalEmail reference
export const updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, gender, dob, address, originalEmail } = req.body;

    let customer = req.customer;

    if (!customer && originalEmail) {
      customer = await Customer.findOne({ email: originalEmail.toLowerCase() });
    }

    if (!customer && email) {
      customer = await Customer.findOne({ email: email.toLowerCase() });
    }

    if (!customer) {
      return next(new AppError('Customer not found. Please log in.', 404));
    }

    if (email && email.toLowerCase() !== customer.email) {
      const existing = await Customer.findOne({ email: email.toLowerCase() });
      if (existing && String(existing._id) !== String(customer._id)) {
        return next(new AppError('Email address is already in use by another account', 400));
      }
      customer.email = email.toLowerCase();
    }

    if (firstName !== undefined) customer.firstName = firstName.trim();
    if (lastName !== undefined) customer.lastName = lastName.trim();
    if (phone !== undefined) customer.phone = phone.trim();
    if (gender !== undefined) customer.gender = gender;
    if (dob !== undefined) customer.dob = dob;
    if (address !== undefined) customer.address = address.trim();

    await customer.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        gender: customer.gender,
        dob: customer.dob,
        address: customer.address,
        twoFactorEnabled: customer.twoFactorEnabled || false
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update customer password
export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (currentPassword === newPassword) {
      return next(new AppError('New password cannot be the same as the current password', 400));
    }

    const customer = await Customer.findById(req.customer._id).select('+password');

    if (!customer || !(await customer.comparePassword(currentPassword))) {
      return next(new AppError('Your current password is incorrect', 401));
    }

    customer.password = newPassword;
    await customer.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete customer account
export const deleteAccount = async (req, res, next) => {
  try {
    const { password } = req.body;

    const customer = await Customer.findById(req.customer._id).select('+password');

    if (!customer || !(await customer.comparePassword(password))) {
      return next(new AppError('Incorrect password', 401));
    }

    await Customer.findByIdAndDelete(req.customer._id);

    res.status(200).json({
      success: true,
      message: 'Account deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Two-Factor Authentication status
// @route   PUT /api/v1/customer/two-factor
export const updateTwoFactor = async (req, res, next) => {
  try {
    const { twoFactorEnabled } = req.body;

    const customer = req.customer;
    if (!customer) {
      return next(new AppError('Customer not found', 404));
    }

    customer.twoFactorEnabled = twoFactorEnabled;
    await customer.save();

    res.status(200).json({
      success: true,
      message: `Two-factor authentication ${twoFactorEnabled ? 'enabled' : 'disabled'} successfully`,
      data: { twoFactorEnabled: customer.twoFactorEnabled }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user cart
// @route   GET /api/v1/customer/cart
export const getCart = async (req, res, next) => {
  try {
    const customer = req.customer;
    
    if (!customer) {
      return next(new AppError('Customer not found', 404));
    }

    res.status(200).json({
      success: true,
      cart: customer.cart || []
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Save/Sync user cart
// @route   POST /api/v1/customer/cart
 // @desc    Save/Sync user cart
// @route   POST /api/v1/customer/cart
export const saveCart = async (req, res, next) => {
  try {
    const { cart } = req.body;
    const customerId = req.customer._id;

    const formattedCart = (cart || []).map(item => ({
      product: {
        id: String(item.product?.id || item.product?._id || ''),
        name: item.product?.name || '',
        image: item.product?.image || '',
        price: item.product?.price || 0,
        oldPrice: item.product?.oldPrice || 0
      },
      quantity: item.quantity || 1
    }));

    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      { $set: { cart: formattedCart } },
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return next(new AppError('Customer not found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Cart updated successfully',
      cart: updatedCustomer.cart
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Google Authentication (Sign up / Login)
// @route   POST /api/v1/customer/google
export const googleAuth = async (req, res, next) => {
  try {
    const { token: idToken, name: requestName, email: requestEmail, photo: requestPhoto } = req.body;

    const verifiedToken = await verifyFirebaseIdToken(idToken);
    const email = verifiedToken.email || requestEmail;

    if (!email) {
      return next(new AppError('Email is required for Google authentication', 400));
    }

    // Check if customer already exists
    let customer = await Customer.findOne({ email });

    const name = verifiedToken.name || requestName || '';
    const photo = verifiedToken.picture || requestPhoto || '';
    const nameParts = name.trim().split(' ').filter(Boolean);
    const firstName = nameParts[0] || 'Customer';
    const lastName = nameParts.slice(1).join(' ') || firstName;

    if (!customer) {
      // Create a random secure password since they are logging in via Google
      const randomPassword = crypto.randomBytes(16).toString('hex');

      customer = await Customer.create({
        firstName,
        lastName,
        email,
        password: randomPassword,
        phone: '',
        avatar: photo || undefined,
      });
    } else {
      const updates = {};
      if (photo && customer.avatar !== photo) updates.avatar = photo;
      if (name && customer.firstName !== firstName) updates.firstName = firstName;
      if (name && customer.lastName !== lastName) updates.lastName = lastName;

      if (Object.keys(updates).length) {
        customer = await Customer.findByIdAndUpdate(customer._id, updates, {
          new: true,
          runValidators: true,
        });
      }
    }

    const token = signToken(customer._id);

    res.status(200).json({
      success: true,
      message: 'Google authentication successful',
      token,
      data: {
        id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone || '',
        avatar: customer.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};
// @desc    Upload customer avatar
// @route   POST /api/v1/customer/avatar
export const uploadAvatar = async (req, res, next) => {
  try {
    const customer = req.customer;

    if (!customer) {
      return next(new AppError('Customer not found', 404));
    }

    if (!req.file) {
      return next(new AppError('Please upload an image file', 400));
    }

    // Upload to cloudinary
    const result = await uploadToCloudinary(req.file.buffer, 'fashion_oasis/avatars');

    customer.avatar = result.secure_url;
    await customer.save();

    res.status(200).json({
      success: true,
      message: 'Avatar uploaded successfully',
      data: {
        avatar: customer.avatar
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get customer dashboard stats
// @route   GET /api/v1/customer/dashboard/stats
export const getCustomerDashboardStats = async (req, res, next) => {
  try {
    const customer = req.customer;
    if (!customer) {
      return next(new AppError('Customer session not found', 401));
    }

    console.log("[getCustomerDashboardStats] req.customer:", customer._id, customer.email);

    const orders = await Order.find({
      $or: [
        { customer: customer._id },
        { customerEmail: customer.email }
      ]
    }).sort({ createdAt: -1 });

    console.log("[getCustomerDashboardStats] orders count:", orders.length);

    const reviews = await Review.find({
      $or: [
        { customer: customer._id },
        { customerEmail: customer.email }
      ]
    });

    const totalOrders = orders.length;
    const recentOrders = orders.slice(0, 5);
    const lastOrderDate = orders.length > 0 && orders[0].createdAt
      ? new Date(orders[0].createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
      : "";

    const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Processing' || o.status === 'Shipped').length;
    const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;
    const cancelledOrders = orders.filter(o => o.status === 'Cancelled').length;

    const statsData = {
      totalOrders,
      recentOrders,
      lastOrderDate,
      pendingOrders,
      deliveredOrders,
      cancelledOrders,
      wishlistCount: customer.wishlist ? customer.wishlist.length : 0,
      reviewsCount: reviews.length,
      rewardPoints: totalOrders * 50
    };

    res.status(200).json({
      success: true,
      ...statsData,
      data: statsData
    });
  } catch (error) {
    next(error);
  }
};
