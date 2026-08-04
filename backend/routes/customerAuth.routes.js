 import express from 'express';
import { 
  registerCustomer, 
  loginCustomer, 
  forgotPassword,
  resetPassword,
  getProfile, 
  updateProfile 
} from '../controllers/customerAuth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { customerRegisterSchema, customerLoginSchema } from '../schemas/customer.schema.js';

const router = express.Router();

router.post('/register', validate(customerRegisterSchema), registerCustomer);
router.post('/login', validate(customerLoginSchema), loginCustomer);

// Forgot & Reset Password routes
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

// Profile routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

export default router;