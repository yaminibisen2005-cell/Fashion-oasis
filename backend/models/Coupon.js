import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    discount: { type: Number, required: true },
    minOrder: { type: Number, default: 0 },
    expiryDate: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Inactive', 'Expired'], default: 'Active' }
  },
  { timestamps: true }
);

export default mongoose.model('Coupon', couponSchema);
