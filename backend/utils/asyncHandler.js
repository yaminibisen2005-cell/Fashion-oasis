// utils/asyncHandler.js
// Simple wrapper to handle async route handlers and forward errors to Express error middleware.
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
