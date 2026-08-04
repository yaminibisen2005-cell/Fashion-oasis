import Customer from '../models/customer.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

// Get user wishlist
export const getWishlist = catchAsync(async (req, res, next) => {
  const { email } = req.params;
  const customer = await Customer.findOne({ email });
  
  if (!customer) {
    return next(new AppError('Customer not found', 404));
  }

  res.status(200).json({
    success: true,
    wishlist: customer.wishlist || []
  });
});

// Toggle wishlist item (Add if not present, remove if already present)
export const toggleWishlist = catchAsync(async (req, res, next) => {
  const { customerEmail, product } = req.body;

  if (!customerEmail || !product || !product.id) {
    return next(new AppError('Customer email and product details are required', 400));
  }

  const customer = await Customer.findOne({ email: customerEmail });
  if (!customer) {
    return next(new AppError('Customer not found', 404));
  }

  // Check if product already exists in wishlist
  const itemIndex = customer.wishlist.findIndex(item => item.id === product.id);

  if (itemIndex > -1) {
    // Remove item if it exists
    customer.wishlist.splice(itemIndex, 1);
  } else {
    // Add item if it doesn't exist
    customer.wishlist.push(product);
  }

  await customer.save();

  res.status(200).json({
    success: true,
    message: itemIndex > -1 ? 'Removed from wishlist' : 'Added to wishlist',
    wishlist: customer.wishlist
  });
});