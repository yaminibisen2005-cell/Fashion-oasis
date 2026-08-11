import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import * as newsletterService from '../services/newsletter.service.js';

export const subscribeNewsletter = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return next(new AppError('Please provide a valid email address', 400));
  }

  const subscriber = await newsletterService.subscribeNewsletter(email);

  res.status(200).json({
    success: true,
    message: 'Subscribed Successfully',
    data: subscriber
  });
});
