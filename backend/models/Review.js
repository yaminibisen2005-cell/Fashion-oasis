import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    customer: { type: String, required: true },
    product: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    status: { type: String, enum: ['Approved', 'Pending', 'Rejected'], default: 'Pending' }
  },
  { timestamps: true }
);

export default mongoose.model('Review', reviewSchema);
