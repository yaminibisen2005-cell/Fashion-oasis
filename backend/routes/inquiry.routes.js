import express from 'express';
import { protectAdmin } from '../middlewares/auth.middleware.js';
import {
  submitInquiry,
  getInquiriesAdmin,
  toggleInquiryStatus,
  deleteInquiry,
} from '../controllers/inquiry.controller.js';

const router = express.Router();

// Public endpoint for submitting contact inquiry
router.post('/', submitInquiry);

// Protected Admin endpoints
router.get('/admin', protectAdmin, getInquiriesAdmin);
router.patch('/:id/status', protectAdmin, toggleInquiryStatus);
router.delete('/:id', protectAdmin, deleteInquiry);

export default router;
