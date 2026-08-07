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
<<<<<<< HEAD
  uploadAvatar
=======
  getCustomerDashboardStats
>>>>>>> 5cc5766 (Add offer, newsletter and review backend integration)
} from '../controllers/customerAuth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { uploadAvatarMiddleware } from '../middlewares/upload.middleware.js';
import { protectCustomer } from '../middlewares/auth.middleware.js';
import { customerRegisterSchema, customerLoginSchema, customerGoogleAuthSchema } from '../schemas/customer.schema.js';
import { forgotPasswordSchema, resetPasswordSchema, updateProfileSchema, updatePasswordSchema, updateTwoFactorSchema, deleteAccountSchema } from '../schemas/validation.schemas.js';

const router = express.Router();

router.post('/register', validate(customerRegisterSchema), registerCustomer);
router.post('/login', validate(customerLoginSchema), loginCustomer);
router.post('/google', validate(customerGoogleAuthSchema), googleAuth);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.put('/reset-password/:token', validate(resetPasswordSchema), resetPassword);

router.get('/dashboard/stats', protectCustomer, getCustomerDashboardStats);
router.get('/profile', protectCustomer, getProfile);
router.put('/profile', protectCustomer, validate(updateProfileSchema), updateProfile);
router.post('/avatar', protectCustomer, uploadAvatarMiddleware, uploadAvatar);

router.put('/password', protectCustomer, validate(updatePasswordSchema), updatePassword);
router.put('/two-factor', protectCustomer, validate(updateTwoFactorSchema), updateTwoFactor);
router.delete('/account', protectCustomer, validate(deleteAccountSchema), deleteAccount);

router.get('/cart', protectCustomer, getCart);
router.post('/cart', protectCustomer, saveCart);

export default router;