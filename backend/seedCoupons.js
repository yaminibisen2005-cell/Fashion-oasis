import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Coupon from './models/Coupon.js';

dotenv.config({ path: './.env' });

const seedCoupons = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const coupons = [
      { code: "OASIS10", discount: "10% OFF", minOrder: "₹999", expiryDate: "31 May 2024", status: "Active" },
      { code: "OASIS20", discount: "20% OFF", minOrder: "₹1999", expiryDate: "30 Jun 2024", status: "Active" },
      { code: "WELCOME5", discount: "5% OFF", minOrder: "₹499", expiryDate: "31 May 2024", status: "Inactive" },
      { code: "FREESHIP", discount: "Free Shipping", minOrder: "₹1499", expiryDate: "30 Jun 2024", status: "Active" },
    ];

    await Coupon.deleteMany();
    await Coupon.insertMany(coupons);

    console.log('Coupons seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error with data import', error);
    process.exit(1);
  }
};

seedCoupons();
