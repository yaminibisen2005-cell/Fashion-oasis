import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FaTruck, FaBoxOpen, FaClipboardCheck, FaRegCalendarCheck, FaCheck } from "react-icons/fa";
import "./TrackOrder.css";

const TrackOrder = () => {
  const { currentOrder } = useContext(ShopContext);

  const steps = [
    { title: "Order Placed", date: "15 July 2025", icon: <FaClipboardCheck />, active: true, completed: true },
    { title: "Confirmed", date: "15 July 2025", icon: <FaRegCalendarCheck />, active: true, completed: true },
    { title: "Shipped", date: "16 July 2025", icon: <FaBoxOpen />, active: true, completed: true },
    { title: "Out for Delivery", date: "18 July 2025", icon: <FaTruck />, active: true, completed: false },
    { title: "Delivered", date: "20 July 2025", icon: <FaCheck />, active: false, completed: false },
  ];

  return (
    <>
      <Navbar />
      <div className="tracking-page">
        <div className="container">
          
          <div className="tracking-card">
            
            <div className="tracking-title-section">
              <h1>Track Your Order</h1>
              <div className="tracking-meta">
                <p>Order ID: <span>#{currentOrder.orderId}</span></p>
                <p>Date: <span>{currentOrder.date}</span></p>
              </div>
            </div>

            {/* Horizontal Timeline */}
            <div className="timeline-container">
              <div className="timeline-line">
                <div className="timeline-progress" style={{ width: "75%" }}></div>
              </div>
              
              <div className="timeline-steps">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`timeline-step ${step.completed ? "completed" : ""} ${
                      step.active && !step.completed ? "current" : ""
                    }`}
                  >
                    <div className="step-icon-wrapper">
                      {step.completed ? <FaCheck className="check-small" /> : step.icon}
                    </div>
                    <div className="step-content">
                      <h4>{step.title}</h4>
                      <p>{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Tracking Status */}
            <div className="tracking-details-grid">
              
              {/* Current Status Card */}
              <div className="status-card">
                <h3>Current Status</h3>
                <div className="status-badge-row">
                  <span className="status-badge">Out for Delivery</span>
                  <div className="pulse-dot"></div>
                </div>
                <p className="status-msg">
                  Your order is out for delivery. It will reach you soon.
                </p>
                <div className="expected-box">
                  <span>Expected Delivery</span>
                  <strong>{currentOrder.expectedDelivery}</strong>
                </div>
              </div>

              {/* Shipping Information Card */}
              <div className="shipping-info-card">
                <h3>Shipping Details</h3>
                <div className="info-box">
                  <div className="info-row">
                    <span>Courier Number</span>
                    <strong>{currentOrder.courier}</strong>
                  </div>
                  <div className="info-row">
                    <span>Shipping ID</span>
                    <strong>{currentOrder.shippingId}</strong>
                  </div>
                </div>
                <a
                  href="https://www.delhivery.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="track-external-link"
                >
                  Track on Delhivery
                </a>
              </div>

            </div>

          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default TrackOrder;
