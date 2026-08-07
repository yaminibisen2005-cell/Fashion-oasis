import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const seller = await User.findOne({ email: 'seller@gmail.com' });
    if (!seller) {
      console.log('Seller not found');
      process.exit(0);
    }
    seller.status = 'Inactive';
    seller.pendingVerification = true;
    await seller.save();
    console.log('Seller updated for pending verification');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
