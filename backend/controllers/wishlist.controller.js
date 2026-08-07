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
  const customerId = req.customer._id;

  const customer = await Customer.findById(customerId);
  if (!customer) {
    return next(new AppError('Customer not found', 404));
  }

  // Ensure wishlist exists
  if (!customer.wishlist) {
    customer.wishlist = [];
  }

  // Check if product already exists in wishlist (handling string/number ID discrepancies)
  const productId = String(product.id || product._id || '');
  const itemIndex = customer.wishlist.findIndex(
    item => String(item.id || item._id || '') === productId
  );

  let updatedWishlist = [...customer.wishlist];

  if (itemIndex > -1) {
    // Remove item if it exists
    updatedWishlist.splice(itemIndex, 1);
  } else {
    // Add item if it doesn't exist
    const sanitizedProduct = {
      id: productId,
      name: product.name,
      image: product.image || '',
      price: product.price || 0,
      oldPrice: product.oldPrice || 0
    };
    updatedWishlist.push(sanitizedProduct);
  }

  const updatedCustomer = await Customer.findByIdAndUpdate(
    customerId,
    { $set: { wishlist: updatedWishlist } },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: itemIndex > -1 ? 'Removed from wishlist' : 'Added to wishlist',
    wishlist: updatedCustomer.wishlist
  });
});

// Get user cart
export const getCart = catchAsync(async (req, res, next) => {
  const customer = req.customer;
  
  if (!customer) {
    return next(new AppError('Customer not found', 404));
  }

  res.status(200).json({
    success: true,
    cart: customer.cart || []
  });
});

// Update or sync user cart
export const saveCart = catchAsync(async (req, res, next) => {
  const { cart } = req.body; // Expects an array of cart items
  const customerId = req.customer._id;

  const customer = await Customer.findById(customerId);
  if (!customer) {
    return next(new AppError('Customer not found', 404));
  }

  // Sanitize incoming cart items array
  const formattedCart = (cart || []).map(item => ({
    product: {
      id: String(item.product?.id || item.product?._id || ''),
      name: item.product?.name || '',
      image: item.product?.image || '',
      price: item.product?.price || 0,
      oldPrice: item.product?.oldPrice || 0
    },
    quantity: item.quantity || 1
  }));

  const updatedCustomer = await Customer.findByIdAndUpdate(
    customerId,
    { $set: { cart: formattedCart } },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: 'Cart updated successfully',
    cart: updatedCustomer.cart
  });
});