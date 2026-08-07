import express from 'express';
import * as productController from '../controllers/product.controller.js';
import { protectAdmin } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { productCreateSchema } from '../schemas/product.schema.js';
import { uploadProductImagesMiddleware } from '../middlewares/upload.middleware.js';

const router = express.Router();

router.use(protectAdmin); // Protect all product routes with admin JWT

router.get('/', productController.getProducts);
router.post('/', uploadProductImagesMiddleware, validate(productCreateSchema), productController.addProduct);
router.delete('/:id', productController.deleteProduct);
router.patch('/:id/status', productController.toggleProductStatus);

export default router;
