import express from 'express';
import { submitInquiry } from '../controllers/inquiry.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createInquirySchema } from '../schemas/inquiry.schema.js';

const router = express.Router();

router.post('/', validate(createInquirySchema), submitInquiry);

export default router;
