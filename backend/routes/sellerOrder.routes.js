import express from 'express';
import * as sellerOrderController from '../controllers/sellerOrder.controller.js';
import { protectSeller } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protectSeller);

router.get('/', sellerOrderController.getOrders);
router.patch('/:id/status', sellerOrderController.updateOrderStatus);

export default router;
