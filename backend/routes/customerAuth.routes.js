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
  updateTwoFactor,
  getCart,
  saveCart,
  googleAuth,
  getCustomerReviews
} from '../controllers/customerAuth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { protectCustomer } from '../middlewares/auth.middleware.js';
import { customerRegisterSchema, customerLoginSchema } from '../schemas/customer.schema.js';
import { forgotPasswordSchema, resetPasswordSchema, updateProfileSchema, updatePasswordSchema, updateTwoFactorSchema, deleteAccountSchema } from '../schemas/validation.schemas.js';

const router = express.Router();

router.post('/register', validate(customerRegisterSchema), registerCustomer);
router.post('/login', validate(customerLoginSchema), loginCustomer);
router.post('/google', googleAuth);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.put('/reset-password/:token', validate(resetPasswordSchema), resetPassword);

router.get('/profile', protectCustomer, getProfile);
router.get('/reviews', protectCustomer, getCustomerReviews);
router.put('/profile', protectCustomer, validate(updateProfileSchema), updateProfile);

router.put('/password', protectCustomer, validate(updatePasswordSchema), updatePassword);
router.put('/two-factor', protectCustomer, validate(updateTwoFactorSchema), updateTwoFactor);
router.delete('/account', protectCustomer, validate(deleteAccountSchema), deleteAccount);

router.get('/cart', protectCustomer, getCart);
router.post('/cart', protectCustomer, saveCart);

export default router;