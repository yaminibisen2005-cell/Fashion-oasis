 import express from 'express';
const router = express.Router();
import { validate } from '../middlewares/validate.middleware.js';
import { orderCreateSchema } from '../schemas/validation.schemas.js';
import { createOrder, getOrders } from '../controllers/order.controller.js'; // <--- Import getOrders

router.post('/checkout', validate(orderCreateSchema), createOrder);
router.get('/', getOrders); // <--- Add this GET endpoint

export default router;