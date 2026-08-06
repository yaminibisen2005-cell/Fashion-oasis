import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Review from './models/Review.js';

dotenv.config({ path: './.env' });

const seedReviews = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const reviews = [
      { customer: "Priya Sharma", product: "Floral Diamond Necklace", rating: 5, review: "Beautiful design!", status: "Approved" },
      { customer: "Ananya Verma", product: "Gold Plated Earrings", rating: 5, review: "Very elegant!", status: "Approved" },
      { customer: "Neha Kapoor", product: "Pearl Drop Earrings", rating: 4, review: "Loved it!", status: "Approved" },
      { customer: "Ritika Singh", product: "Classic Gold Ring", rating: 5, review: "Perfect fit", status: "Approved" },
    ];

    await Review.deleteMany();
    await Review.insertMany(reviews);

    console.log('Reviews seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error with data import', error);
    process.exit(1);
  }
};

seedReviews();
