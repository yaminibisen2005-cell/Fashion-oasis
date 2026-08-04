import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    image: { type: String, required: true },
    totalSold: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
