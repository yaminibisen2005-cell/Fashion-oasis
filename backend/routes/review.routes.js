import express from 'express';
import { protectCustomer } from '../middlewares/auth.middleware.js';
import {
  createReview,
  getMyReviews,
  getProductReviews,
  updateReview,
  deleteReview
} from '../controllers/review.controller.js';

const router = express.Router();

// Public route to fetch reviews for a product
router.get('/product/:productId', getProductReviews);

// Protected routes for authenticated customers
router.use(protectCustomer);

router.post('/', createReview);
router.get('/my', getMyReviews);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;
