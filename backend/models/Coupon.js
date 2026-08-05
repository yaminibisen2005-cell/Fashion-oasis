import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    discount: { type: String, required: true, trim: true },
    minOrder: { type: String, default: 'None', trim: true },
    expiryDate: { type: String, default: 'None', trim: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
  },
  { timestamps: true }
);

export default mongoose.model('Coupon', couponSchema);
