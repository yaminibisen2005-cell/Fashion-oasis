import { validate } from '../middlewares/validate.middleware.js';
import { orderCreateSchema } from '../schemas/validation.schemas.js';
import { createOrder } from '../controllers/order.controller.js';


router.post('/checkout', validate(orderCreateSchema), createOrder);