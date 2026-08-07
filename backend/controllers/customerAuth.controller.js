 import Customer from '../models/customer.js';
import AppError from '../utils/AppError.js';
import crypto from 'crypto';
// Nodemailer removed; using Brevo email service.

// Helper function to send email via Brevo SMTP
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/emailService.js';

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
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

// @desc    Get current customer profile by email query
 // Inside getProfile, update the response object to include twoFactorEnabled:
export const getProfile = async (req, res, next) => {
  try {
    const customer = req.customer;

    if (!customer) {
      return next(new AppError('Customer not found', 404));
    }

    res.status(200).json({
      success: true,
      data: {
        id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone || '',
        gender: customer.gender || '',
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
    const { firstName, lastName, email, phone, gender, address } = req.body;

    const customer = req.customer;

    if (!customer) {
      return next(new AppError('Customer not found', 404));
    }

    if (firstName !== undefined) customer.firstName = firstName;
    if (lastName !== undefined) customer.lastName = lastName;
    if (email !== undefined) customer.email = email;
    if (phone !== undefined) customer.phone = phone;
    if (gender !== undefined) customer.gender = gender;
    if (address !== undefined) customer.address = address;

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
        address: customer.address
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
// @route   POST /api/v1/customer/auth/google
export const googleAuth = async (req, res, next) => {
  try {
    const { name, email, photo } = req.body;

    if (!email) {
      return next(new AppError('Email is required for Google authentication', 400));
    }

    // Check if customer already exists
    let customer = await Customer.findOne({ email });

    if (!customer) {
      // Split name into first and last name if available
      const nameParts = (name || '').trim().split(' ');
      const firstName = nameParts[0] || 'Customer';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Create a random secure password since they are logging in via Google
      const randomPassword = crypto.randomBytes(16).toString('hex');

      customer = await Customer.create({
        firstName,
        lastName,
        email,
        password: randomPassword,
        phone: '',
      });
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
      },
    });
  } catch (error) {
    next(error);
  }
};