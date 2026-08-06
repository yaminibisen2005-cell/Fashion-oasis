import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['customer', 'seller', 'admin', 'super-admin'], default: 'customer' },
    avatar: { type: String, default: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80' },
    storeName: { type: String, trim: true },
    phone: { type: String, trim: true },
    storeEmail: { type: String, lowercase: true, trim: true },
    storeLogo: { type: String, trim: true, maxlength: 3 },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});


userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
