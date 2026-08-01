import * as productService from '../services/product.service.js';

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const getProducts = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  
  const result = await productService.getAllProducts(page, limit);
  res.status(200).json({ success: true, data: result.products, pagination: { total: result.total, totalPages: result.totalPages, currentPage: result.currentPage } });
});

export const addProduct = catchAsync(async (req, res) => {
  // Relying on mongoose schema validation for simplicity as per YAGNI (we can add Zod later if needed)
  const product = await productService.createProduct(req.body);
  res.status(201).json({ success: true, data: product });
});

export const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProduct(req.params.id);
  res.status(200).json({ success: true, data: null });
});

export const toggleProductStatus = catchAsync(async (req, res) => {
  const product = await productService.toggleProductStatus(req.params.id);
  res.status(200).json({ success: true, data: product });
});

export const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body);
  res.status(200).json({ success: true, data: product });
});

export const getProductById = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  res.status(200).json({ success: true, data: product });
});

export const getPublicProducts = catchAsync(async (req, res) => {
  const result = await productService.getPublicProducts(req.query);
  res.status(200).json({ success: true, data: result.products, pagination: { total: result.total, totalPages: result.totalPages, currentPage: result.currentPage } });
});

export const getFeaturedProducts = catchAsync(async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const products = await productService.getFeaturedProducts(limit);
  res.status(200).json({ success: true, data: products });
});
