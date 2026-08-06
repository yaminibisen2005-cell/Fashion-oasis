import express from 'express';
import { getWishlist, toggleWishlist } from '../controllers/wishlist.controller.js';

import { protectCustomer } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { wishlistToggleSchema } from '../schemas/validation.schemas.js';

const router = express.Router();

router.get('/', protectCustomer, getWishlist);
router.post('/toggle', protectCustomer, validate(wishlistToggleSchema), toggleWishlist);

export default router;