import Category from '../models/Category.js';
import Product from '../models/Product.js';
import AppError from '../utils/AppError.js';

export const getAllCategories = async () => {
  const categories = await Category.find().sort({ createdAt: -1 });

  const counts = await Product.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } }
  ]);
  const countMap = Object.fromEntries(counts.map((c) => [c._id, c.count]));

  return categories.map((cat) => ({
    ...cat.toObject(),
    productsCount: countMap[cat.name] || 0
  }));
};

export const createCategory = async ({ name }) => {
  const existing = await Category.findOne({ name });
  if (existing) {
    throw new AppError('Category already exists', 409);
  }
  return Category.create({ name });
};

export const deleteCategory = async (categoryId) => {
  const category = await Category.findByIdAndDelete(categoryId);
  if (!category) {
    throw new AppError('Category not found', 404);
  }
  return category;
};

export const toggleCategoryStatus = async (categoryId) => {
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new AppError('Category not found', 404);
  }

  category.status = category.status === 'Active' ? 'Inactive' : 'Active';
  await category.save();
  return category;
};
