import { useState } from "react";
import "./ProductTabs.css";

const initialReviews = [
  {
    id: "r1",
    rating: 5,
    comment: "Absolutely beautiful craftsmanship. Looks exactly like the photos and feels premium.",
    author: "Priya Sharma",
    date: "2 days ago"
  },
  {
    id: "r2",
    rating: 5,
    comment: "Bought it as a gift. Excellent packaging and fast delivery.",
    author: "Neha Patel",
    date: "1 week ago"
  }
];

const ProductTabs = ({ reviewsList = initialReviews }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [reviews] = useState(reviewsList);

  return (
    <section className="product-tabs">
      <div className="tabs-header">
        <button
          className={activeTab === "description" ? "active" : ""}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>

        <button
          className={activeTab === "reviews" ? "active" : ""}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews ({reviews.length})
        </button>

        <button
          className={activeTab === "shipping" ? "active" : ""}
          onClick={() => setActiveTab("shipping")}
        >
          Shipping & Returns
        </button>
      </div>

      <div className="tabs-content">
        {activeTab === "description" && (
          <div>
            <h3>Product Description</h3>
            <p>
              This handcrafted jewellery piece is made using premium materials
              with exceptional attention to detail. Designed for everyday wear,
              parties, weddings, and festive occasions.
            </p>
            <ul>
              <li>Premium Quality Finish</li>
              <li>Skin Friendly Material</li>
              <li>Lightweight & Comfortable</li>
              <li>Perfect Gift Choice</li>
            </ul>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <h3>Customer Reviews ({reviews.length})</h3>
            {reviews.map((rev) => (
              <div className="review-box" key={rev.id || rev._id}>
                <h4>{"★".repeat(rev.rating || 5)} {rev.rating || 5}/5</h4>
                <p>"{rev.comment}"</p>
                <small>— {rev.author || rev.customerName || "Customer"}</small>
              </div>
            ))}
          </div>
        )}

        {activeTab === "shipping" && (
          <div>

            <h3>Shipping Information</h3>

            <ul>
              <li>Free Shipping on orders above ₹999</li>
              <li>Delivery within 3–7 business days</li>
              <li>Easy 7-Day Return Policy</li>
              <li>100% Secure Payment</li>

            </ul>

          </div>
        )}

      </div>

    </section>
  );
};

export default ProductTabs;