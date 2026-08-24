import Product from '../models/Product.js';
import AppError from '../utils/AppError.js';

export const getAllProducts = async (page = 1, limit = 10, filter = {}) => {
  const skip = (page - 1) * limit;
  
  const [products, total] = await Promise.all([
    Product.find(filter).populate('seller', 'name email').sort({ createdAt: -1 }).skip(skip).limit(limit),
    Product.countDocuments(filter)
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

export const updateProduct = async (productId, updateData) => {
  const product = await Product.findByIdAndUpdate(productId, updateData, { new: true, runValidators: true });
  if (!product) {
    throw new AppError('Product not found', 404);
  }
  return product;
};

import mongoose from 'mongoose';

export const getProductById = async (productId) => {
  let product = null;

  if (mongoose.Types.ObjectId.isValid(productId)) {
    product = await Product.findById(productId);
  }

  if (!product) {
    product = await Product.findOne({ id: String(productId) });
  }

  if (!product) {
    // Check if ID matches string _id or name
    product = await Product.findOne({
      $or: [
        { _id: String(productId) },
        { name: { $regex: new RegExp(`^${productId}$`, 'i') } }
      ]
    });
  }

  if (!product) {
    throw new AppError('Product not found', 404);
  }
  return product;
};

export const getPublicProducts = async (query) => {
  const { page = 1, limit = 10, category, search } = query;
  const skip = (page - 1) * limit;

  const filter = { status: 'Active' };
  if (category && category !== 'All Products') filter.category = category;
  if (search) filter.name = { $regex: search, $options: 'i' };

  const [products, total] = await Promise.all([
    Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Product.countDocuments(filter)
  ]);

  return { products, total, totalPages: Math.ceil(total / limit), currentPage: Number(page) };
};

export const getFeaturedProducts = async (limit = 10) => {
  let products = await Product.find({ status: 'Active', isFeatured: true })
    .sort({ createdAt: -1 })
    .limit(Number(limit));

  if (!products || products.length === 0) {
    products = await Product.find({ status: 'Active' })
      .sort({ createdAt: -1 })
      .limit(Number(limit));
  }
  return products;
};

export const getRecommendedProducts = async (limit = 4) => {
  let products = await Product.find({ status: 'Active' })
    .sort({ totalSold: -1, rating: -1, createdAt: -1 })
    .limit(Number(limit));

  if (!products || products.length === 0) {
    products = await Product.find({ status: 'Active' })
      .sort({ createdAt: -1 })
      .limit(Number(limit));
  }
  return products;
};
