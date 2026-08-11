import express from 'express';
import { registerAdmin, loginAdmin, getAdminProfile, loginSeller, getSellerProfile, updateSellerProfile, registerSeller } from '../controllers/auth.controller.js';
import { protectAdmin, protectSeller } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { adminRegisterSchema, adminLoginSchema, sellerProfileUpdateSchema } from '../schemas/auth.schema.js';
import { uploadAvatarMiddleware } from '../middlewares/upload.middleware.js';

const router = express.Router();

router.post('/admin/register', validate(adminRegisterSchema), registerAdmin);
router.post('/admin/login', validate(adminLoginSchema), loginAdmin);
router.get('/admin/me', protectAdmin, getAdminProfile);

router.post('/seller/register', registerSeller);
router.post('/seller/login', validate(adminLoginSchema), loginSeller);
router.get('/seller/me', protectSeller, getSellerProfile);
router.put('/seller/me', protectSeller, uploadAvatarMiddleware, validate(sellerProfileUpdateSchema), updateSellerProfile);

export default router;
