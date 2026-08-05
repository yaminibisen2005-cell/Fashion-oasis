import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const existing = await User.findOne({ email: 'seller@gmail.com' });
if (existing) {
  console.log('Seller already exists:', existing.email, '| role:', existing.role);
  process.exit(0);
}

const seller = await User.create({
  name: 'Bimal Seller',
  email: 'seller@gmail.com',
  password: 'Bimal@gmail.com',
  role: 'seller',
  status: 'Active',
});

console.log('Seller created:', seller.email, '| id:', seller._id);
process.exit(0);
