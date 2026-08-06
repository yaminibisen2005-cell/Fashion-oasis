import express from 'express';
import { protectSeller } from '../middlewares/auth.middleware.js';
import { getReviews, toggleReviewStatus, deleteReview } from '../controllers/sellerReview.controller.js';

const router = express.Router();

router.use(protectSeller);

router.get('/', getReviews);
router.patch('/:id/status', toggleReviewStatus);
router.delete('/:id', deleteReview);

export default router;
