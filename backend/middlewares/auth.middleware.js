import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

export const protectAdmin = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new AppError('You are not logged in. Please log in to get access.', 401);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fashion_oasis_super_secret_jwt_key_2026');

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    throw new AppError('The user belonging to this token no longer exists.', 401);
  }

  if (currentUser.role !== 'admin' && currentUser.role !== 'super-admin') {
    throw new AppError('You do not have permission to access admin resources.', 403);
  }

  req.user = currentUser;
  next();
});
