import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import "./Reviews.css";

import product1 from "../../assets/product1.jpg";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { getCustomerReviews } from "../../api/customer";

function Reviews() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getCustomerReviews();
        if (response.success) {
          setReviews(response.data);
        }
      } catch (err) {
        console.error("Failed to load reviews", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <DashboardLayout>
      <div className="reviews-page">

        <div className="reviews-header">
          <h2>My Reviews</h2>
          <p>Your recent product reviews.</p>
        </div>

        {loading ? (
          <p style={{ textAlign: "center", padding: "40px" }}>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p style={{ textAlign: "center", padding: "40px" }}>You haven't written any reviews yet.</p>
        ) : (
          reviews.map((item) => (
            <div className="review-card" key={item._id || item.id}>
              <img src={item.image || product1} alt={item.product} />
              <div className="review-content">
                <h3>{item.product}</h3>
                <div className="stars">
                  {[...Array(item.rating || 5)].map((_, index) => (
                    <FaStar key={index} />
                  ))}
                </div>
                <p>{item.review}</p>
                <button
                  className="view-product-btn"
                  onClick={() => navigate(item.productId ? `/product/${item.productId}` : "#")}
                >
                  View Product
                </button>
              </div>
            </div>
          ))
        )}

      </div>
    </DashboardLayout>
  );
}

export default Reviews;