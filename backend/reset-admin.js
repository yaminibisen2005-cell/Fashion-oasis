import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const restoreAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    const adminEmail = 'admin@gmail.com';
    const originalHashedPassword = '$2b$12$vYvxk.W4gkmSAXY/YTSZbubIPzXJLJTrW5YiTGA34xh0oRfqi9BfO'; // From your screenshot

    const updatedUser = await User.findOneAndUpdate(
      { email: adminEmail },
      { password: originalHashedPassword },
      { new: true }
    );

    if (updatedUser) {
      console.log(`Original password hash successfully restored for ${adminEmail}.`);
    } else {
      console.log(`User ${adminEmail} not found!`);
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

restoreAdmin();
