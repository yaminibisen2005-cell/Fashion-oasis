import express from 'express';
import { getCoupons, createCoupon, deleteCoupon, toggleCouponStatus } from '../controllers/adminCoupon.controller.js';
import { protectAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protectAdmin);

router.route('/')
  .get(getCoupons)
  .post(createCoupon);

router.route('/:id')
  .patch(toggleCouponStatus)
  .delete(deleteCoupon);

export default router;
