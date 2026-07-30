import AppError from '../utils/AppError.js';

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (err) {
    next(new AppError(err.errors[0].message, 400));
  }
};
