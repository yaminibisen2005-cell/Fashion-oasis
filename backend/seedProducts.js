 import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import productsData from './path/to/your/products.json'; // Point to your JSON file

dotenv.config({ path: './.env' });

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany();
    await Product.insertMany(productsData);

    console.log('All products seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();