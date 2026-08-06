import * as categoryService from '../services/category.service.js';

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const getCategories = catchAsync(async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.status(200).json({ success: true, data: categories });
});

export const addCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res.status(201).json({ success: true, data: category });
});

export const deleteCategory = catchAsync(async (req, res) => {
  await categoryService.deleteCategory(req.params.id);
  res.status(200).json({ success: true, data: null });
});

export const toggleCategoryStatus = catchAsync(async (req, res) => {
  const category = await categoryService.toggleCategoryStatus(req.params.id);
  res.status(200).json({ success: true, data: category });
});
