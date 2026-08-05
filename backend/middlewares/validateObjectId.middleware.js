import mongoose from 'mongoose';
import AppError from '../utils/AppError.js';

export const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new AppError('Invalid resource ID', 400));
  }
  next();
};
