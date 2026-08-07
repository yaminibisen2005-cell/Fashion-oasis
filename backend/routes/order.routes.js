import express from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import { protectCustomer } from '../middlewares/auth.middleware.js';
import { orderCreateSchema } from '../schemas/validation.schemas.js';
import { createOrder, getOrders, getMyOrders, getOrderById } from '../controllers/order.controller.js';

const router = express.Router();

router.post('/', protectCustomer, validate(orderCreateSchema), createOrder);
router.post('/checkout', protectCustomer, validate(orderCreateSchema), createOrder);
router.get('/my-orders', protectCustomer, getMyOrders);
router.get('/:id', protectCustomer, getOrderById);
router.get('/', protectCustomer, getOrders);

export default router;