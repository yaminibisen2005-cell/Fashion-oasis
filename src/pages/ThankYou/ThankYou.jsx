import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FaCheckCircle, FaWhatsapp, FaArrowRight, FaClock } from "react-icons/fa";
import "./ThankYou.css";

const ThankYou = () => {
  const { currentOrder, shippingAddress } = useContext(ShopContext);
  const navigate = useNavigate();
  
  const [showDetails, setShowDetails] = useState(false);
  const [whatsappSent, setWhatsappSent] = useState(false);
  const [loadingWhatsApp, setLoadingWhatsApp] = useState(false);

  const firstName = shippingAddress.fullName.split(" ")[0] || "Neha";

  const handleWhatsAppSend = () => {
    setLoadingWhatsApp(true);
    setTimeout(() => {
      setLoadingWhatsApp(false);
      setWhatsappSent(true);
      
      // Simulate sending WhatsApp alert
      const message = `Hello ${firstName}! Your Fashion Oasis order #${currentOrder.orderId} of ₹${currentOrder.total} has been confirmed. Track your delivery at: http://localhost:5173/track-order`;
      const encodedMsg = encodeURIComponent(message);
      window.open(`https://api.whatsapp.com/send?text=${encodedMsg}`, "_blank");
    }, 800);
  };

  return (
    <>
      <Navbar />
      <div className="thank-you-page">
        <div className="container">
          
          <div className="thank-you-card">
            <div className="success-badge-icon">
              <FaCheckCircle />
            </div>

            <h1>Thank You, {firstName}!</h1>
            <p className="success-sub">Your order has been placed successfully.</p>

            {/* Receipt Summary Box */}
            <div className="receipt-box">
              <div className="receipt-column">
                <span>Order ID</span>
                <strong>#{currentOrder.orderId}</strong>
              </div>
              <div className="receipt-column border-left">
                <span>Date</span>
                <strong>{currentOrder.date}</strong>
              </div>
              <div className="receipt-column border-left">
                <span>Amount Paid</span>
                <strong>₹{currentOrder.total.toLocaleString()}</strong>
              </div>
            </div>

            {/* What's Next Checklist */}
            <div className="whats-next-section">
              <h3>What's Next?</h3>
              <ul className="next-checklist">
                <li>
                  <span className="bullet-check">✓</span>
                  <p>We will send your order confirmation with your order details.</p>
                </li>
                <li>
                  <span className="bullet-check">✓</span>
                  <p>You will receive updates messages with your order status.</p>
                </li>
                <li>
                  <span className="bullet-check">✓</span>
                  <p>We will dispatch your order shortly from our luxury warehouse.</p>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="thank-you-actions">
              <button
                className={`ty-btn-secondary ${showDetails ? "active" : ""}`}
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? "HIDE ORDER DETAILS" : "VIEW ORDER DETAILS"}
              </button>
              
              <button
                className="ty-btn-primary"
                onClick={() => navigate("/track-order")}
              >
                TRACK YOUR ORDER <FaArrowRight />
              </button>

              <button
                className={`ty-btn-whatsapp ${whatsappSent ? "sent" : ""} ${
                  loadingWhatsApp ? "loading" : ""
                }`}
                onClick={handleWhatsAppSend}
                disabled={loadingWhatsApp}
              >
                {loadingWhatsApp ? (
                  <span className="spinner"></span>
                ) : whatsappSent ? (
                  "SENT ON WHATSAPP!"
                ) : (
                  <>
                    <FaWhatsapp /> SEND ON WHATSAPP
                  </>
                )}
              </button>
            </div>

            {/* Expandable Order Details Card */}
            {showDetails && (
              <div className="order-details-drawer fade-in">
                <h3>Order Breakdown</h3>
                <div className="drawer-divider"></div>
                <div className="drawer-items">
                  {currentOrder.items.map((item, idx) => (
                    <div className="drawer-item-row" key={idx}>
                      <img src={item.product.image} alt={item.product.name} />
                      <div className="drawer-item-meta">
                        <h4>{item.product.name}</h4>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                      <div className="drawer-item-price">
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="drawer-divider"></div>
                <div className="drawer-totals">
                  <div className="d-row">
                    <span>Subtotal</span>
                    <span>₹{currentOrder.subtotal.toLocaleString()}</span>
                  </div>
                  {currentOrder.discount > 0 && (
                    <div className="d-row discount">
                      <span>Discount (10%)</span>
                      <span>- ₹{currentOrder.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="d-row">
                    <span>Shipping</span>
                    <span className="free-shipping">FREE</span>
                  </div>
                  <div className="drawer-divider"></div>
                  <div className="d-row total">
                    <span>Total Amount</span>
                    <span>₹{currentOrder.total.toLocaleString()}</span>
                  </div>
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

export default ThankYou;
