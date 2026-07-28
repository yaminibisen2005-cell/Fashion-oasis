import Customer from '../models/Customer.js';
import AppError from '../utils/AppError.js';

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
 // @desc    Get current customer profile by email query
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
        address: customer.address || ''
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

    // Find customer by original email reference or fallback to current email body
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