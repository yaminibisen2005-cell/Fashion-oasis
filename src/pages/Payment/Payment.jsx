import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FaCheckCircle, FaTimesCircle, FaExchangeAlt } from "react-icons/fa";
import "./Payment.css";

const Payment = () => {
  const { currentOrder } = useContext(ShopContext);
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(true); // Toggle to simulate both pages in the screenshot
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/thank-you");
    }, 800);
  };

  const handleTryAgain = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/checkout");
    }, 800);
  };

  return (
    <>
      <Navbar />
      <div className="payment-page">
        <div className="container">
          
          {/* Simulation Toggle Banner */}
          <div className="simulation-banner">
            <div className="banner-content">
              <FaExchangeAlt />
              <span><strong>Demo Sandbox Simulator:</strong> You can toggle between both Payment screens requested in the design specifications.</span>
            </div>
            <div className="simulation-buttons">
              <button
                className={`toggle-btn success-toggle ${isSuccess ? "active" : ""}`}
                onClick={() => setIsSuccess(true)}
              >
                Show Payment Success
              </button>
              <button
                className={`toggle-btn fail-toggle ${!isSuccess ? "active" : ""}`}
                onClick={() => setIsSuccess(false)}
              >
                Show Payment Failed
              </button>
            </div>
          </div>

          <div className="payment-card-wrapper fade-in">
            {isSuccess ? (
              /* PAYMENT SUCCESS STATE */
              <div className="payment-success-card">
                <div className="success-icon-wrapper">
                  <FaCheckCircle />
                </div>
                
                <h1>Payment Success!</h1>
                <p className="payment-desc">Your payment has been processed successfully.</p>
                
                <div className="payment-details-box">
                  <div className="detail-row">
                    <span>Order ID</span>
                    <strong>#{currentOrder.orderId}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Amount Paid</span>
                    <strong className="success-amount">₹{currentOrder.total.toLocaleString()}</strong>
                  </div>
                </div>

                <div className="payment-actions">
                  <button
                    className={`payment-btn-primary success-btn ${loading ? "loading" : ""}`}
                    onClick={handleContinue}
                    disabled={loading}
                  >
                    {loading ? <span className="spinner"></span> : "CONTINUE"}
                  </button>
                  
                  <button
                    className="payment-btn-secondary"
                    onClick={() => navigate("/collections")}
                    disabled={loading}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : (
              /* PAYMENT FAILED STATE */
              <div className="payment-failed-card">
                <div className="failed-icon-wrapper">
                  <FaTimesCircle />
                </div>
                
                <h1>Payment Failed!</h1>
                <p className="payment-desc">Something went wrong. Please try again.</p>
                
                <div className="payment-details-box">
                  <div className="detail-row">
                    <span>Amount</span>
                    <strong className="failed-amount">₹{currentOrder.total.toLocaleString()}</strong>
                  </div>
                </div>

                <div className="payment-actions">
                  <button
                    className={`payment-btn-primary fail-btn ${loading ? "loading" : ""}`}
                    onClick={handleTryAgain}
                    disabled={loading}
                  >
                    {loading ? <span className="spinner"></span> : "TRY AGAIN"}
                  </button>
                  
                  <button
                    className="payment-btn-secondary"
                    onClick={() => navigate("/cart")}
                    disabled={loading}
                  >
                    Return to Cart
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
