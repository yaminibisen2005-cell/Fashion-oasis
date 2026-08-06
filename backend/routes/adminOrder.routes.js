import express from 'express';
import { getOrders, updateOrderStatus } from '../controllers/adminOrder.controller.js';
import { protectAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protectAdmin);

router.get('/', getOrders);
router.patch('/:id/status', updateOrderStatus);

export default router;
