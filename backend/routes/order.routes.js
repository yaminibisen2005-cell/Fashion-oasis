import express from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import { protectCustomer } from '../middlewares/auth.middleware.js';
import { orderCreateSchema, cancelOrderSchema } from '../schemas/validation.schemas.js';
import { createOrder, getOrders, getMyOrders, getOrderById, cancelOrder } from '../controllers/order.controller.js';

const router = express.Router();

router.post('/', protectCustomer, validate(orderCreateSchema), createOrder);
router.post('/checkout', protectCustomer, validate(orderCreateSchema), createOrder);
router.get('/my-orders', protectCustomer, getMyOrders);
router.get('/:id', protectCustomer, getOrderById);
router.patch('/:id/cancel', protectCustomer, validate(cancelOrderSchema), cancelOrder);
router.get('/', protectCustomer, getOrders);

export default router;