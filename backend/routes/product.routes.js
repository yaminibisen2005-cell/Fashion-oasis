import express from 'express';
import * as productController from '../controllers/product.controller.js';
import { protectAdmin } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { productCreateSchema, productUpdateSchema } from '../schemas/product.schema.js';
import { uploadProductImagesMiddleware } from '../middlewares/upload.middleware.js';

const router = express.Router();

router.get('/', productController.getProducts);
router.post('/', protectAdmin, uploadProductImagesMiddleware, validate(productCreateSchema), productController.addProduct);
router.put('/:id', protectAdmin, validate(productUpdateSchema), productController.updateProduct);
router.delete('/:id', protectAdmin, productController.deleteProduct);
router.patch('/:id/status', protectAdmin, productController.toggleProductStatus);

export default router;
