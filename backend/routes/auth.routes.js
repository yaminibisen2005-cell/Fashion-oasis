import express from 'express';
import { registerAdmin, loginAdmin, getAdminProfile } from '../controllers/auth.controller.js';
import { protectAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/admin/register', registerAdmin);
router.post('/admin/login', loginAdmin);
router.get('/admin/me', protectAdmin, getAdminProfile);

export default router;
