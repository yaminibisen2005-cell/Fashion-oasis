import express from 'express';
import * as productController from '../controllers/product.controller.js';
import { protectSeller } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protectSeller);

router.get('/', productController.getProducts);
router.post('/', productController.addProduct);
router.delete('/:id', productController.deleteProduct);
router.patch('/:id/status', productController.toggleProductStatus);
router.patch('/:id/stock', productController.updateProductStock);

export default router;
