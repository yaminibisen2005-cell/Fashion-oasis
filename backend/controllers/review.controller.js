import catchAsync from '../utils/catchAsync.js';
import * as reviewService from '../services/review.service.js';

export const createReview = catchAsync(async (req, res) => {
  const { productId, orderId, rating, comment } = req.body;

  console.log("[createReview] Customer:", req.customer ? req.customer._id : "None");
  console.log("[createReview] Payload:", { productId, orderId, rating, comment });

  const review = await reviewService.createReview({
    customer: req.customer,
    productId,
    orderId,
    rating,
    comment
  });

  res.status(201).json({
    success: true,
    message: 'Review submitted successfully',
    data: review,
    review
  });
});

export const getMyReviews = catchAsync(async (req, res) => {
  const reviews = await reviewService.getMyReviews(req.customer);

  res.status(200).json({
    success: true,
    count: reviews.length,
    reviews,
    data: reviews
  });
});

export const getProductReviews = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const reviews = await reviewService.getProductReviews(productId);

  res.status(200).json({
    success: true,
    count: reviews.length,
    reviews,
    data: reviews
  });
});

export const updateReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const review = await reviewService.updateReview(id, req.customer, req.body);

  res.status(200).json({
    success: true,
    message: 'Review updated successfully',
    data: review,
    review
  });
});

export const deleteReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  await reviewService.deleteReview(id, req.customer);

  res.status(200).json({
    success: true,
    message: 'Review deleted successfully'
  });
});
