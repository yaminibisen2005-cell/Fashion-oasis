import express from 'express';
import { getAnalytics } from '../controllers/adminAnalytics.controller.js';
import { protectAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protectAdmin);
router.get('/', getAnalytics);

export default router;
