import Review from '../models/Review.js';
import Product from '../models/Product.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';

export const getReviews = catchAsync(async (req, res) => {
  const products = await Product.find({ seller: req.user._id }).select('name').lean();
  const productNames = products.map((p) => p.name);

  const reviews = await Review.find({ product: { $in: productNames } })
    .sort({ createdAt: -1 })
    .lean();
  
  res.status(200).json({ success: true, data: reviews });
});

export const toggleReviewStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById(id);
  
  if (!review) {
    throw new AppError('Review not found', 404);
  }

  // To ensure seller owns the product
  const product = await Product.findOne({ name: review.product, seller: req.user._id });
  if (!product) {
    throw new AppError('Unauthorized to modify this review', 403);
  }

  review.status = review.status === 'Approved' ? 'Pending' : 'Approved';
  await review.save();
  
  res.status(200).json({ success: true, data: review });
});

export const deleteReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById(id);

  if (!review) {
    throw new AppError('Review not found', 404);
  }

  const product = await Product.findOne({ name: review.product, seller: req.user._id });
  if (!product) {
    throw new AppError('Unauthorized to delete this review', 403);
  }

  await Review.findByIdAndDelete(id);
  
  res.status(200).json({ success: true, message: 'Review deleted successfully' });
});
