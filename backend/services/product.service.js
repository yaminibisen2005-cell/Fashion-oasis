import Product from '../models/Product.js';
import AppError from '../utils/AppError.js';

export const getAllProducts = async (page = 1, limit = 10, filter = {}) => {
  const skip = (page - 1) * limit;
  
  const [products, total] = await Promise.all([
    Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Product.countDocuments(filter)
  ]);
  
  return { products, total, totalPages: Math.ceil(total / limit), currentPage: page };
};

export const createProduct = async (productData) => {
  const product = await Product.create(productData);
  return product;
};

export const deleteProduct = async (productId, user) => {
  const product = await Product.findById(productId);
  if (!product) throw new AppError('Product not found', 404);
  
  if (user && user.role === 'seller' && product.seller?.toString() !== user._id.toString()) {
    throw new AppError('Not authorized', 403);
  }
  
  await Product.findByIdAndDelete(productId);
  return product;
};

export const toggleProductStatus = async (productId, user) => {
  const product = await Product.findById(productId);
  if (!product) throw new AppError('Product not found', 404);
  
  if (user && user.role === 'seller' && product.seller?.toString() !== user._id.toString()) {
    throw new AppError('Not authorized', 403);
  }
  
  product.status = product.status === 'Active' ? 'Inactive' : 'Active';
  await product.save();
  return product;
};

export const updateProductStock = async (productId, stock, user) => {
  const product = await Product.findById(productId);
  if (!product) throw new AppError('Product not found', 404);
  
  if (user && user.role === 'seller' && product.seller?.toString() !== user._id.toString()) {
    throw new AppError('Not authorized', 403);
  }
  
  product.stock = stock;
  await product.save();
  return product;
};
