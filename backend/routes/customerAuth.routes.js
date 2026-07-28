 import express from 'express';
import { 
  registerCustomer, 
  loginCustomer, 
  getProfile, 
  updateProfile 
} from '../controllers/customerAuth.controller.js';

const router = express.Router();

router.post('/register', registerCustomer);
router.post('/login', loginCustomer);

// Profile routes (Add authentication middleware here if you use one, e.g., verifyToken)
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

export default router;