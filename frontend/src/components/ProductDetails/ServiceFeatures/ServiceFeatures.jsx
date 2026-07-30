import React from "react";
import { FaTruck, FaUndo, FaLock, FaGem } from "react-icons/fa";
import "./ServiceFeatures.css";

const ServiceFeatures = () => {
  return (
    <div className="service-features-section">
      <div className="service-features-container">
        <div className="feature-item">
          <FaTruck />
          <span>Free Shipping</span>
        </div>

        <div className="feature-divider"></div>

        <div className="feature-item">
          <FaUndo />
          <span>7 Days Return</span>
        </div>

        <div className="feature-divider"></div>

        <div className="feature-item">
          <FaLock />
          <span>Secure Payment</span>
        </div>

        <div className="feature-divider"></div>

        <div className="feature-item">
          <FaGem />
          <span>Premium Quality</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceFeatures;
