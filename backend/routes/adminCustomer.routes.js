import express from 'express';
import { getCustomers, toggleCustomerStatus } from '../controllers/adminCustomer.controller.js';
import { protectAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protectAdmin);

router.get('/', getCustomers);
router.patch('/:id/status', toggleCustomerStatus);

export default router;
