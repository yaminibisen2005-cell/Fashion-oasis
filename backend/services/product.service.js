import Product from '../models/Product.js';
import AppError from '../utils/AppError.js';

export const getAllProducts = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  
  const [products, total] = await Promise.all([
    Product.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    Product.countDocuments()
  ]);
  
  return { products, total, totalPages: Math.ceil(total / limit), currentPage: page };
};

export const createProduct = async (productData) => {
  const product = await Product.create(productData);
  return product;
};

export const deleteProduct = async (productId) => {
  const product = await Product.findByIdAndDelete(productId);
  if (!product) {
    throw new AppError('Product not found', 404);
  }
  return product;
};

export const toggleProductStatus = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError('Product not found', 404);
  }
  
  product.status = product.status === 'Active' ? 'Inactive' : 'Active';
  await product.save();
  return product;
};
