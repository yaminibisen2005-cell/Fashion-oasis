import express from 'express';
import { protectAdmin } from '../middlewares/auth.middleware.js';
import {
  getActiveOffers,
  getAllOffersAdmin,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer,
  toggleOfferStatus,
} from '../controllers/offer.controller.js';

const router = express.Router();

// Public route for active non-expired offers
router.get('/', getActiveOffers);

// Admin-only routes
router.get('/admin', protectAdmin, getAllOffersAdmin);
router.get('/:id', getOfferById);

router.post('/', protectAdmin, createOffer);
router.put('/:id', protectAdmin, updateOffer);
router.delete('/:id', protectAdmin, deleteOffer);
router.patch('/:id/toggle', protectAdmin, toggleOfferStatus);

export default router;
