 import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide your first name'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Please provide your last name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email address'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', ''],
    default: ''
  },
  address: {
    type: String,
    trim: true,
    default: ''
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  avatar: {
    type: String,
    default: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80'
  },
  // ADD THIS FIELD FOR 2FA
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  wishlist: [
    {
      id: { type: String },
      name: { type: String },
      image: { type: String },
      price: { type: mongoose.Schema.Types.Mixed },
      oldPrice: { type: mongoose.Schema.Types.Mixed }
    }
  ],
  cart: [
    {
      product: {
        id: { type: String },
        name: { type: String },
        image: { type: String },
        price: { type: mongoose.Schema.Types.Mixed },
        oldPrice: { type: mongoose.Schema.Types.Mixed }
      },
      quantity: { type: Number, default: 1 }
    }
  ],
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {
  timestamps: true
});

// Hash password before saving to database
customerSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Instance method to compare passwords during login
customerSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;