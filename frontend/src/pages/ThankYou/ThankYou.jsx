import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FaCheckCircle, FaArrowRight, FaDownload } from "react-icons/fa";
import { notifyError } from "../../utils/alerts";
import "./ThankYou.css";

const ThankYou = () => {
  const { currentOrder, shippingAddress } = useContext(ShopContext);
  const navigate = useNavigate();
  
  const [showDetails, setShowDetails] = useState(false);
  const [loadingBill, setLoadingBill] = useState(false);

  const firstName = shippingAddress.fullName.split(" ")[0] || "Customer";

  // Automated PDF bill download using html2pdf.js dynamically loaded from CDN
  const handleDownloadBill = () => {
    setLoadingBill(true);
    const element = document.getElementById("printable-invoice-card");
    const opt = {
      margin: 10,
      filename: `invoice_${currentOrder.orderId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        scrollY: 0,
        scrollX: 0,
        width: 790
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    const triggerDownload = () => {
      window.html2pdf().from(element).set(opt).save().then(() => {
        setLoadingBill(false);
      }).catch(err => {
        console.error(err);
        setLoadingBill(false);
      });
    };

    if (window.html2pdf) {
      triggerDownload();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.onload = () => {
        triggerDownload();
      };
      script.onerror = () => {
        notifyError("Failed to load PDF engine. Please try again.");
        setLoadingBill(false);
      };
      document.body.appendChild(script);
    }
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
                className={`ty-btn-secondary bill-dl-btn ${loadingBill ? "loading" : ""}`}
                onClick={handleDownloadBill}
                disabled={loadingBill}
              >
                {loadingBill ? (
                  <>
                    <span className="spinner"></span> GENERATING...
                  </>
                ) : (
                  <>
                    <FaDownload /> DOWNLOAD BILL
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

      <div className="invoice-print-wrapper">
        <div id="printable-invoice-card" style={{
          fontFamily: "'Poppins', sans-serif",
          padding: "40px",
          margin: "0",
          color: "#34211D",
          backgroundColor: "#ffffff",
          width: "790px",
          lineHeight: "1.6"
        }}>
          {/* Invoice Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", borderBottom: "2px solid #F7E3E7", paddingBottom: "20px" }}>
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#EF6F8F", fontSize: "32px", margin: "0 0 5px 0" }}>FASHION OASIS</h1>
              <p style={{ fontSize: "12px", color: "#8E7A6B", margin: "0", letterSpacing: "2px", textTransform: "uppercase" }}>Timeless Elegance</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "#34211D", margin: "0 0 5px 0" }}>TAX INVOICE</h2>
              <p style={{ fontSize: "13px", color: "#8E7A6B", margin: "0" }}>Invoice No: <strong>#INV-2025-{currentOrder.orderId}</strong></p>
              <p style={{ fontSize: "13px", color: "#8E7A6B", margin: "0" }}>Date: {currentOrder.date}</p>
            </div>
          </div>

          {/* Company & Customer Details Row */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
            <div style={{ width: "48%" }}>
              <h3 style={{ fontSize: "14px", textTransform: "uppercase", color: "#D4AF37", borderBottom: "1px solid #F7E3E7", paddingBottom: "5px", marginBottom: "10px" }}>Sold By</h3>
              <p style={{ fontSize: "12px", margin: "0 0 4px 0" }}><strong>Fashion Oasis Ltd.</strong></p>
              <p style={{ fontSize: "12px", margin: "0 0 4px 0", color: "#555" }}>Newton Garden Apartment, Jagdeo Path</p>
              <p style={{ fontSize: "12px", margin: "0 0 4px 0", color: "#555" }}>Patna, Bihar – 800014, India</p>
              <p style={{ fontSize: "12px", margin: "0 0 4px 0", color: "#555" }}>Email: support@fashionoasis.com</p>
              <p style={{ fontSize: "12px", margin: "0 0 4px 0", color: "#555" }}>GSTIN: 10AABCF1234M1Z5</p>
            </div>
          <div style={{ width: "48%" }}>
            <h3 style={{ fontSize: "14px", textTransform: "uppercase", color: "#D4AF37", borderBottom: "1px solid #F7E3E7", paddingBottom: "5px", marginBottom: "10px" }}>Billing & Shipping Address</h3>
            <p style={{ fontSize: "12px", margin: "0 0 4px 0" }}><strong>{shippingAddress.fullName}</strong></p>
            <p style={{ fontSize: "12px", margin: "0 0 4px 0", color: "#555" }}>{shippingAddress.address}</p>
            {shippingAddress.address2 && <p style={{ fontSize: "12px", margin: "0 0 4px 0", color: "#555" }}>{shippingAddress.address2}</p>}
            <p style={{ fontSize: "12px", margin: "0 0 4px 0", color: "#555" }}>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}</p>
            <p style={{ fontSize: "12px", margin: "0 0 4px 0", color: "#555" }}>Phone: {shippingAddress.phone}</p>
          </div>
        </div>

        {/* Order Details Banner */}
        <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#FFF8FA", borderRadius: "8px", padding: "12px 18px", marginBottom: "30px", border: "1px solid #F7E3E7" }}>
          <div style={{ fontSize: "13px" }}>Order ID: <strong>#{currentOrder.orderId}</strong></div>
          <div style={{ fontSize: "13px" }}>Payment Mode: <strong>{currentOrder.paymentMethod || "UPI / ONLINE"}</strong></div>
          <div style={{ fontSize: "13px" }}>Payment Status: <strong style={{ color: "#2BA84A" }}>{currentOrder.paymentStatus || "PAID"}</strong></div>
        </div>

        {/* Items Table */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "30px" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #F7E3E7", textAlign: "left" }}>
              <th style={{ padding: "10px", fontSize: "13px", textTransform: "uppercase", color: "#8E7A6B" }}>Product Image</th>
              <th style={{ padding: "10px", fontSize: "13px", textTransform: "uppercase", color: "#8E7A6B" }}>Item Description</th>
              <th style={{ padding: "10px", fontSize: "13px", textTransform: "uppercase", color: "#8E7A6B", textAlign: "right" }}>Price</th>
              <th style={{ padding: "10px", fontSize: "13px", textTransform: "uppercase", color: "#8E7A6B", textAlign: "center" }}>Qty</th>
              <th style={{ padding: "10px", fontSize: "13px", textTransform: "uppercase", color: "#8E7A6B", textAlign: "right" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {currentOrder.items.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #F7E3E7" }}>
                <td style={{ padding: "10px" }}>
                  <img src={item.product.image} alt={item.product.name} style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px" }} />
                </td>
                <td style={{ padding: "10px", fontSize: "13px" }}>
                  <strong>{item.product.name}</strong>
                  <p style={{ margin: "3px 0 0 0", fontSize: "11px", color: "#8E7A6B" }}>SKU: FO-JW-{item.product.id || '10' + idx}</p>
                </td>
                <td style={{ padding: "10px", fontSize: "13px", textAlign: "right" }}>₹{item.product.price.toLocaleString()}</td>
                <td style={{ padding: "10px", fontSize: "13px", textAlign: "center" }}>{item.quantity}</td>
                <td style={{ padding: "10px", fontSize: "13px", textAlign: "right" }}>₹{(item.product.price * item.quantity).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals Section */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "40px" }}>
          <div style={{ width: "280px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }}>
              <span style={{ color: "#8E7A6B" }}>Subtotal:</span>
              <strong>₹{currentOrder.subtotal.toLocaleString()}</strong>
            </div>
            {currentOrder.discount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px", color: "#D94C7A" }}>
                <span>Discount (10%):</span>
                <strong>- ₹{currentOrder.discount.toLocaleString()}</strong>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }}>
              <span style={{ color: "#8E7A6B" }}>Shipping & Handling:</span>
              <strong style={{ color: "#2BA84A" }}>FREE</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid #F7E3E7", paddingTop: "8px", marginTop: "8px", fontSize: "15px" }}>
              <span style={{ color: "#34211D", fontWeight: "bold" }}>Grand Total:</span>
              <strong style={{ color: "#EF6F8F", fontSize: "18px" }}>₹{currentOrder.total.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        {/* Footer Notes */}
        <div style={{ borderTop: "1px solid #F7E3E7", paddingTop: "20px", textAlign: "center" }}>
          <p style={{ fontSize: "12px", color: "#8E7A6B", margin: "0 0 5px 0" }}>This is a computer generated invoice and does not require a physical signature.</p>
          <p style={{ fontSize: "13px", fontWeight: "bold", color: "#EF6F8F", margin: "0" }}>Thank you for shopping with Fashion Oasis!</p>
        </div>
      </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ThankYou;
