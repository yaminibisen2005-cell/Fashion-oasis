 import Customer from '../models/customer.js';
import AppError from '../utils/AppError.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// Helper function to send email via Brevo SMTP
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `Fashion Oasis <${process.env.EMAIL_FROM}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

// @desc    Register new customer
// @route   POST /api/v1/customer/auth/register
export const registerCustomer = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return next(new AppError('Passwords do not match', 400));
    }

    // Check if customer already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return next(new AppError('Email is already registered', 400));
    }

    // Create customer in MongoDB
    const customer = await Customer.create({
      firstName,
      lastName,
      email,
      password
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
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

    res.status(200).json({
      success: true,
      message: 'Login successful',
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
      return next(new AppError('There is no user with that email address.', 404));
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
        email: customer.email,
        subject: 'Password Reset Token (Valid for 10 mins)',
        message,
      });

      res.status(200).json({
        success: true,
        message: 'Token sent to email!',
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
    const email = req.query.email;
    const customer = email
      ? await Customer.findOne({ email })
      : await Customer.findOne();

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
    const { originalEmail, firstName, lastName, email, phone, gender, address } = req.body;

    const lookupEmail = originalEmail || email;
    const customer = await Customer.findOne({ email: lookupEmail });

    if (!customer) {
      return next(new AppError('Customer not found', 404));
    }

    if (firstName) customer.firstName = firstName;
    if (lastName) customer.lastName = lastName;
    if (email) customer.email = email;
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
    const { email, currentPassword, newPassword } = req.body;

    if (!email || !currentPassword || !newPassword) {
      return next(new AppError('Please provide email, current password, and new password', 400));
    }

    const customer = await Customer.findOne({ email }).select('+password');

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
    const email = req.body.email || req.query.email;

    if (!email) {
      return next(new AppError('Email is required to delete account', 400));
    }

    const customer = await Customer.findOneAndDelete({ email });

    if (!customer) {
      return next(new AppError('Customer not found', 404));
    }

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
    const { email, twoFactorEnabled } = req.body;

    if (!email) {
      return next(new AppError('Email is required', 400));
    }

    const customer = await Customer.findOne({ email });
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