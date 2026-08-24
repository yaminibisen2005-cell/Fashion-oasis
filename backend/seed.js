import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const productsToSeed = [
  {
    name: "Rose Gold Necklace",
    category: "Necklace",
    material: "Rose Gold",
    occasion: "Party Wear",
    image: "/assets/viewproducts/product1.1.jpeg",
    gallery: [
      "/assets/viewproducts/product1.1.jpeg",
      "/assets/viewproducts/product1.2.jpeg",
      "/assets/viewproducts/product1.3.jpeg",
      "/assets/viewproducts/product1.4.jpeg",
      "/assets/viewproducts/product1.5.jpeg"
    ],
    price: 1299,
    oldPrice: 1899,
    discount: 32,
    rating: 4.8,
    reviews: 124,
    stock: 50,
    status: 'Active',
    isFeatured: true,
  },
  {
    name: "Pearl Earrings",
    category: "Earrings",
    material: "Pearl",
    occasion: "Daily Wear",
    image: "/assets/shop/product8.jpg",
    gallery: [
      "/assets/viewproducts/product2.1.jpeg",
      "/assets/viewproducts/product2.2.jpeg",
      "/assets/viewproducts/product2.3.jpeg",
      "/assets/viewproducts/product2.4.jpeg",
      "/assets/viewproducts/product2.5.jpeg"
    ],
    price: 899,
    oldPrice: 1299,
    discount: 30,
    rating: 4.7,
    reviews: 89,
    stock: 30,
    status: 'Active',
    isFeatured: true,
  },
  {
    name: "Diamond Ring",
    category: "Rings",
    material: "Diamond",
    occasion: "Wedding",
    image: "/assets/shop/product1.jpg",
    gallery: [
      "/assets/viewproducts/product3.1.jpeg",
      "/assets/viewproducts/product3.2.jpeg",
      "/assets/viewproducts/product3.3.jpeg",
      "/assets/viewproducts/product3.4.jpeg",
      "/assets/viewproducts/product3.5.jpeg"
    ],
    price: 2499,
    oldPrice: 3299,
    discount: 24,
    rating: 4.9,
    reviews: 156,
    stock: 20,
    status: 'Active',
    isFeatured: true,
  },
  {
    name: "Silver Bracelet",
    category: "Bracelets",
    material: "Silver",
    occasion: "Daily Wear",
    image: "/assets/shop/product4.jpeg",
    gallery: [
      "/assets/viewproducts/product4.1.jpeg",
      "/assets/viewproducts/product4.2.jpeg",
      "/assets/viewproducts/product4.3.jpeg",
      "/assets/viewproducts/product4.4.jpeg",
      "/assets/viewproducts/product4.5.jpeg"
    ],
    price: 1199,
    oldPrice: 1599,
    discount: 25,
    rating: 4.6,
    reviews: 72,
    stock: 40,
    status: 'Active',
    isFeatured: true,
  },
  {
    name: "Kundan Necklace",
    category: "Necklace",
    material: "Kundan",
    occasion: "Wedding",
    image: "/assets/shop/product3.jpg",
    gallery: [
      "/assets/viewproducts/product5.1.jpeg",
      "/assets/viewproducts/product5.2.jpeg",
      "/assets/viewproducts/product5.3.jpeg",
      "/assets/viewproducts/product5.4.jpeg",
      "/assets/viewproducts/product5.5.jpeg"
    ],
    price: 2999,
    oldPrice: 3899,
    discount: 23,
    rating: 4.9,
    reviews: 94,
    stock: 15,
    status: 'Active'
  },
  {
    name: "Emerald Ring",
    category: "Rings",
    material: "Gold Plated",
    occasion: "Party Wear",
    image: "/assets/shop/product11.jpg",
    gallery: [
      "/assets/viewproducts/product6.1.jpeg",
      "/assets/viewproducts/product6.2.jpeg",
      "/assets/viewproducts/product6.3.jpeg",
      "/assets/viewproducts/product6.4.jpeg",
      "/assets/viewproducts/product6.5.jpeg"
    ],
    price: 3199,
    oldPrice: 3999,
    discount: 20,
    rating: 4.8,
    reviews: 110,
    stock: 25,
    status: 'Active'
  },
  {
    name: "Hoop Earrings",
    category: "Earrings",
    material: "Gold Plated",
    occasion: "Daily Wear",
    image: "/assets/shop/product9.jpg",
    gallery: [
      "/assets/viewproducts/product7.1.jpeg",
      "/assets/viewproducts/product7.2.jpeg",
      "/assets/viewproducts/product7.3.jpeg",
      "/assets/viewproducts/product7.4.jpeg",
      "/assets/viewproducts/product7.5.jpeg"
    ],
    price: 799,
    oldPrice: 1099,
    discount: 27,
    rating: 4.5,
    reviews: 61,
    stock: 45,
    status: 'Active'
  },
  {
    name: "Charm Bracelet",
    category: "Bracelets",
    material: "Silver",
    occasion: "Gift",
    image: "/assets/shop/product10.jpg",
    gallery: [
      "/assets/viewproducts/product8.1.jpeg",
      "/assets/viewproducts/product8.2.jpeg",
      "/assets/viewproducts/product8.3.jpeg",
      "/assets/viewproducts/product8.4.jpeg",
      "/assets/viewproducts/product8.5.jpeg"
    ],
    price: 1499,
    oldPrice: 1999,
    discount: 25,
    rating: 4.7,
    reviews: 83,
    stock: 35,
    status: 'Active'
  },
  {
    name: "Bridal Necklace",
    category: "Wedding",
    material: "Gold Plated",
    occasion: "Wedding",
    image: "/assets/shop/product2.jpg",
    gallery: [
      "/assets/viewproducts/product9.1.jpeg",
      "/assets/viewproducts/product9.2.jpeg",
      "/assets/viewproducts/product9.3.jpeg",
      "/assets/viewproducts/product9.4.jpeg",
      "/assets/viewproducts/product9.5.jpeg"
    ],
    price: 4999,
    oldPrice: 5999,
    discount: 17,
    rating: 5.0,
    reviews: 203,
    stock: 10,
    status: 'Active'
  },
  {
    name: "Pendant Set",
    category: "Necklace",
    material: "Gold Plated",
    occasion: "Daily Wear",
    image: "/assets/shop/product6.jpg",
    gallery: [
      "/assets/viewproducts/product10.1.jpeg",
      "/assets/viewproducts/product10.2.jpeg",
      "/assets/viewproducts/product10.3.jpeg",
      "/assets/viewproducts/product10.4.jpeg",
      "/assets/viewproducts/product10.5.jpeg"
    ],
    price: 1899,
    oldPrice: 2499,
    discount: 24,
    rating: 4.8,
    reviews: 97,
    stock: 30,
    status: 'Active'
  },
  {
    name: "Stud Earrings",
    category: "Earrings",
    material: "Gold Plated",
    occasion: "Daily Wear",
    image: "/assets/shop/product12.jpeg",
    gallery: [
      "/assets/viewproducts/product11.1.jpeg",
      "/assets/viewproducts/product11.2.jpeg",
      "/assets/viewproducts/product11.3.jpeg",
      "/assets/viewproducts/product11.4.jpeg",
      "/assets/viewproducts/product11.5.jpeg"
    ],
    price: 699,
    oldPrice: 999,
    discount: 30,
    rating: 4.6,
    reviews: 58,
    stock: 60,
    status: 'Active'
  },
  {
    name: "Gold Mangalsutra",
    category: "Mangalsutra",
    material: "Gold Plated",
    occasion: "Wedding",
    image: "/assets/shop/product5.jpg",
    gallery: [
      "/assets/viewproducts/product12.1.jpeg",
      "/assets/viewproducts/product12.2.jpeg",
      "/assets/viewproducts/product12.3.jpeg",
      "/assets/viewproducts/product12.4.jpeg",
      "/assets/viewproducts/product12.5.jpeg"
    ],
    price: 3599,
    oldPrice: 4499,
    discount: 20,
    rating: 4.9,
    reviews: 145,
    stock: 20,
    status: 'Active'
  }
];

mongoose.connect(process.env.MONGO_URI, {
}).then(async () => {
  console.log("Connected to MongoDB. Clearing and re-seeding data...");
  await Product.deleteMany({}); // Delete all existing products to avoid duplicates
  await Product.insertMany(productsToSeed);
  console.log("Data seeded successfully with local image paths!");
  process.exit();
}).catch(err => {
  console.error(err);
  process.exit(1);
});
