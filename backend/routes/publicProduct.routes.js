import express from 'express';
import * as productController from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', productController.getPublicProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/recommended', productController.getRecommendedProducts);
router.get('/:id', productController.getProductById);

export default router;
