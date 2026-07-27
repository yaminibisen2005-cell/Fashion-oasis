import { useState } from "react";
import "./ProductTabs.css";

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState("description");

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
          Reviews (124)
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

            <h3>Customer Reviews</h3>

            <div className="review-box">

              <h4>★★★★★ 4.8/5</h4>

              <p>
                "Absolutely beautiful craftsmanship. Looks exactly like the
                photos and feels premium."
              </p>

              <small>— Priya Sharma</small>

            </div>

            <div className="review-box">

              <h4>★★★★★ 5/5</h4>

              <p>
                "Bought it as a gift. Excellent packaging and fast delivery."
              </p>

              <small>— Neha Patel</small>

            </div>

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