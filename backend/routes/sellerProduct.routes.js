import express from 'express';
import * as productController from '../controllers/product.controller.js';
import { protectAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protectAdmin);

router.get('/', productController.getProducts);
router.post('/', productController.addProduct);
router.delete('/:id', productController.deleteProduct);
router.patch('/:id/status', productController.toggleProductStatus);

export default router;
