import express from 'express';
import { getReviews, toggleReviewStatus, deleteReview } from '../controllers/adminReview.controller.js';
import { protectAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protectAdmin);

router.route('/')
  .get(getReviews);

router.route('/:id')
  .patch(toggleReviewStatus)
  .delete(deleteReview);

export default router;
