// Routes for admin seller management
import express from 'express';
import {
  getAllSellers,
  getPendingSellers,
  approveSeller,
  rejectSeller,
  toggleSellerStatus,
} from '../controllers/adminSeller.controller.js';
import { protectAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protectAdmin);

// Get all approved sellers
router.get('/', getAllSellers);

// Get pending verification sellers
router.get('/pending', getPendingSellers);

// Approve seller
router.patch('/:id/approve', approveSeller);

// Reject seller (expects { reason } in body)
router.delete('/:id', rejectSeller);

// Toggle status Active/Suspended
router.patch('/:id/status', toggleSellerStatus);

export default router;
