import express from 'express';
import { getWishlist, toggleWishlist } from '../controllers/wishlist.controller.js';

const router = express.Router();

router.get('/:email', getWishlist);
router.post('/toggle', toggleWishlist);

export default router;