 import express from 'express';
import { 
  registerCustomer, 
  loginCustomer, 
  forgotPassword,
  resetPassword,
  getProfile, 
  updateProfile,
  updatePassword,
  deleteAccount,
  updateTwoFactor ,
  getCart,   // <-- IMPORT THIS
  saveCart// <-- IMPORT THIS

} from '../controllers/customerAuth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { protectCustomer } from '../middlewares/auth.middleware.js';
import { customerRegisterSchema, customerLoginSchema } from '../schemas/customer.schema.js';
import { forgotPasswordSchema, resetPasswordSchema, updateProfileSchema, updatePasswordSchema, updateTwoFactorSchema, deleteAccountSchema } from '../schemas/validation.schemas.js';

const router = express.Router();

router.post('/register', validate(customerRegisterSchema), registerCustomer);
router.post('/login', validate(customerLoginSchema), loginCustomer);

// Forgot & Reset Password routes
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.put('/reset-password/:token', validate(resetPasswordSchema), resetPassword);

// Profile routes
router.get('/profile', protectCustomer, getProfile);
router.put('/profile', protectCustomer, validate(updateProfileSchema), updateProfile);

// Account Settings Management routes
router.put('/password', protectCustomer, validate(updatePasswordSchema), updatePassword);
router.put('/two-factor', protectCustomer, validate(updateTwoFactorSchema), updateTwoFactor); // <-- ADD THIS ROUTE
router.delete('/account', protectCustomer, validate(deleteAccountSchema), deleteAccount);

router.get('/cart', protectCustomer, getCart);
router.post('/cart', protectCustomer, saveCart);
export default router;