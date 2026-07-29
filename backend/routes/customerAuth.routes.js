import express from 'express';
import { 
  registerCustomer, 
  loginCustomer, 
  getProfile, 
  updateProfile 
} from '../controllers/customerAuth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { customerRegisterSchema, customerLoginSchema } from '../schemas/customer.schema.js';

const router = express.Router();

router.post('/register', validate(customerRegisterSchema), registerCustomer);
router.post('/login', validate(customerLoginSchema), loginCustomer);

// Profile routes (Add authentication middleware here if you use one, e.g., verifyToken)
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

export default router;