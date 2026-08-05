import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

export const registerAdminService = async ({ name, email, password, adminKey }) => {
  if (!name || name.trim().length < 2)
    throw new AppError('Name must be at least 2 characters.', 400);

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new AppError('Please provide a valid email address.', 400);

  if (!password || password.length < 6)
    throw new AppError('Password must be at least 8 characters.', 400);

  if (!adminKey)
    throw new AppError('Admin secret key is required.', 400);

  if (adminKey !== process.env.ADMIN_REGISTER_SECRET)
    throw new AppError('Invalid admin secret key.', 403);

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser)
    throw new AppError('This email is already registered.', 409);

  const user = await User.create({ name: name.trim(), email, password, role: 'admin' });

  const token = signToken(user._id, user.role);
  user.password = undefined;

  return { user, token };
};

export const loginAdminService = async ({ email, password }) => {
  if (!email || !password)
    throw new AppError('Email and password are required.', 400);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new AppError('Please provide a valid email address.', 400);

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

  if (!user || !(await user.comparePassword(password, user.password)))
    throw new AppError('Incorrect email or password.', 401);

  if (user.role !== 'admin' && user.role !== 'super-admin')
    throw new AppError('Access denied. Admin credentials required.', 403);

  if (user.status === 'Inactive')
    throw new AppError('This admin account has been deactivated.', 403);

  const token = signToken(user._id);
  user.password = undefined;

  return { user, token };
};
