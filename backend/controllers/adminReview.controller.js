import Review from '../models/Review.js';

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const getReviews = catchAsync(async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 }).lean();
  res.status(200).json({ success: true, data: reviews });
});

export const toggleReviewStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById(id);
  if (!review) {
    return res.status(404).json({ success: false, message: 'Review not found' });
  }
  review.status = review.status === 'Approved' ? 'Pending' : 'Approved';
  await review.save();
  res.status(200).json({ success: true, data: review });
});

export const deleteReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const review = await Review.findByIdAndDelete(id);
  if (!review) {
    return res.status(404).json({ success: false, message: 'Review not found' });
  }
  res.status(200).json({ success: true, message: 'Review deleted successfully' });
});
