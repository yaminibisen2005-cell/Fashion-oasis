import express from 'express';
import { registerAdmin, loginAdmin, getAdminProfile } from '../controllers/auth.controller.js';
import { protectAdmin } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { adminRegisterSchema, adminLoginSchema } from '../schemas/auth.schema.js';

const router = express.Router();

router.post('/admin/register', validate(adminRegisterSchema), registerAdmin);
router.post('/admin/login', validate(adminLoginSchema), loginAdmin);
router.get('/admin/me', protectAdmin, getAdminProfile);

export default router;
