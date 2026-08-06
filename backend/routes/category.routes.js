import express from 'express';
import {
  getCategories,
  addCategory,
  deleteCategory,
  toggleCategoryStatus
} from '../controllers/category.controller.js';
import { protectAdmin } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { categoryCreateSchema } from '../schemas/category.schema.js';

const router = express.Router();

router.use(protectAdmin);

router.get('/', getCategories);
router.post('/', validate(categoryCreateSchema), addCategory);
router.delete('/:id', deleteCategory);
router.patch('/:id/status', toggleCategoryStatus);

export default router;
