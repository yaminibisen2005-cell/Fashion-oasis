import "./FeaturedProducts.css";
import { useState, useEffect, useContext } from "react";
import apiClient from "../../api/client";
import { ShopContext } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import FeaturedProductCard from "./FeaturedProductCard";

import thumb1 from "../../assets/thumb1.png";
import thumb2 from "../../assets/thumb2.png";
import thumb3 from "../../assets/thumb3.png";
import thumb4 from "../../assets/thumb4.png";

// Removed hardcoded products

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get("/products/featured?limit=4");
        if (res.data.success) {
          setFeaturedProducts(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

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
          {loading ? (
            <div>Loading featured products...</div>
          ) : (
            featuredProducts.map((item) => (
              <FeaturedProductCard key={item._id || item.id} product={item} />
            ))
          )}
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