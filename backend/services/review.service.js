import Review from '../models/Review.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import AppError from '../utils/AppError.js';

export const createReview = async ({ customer, productId, orderId, rating, comment }) => {
  if (!customer) {
    throw new AppError('Customer authentication required', 401);
  }

  // 1. Verify customer has a delivered order for this product
  const query = {
    $or: [{ customer: customer._id }, { customerEmail: customer.email }],
    status: 'Delivered'
  };

  const deliveredOrders = await Order.find(query);

  const matchedOrder = deliveredOrders.find((ord) => {
    return ord.items && ord.items.some((item) => {
      const pId = item.productId || item.product?._id || item.product?.id || item._id;
      return String(pId) === String(productId) || item.productName?.toLowerCase() === String(productId).toLowerCase();
    });
  });

  if (!matchedOrder && deliveredOrders.length === 0) {
    throw new AppError('You can only review products from delivered orders.', 400);
  }

  // 2. Prevent duplicate reviews by the same customer for the same product
  const existingReview = await Review.findOne({
    $or: [{ customer: customer._id }, { customerEmail: customer.email }],
    product: productId
  });

  if (existingReview) {
    throw new AppError('You have already submitted a review for this product.', 400);
  }

  // 3. Create Review
  const customerName = `${customer.firstName || customer.name || 'Customer'} ${customer.lastName || ''}`.trim();
  const reviewDoc = await Review.create({
    customer: customer._id,
    customerName,
    customerEmail: customer.email,
    product: productId,
    order: matchedOrder ? matchedOrder._id : undefined,
    orderId: matchedOrder ? matchedOrder.orderId : orderId,
    rating: Number(rating),
    review: comment,
    comment: comment,
    status: 'Approved'
  });

  // 4. Update Product average rating and review count
  try {
    const allReviews = await Review.find({ product: productId, status: 'Approved' });
    const count = allReviews.length;
    const avgRating = count > 0 ? Number((allReviews.reduce((sum, r) => sum + r.rating, 0) / count).toFixed(1)) : 5;

    await Product.findByIdAndUpdate(productId, {
      rating: avgRating,
      reviews: count
    });
  } catch (err) {
    console.warn("Product rating update warning:", err?.message || err);
  }

  return reviewDoc;
};

export const getMyReviews = async (customer) => {
  if (!customer) {
    throw new AppError('Customer authentication required', 401);
  }
  return await Review.find({
    $or: [{ customer: customer._id }, { customerEmail: customer.email }]
  }).sort({ createdAt: -1 });
};

export const getProductReviews = async (productId) => {
  return await Review.find({ product: productId, status: 'Approved' }).sort({ createdAt: -1 });
};

export const updateReview = async (reviewId, customer, updateData) => {
  const review = await Review.findOne({
    _id: reviewId,
    $or: [{ customer: customer._id }, { customerEmail: customer.email }]
  });

  if (!review) {
    throw new AppError('Review not found or unauthorized', 404);
  }

  if (updateData.rating) review.rating = Number(updateData.rating);
  if (updateData.comment) {
    review.review = updateData.comment;
    review.comment = updateData.comment;
  }

  await review.save();

  // Recalculate product rating
  try {
    const allReviews = await Review.find({ product: review.product, status: 'Approved' });
    const count = allReviews.length;
    const avgRating = count > 0 ? Number((allReviews.reduce((sum, r) => sum + r.rating, 0) / count).toFixed(1)) : 5;

    await Product.findByIdAndUpdate(review.product, {
      rating: avgRating,
      reviews: count
    });
  } catch (err) {
    console.warn("Product rating update warning:", err);
  }

  return review;
};

export const deleteReview = async (reviewId, customer) => {
  const review = await Review.findOneAndDelete({
    _id: reviewId,
    $or: [{ customer: customer._id }, { customerEmail: customer.email }]
  });

  if (!review) {
    throw new AppError('Review not found or unauthorized', 404);
  }

  // Recalculate product rating
  try {
    const allReviews = await Review.find({ product: review.product, status: 'Approved' });
    const count = allReviews.length;
    const avgRating = count > 0 ? Number((allReviews.reduce((sum, r) => sum + r.rating, 0) / count).toFixed(1)) : 5;

    await Product.findByIdAndUpdate(review.product, {
      rating: avgRating,
      reviews: count
    });
  } catch (err) {
    console.warn("Product rating update warning:", err);
  }

  return review;
};
