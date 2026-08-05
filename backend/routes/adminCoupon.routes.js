import express from 'express';
import { getCoupons, createCoupon, deleteCoupon, toggleCouponStatus } from '../controllers/adminCoupon.controller.js';
import { protectAdmin } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { adminCouponCreateSchema } from '../schemas/validation.schemas.js';
import { validateObjectId } from '../middlewares/validateObjectId.middleware.js';

const router = express.Router();

router.use(protectAdmin);

router.route('/')
  .get(getCoupons)
  .post(validate(adminCouponCreateSchema), createCoupon);

router.route('/:id')
  .patch(validateObjectId, toggleCouponStatus)
  .delete(validateObjectId, deleteCoupon);

export default router;
