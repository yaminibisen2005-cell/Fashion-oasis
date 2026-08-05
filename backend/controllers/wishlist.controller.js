import Customer from '../models/customer.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

// Get user wishlist
export const getWishlist = catchAsync(async (req, res, next) => {
  const customer = req.customer;
  
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
  const { product } = req.body;

  const customer = req.customer;
  if (!customer) {
    return next(new AppError('Customer not found', 404));
  }

  // Check if product already exists in wishlist
  const itemIndex = customer.wishlist.findIndex(item => item.id === product.id);

  if (itemIndex > -1) {
    // Remove item if it exists
    customer.wishlist.splice(itemIndex, 1);
  } else {
    // Add item if it doesn't exist. Validate fields implicitly by schema, explicit sanitization:
    const sanitizedProduct = {
      id: product.id,
      name: product.name,
      image: product.image || '',
      price: product.price || 0,
      oldPrice: product.oldPrice || 0
    };
    customer.wishlist.push(sanitizedProduct);
  }

  await customer.save();

  res.status(200).json({
    success: true,
    message: itemIndex > -1 ? 'Removed from wishlist' : 'Added to wishlist',
    wishlist: customer.wishlist
  });
});