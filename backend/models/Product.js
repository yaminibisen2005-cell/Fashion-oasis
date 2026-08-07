import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    image: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    totalSold: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },
    material: { type: String, trim: true },
    occasion: { type: String, trim: true },
    oldPrice: { type: Number },
    discount: { type: Number },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
