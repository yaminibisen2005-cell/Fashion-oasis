import "./FeaturedProducts.css";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import FeaturedProductCard from "./FeaturedProductCard";

import thumb1 from "../../assets/thumb1.png";
import thumb2 from "../../assets/thumb2.png";
import thumb3 from "../../assets/thumb3.png";
import thumb4 from "../../assets/thumb4.png";

const products = [
  {
    id: 1,
    name: "Pearl Necklace",
    image: thumb1,
    price: 999,
    oldPrice: 1299,
    discount: 23,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Rose Bracelet",
    image: thumb2,
    price: 699,
    oldPrice: 899,
    discount: 22,
    rating: 4.6,
    reviews: 89,
  },
  {
    id: 3,
    name: "Luxury Ring",
    image: thumb3,
    price: 899,
    oldPrice: 1199,
    discount: 25,
    rating: 4.9,
    reviews: 156,
  },
  {
    id: 4,
    name: "Pearl Earrings",
    image: thumb4,
    price: 799,
    oldPrice: 999,
    discount: 20,
    rating: 4.7,
    reviews: 98,
  },
];

const FeaturedProducts = () => {
  const navigate = useNavigate();

  return (
    <section className="featured-section">
      <div className="container">
        <div className="featured-heading">
          <span>FEATURED COLLECTION</span>
          <h2>Featured Products</h2>
          <div className="gold-divider">
            <div className="gold-divider-circles"></div>
          </div>
          <p>
            Timeless handcrafted jewellery curated for every occasion.
          </p>
        </div>

        <div className="products-grid">
          {products.map((item) => (
            <FeaturedProductCard key={item.id} product={item} />
          ))}
        </div>

        <div className="view-all">
          <button onClick={() => navigate("/shop")}>
            View All Products
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;