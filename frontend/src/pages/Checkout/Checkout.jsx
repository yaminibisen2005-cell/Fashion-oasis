import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import apiClient from "../../api/client";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FaLock, FaShieldAlt, FaTruck, FaMoneyBillWave, FaMobileAlt } from "react-icons/fa";
import "./Checkout.css";

const Checkout = () => {
  const {
    cart,
    buyNowItem,
    totals,
    shippingAddress,
    setShippingAddress,
    sameAsShipping,
    setSameAsShipping,
    placeOrder,
  } = useContext(ShopContext);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Payment Method State: 'upi' or 'cod' (only 1 selectable at a time)
  const [paymentMethod, setPaymentMethodState] = useState("upi");

  const [localBillingAddress, setLocalBillingAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    const loggedInName = localStorage.getItem("customerName") || localStorage.getItem("userName") || "";
    if (loggedInName && !shippingAddress.fullName) {
      setShippingAddress((prev) => ({ ...prev, fullName: loggedInName }));
    }
  }, [setShippingAddress, shippingAddress.fullName]);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setLocalBillingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const displayItems = (cart && cart.length > 0) ? cart : (buyNowItem ? [buyNowItem] : []);

  const handlePlaceOrderSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const storedUser = JSON.parse(localStorage.getItem("customerInfo") || "{}");
      const customerEmail = localStorage.getItem("customerEmail") || storedUser.email || "";

      if (!customerEmail) {
        throw new Error("Please log in before placing an order.");
      }

      const formattedItems = displayItems.map((item) => ({
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        image: item.product.image,
      }));

      const finalBillingAddress = sameAsShipping
        ? {
            fullName: shippingAddress.fullName,
            phoneNumber: shippingAddress.phone,
            address: shippingAddress.address,
            addressLine2: shippingAddress.address2 || "",
            city: shippingAddress.city,
            state: shippingAddress.state,
            pincode: shippingAddress.pincode,
          }
        : {
            fullName: localBillingAddress.fullName,
            phoneNumber: localBillingAddress.phone,
            address: localBillingAddress.address,
            addressLine2: localBillingAddress.address2 || "",
            city: localBillingAddress.city,
            state: localBillingAddress.state,
            pincode: localBillingAddress.pincode,
          };

      const orderPayload = {
        customerEmail,
        shippingAddress: {
          fullName: shippingAddress.fullName,
          phoneNumber: shippingAddress.phone,
          address: shippingAddress.address,
          addressLine2: shippingAddress.address2 || "",
          city: shippingAddress.city,
          state: shippingAddress.state,
          pincode: shippingAddress.pincode,
        },
        billingAddress: finalBillingAddress,
        paymentMethod: paymentMethod === "upi" ? "UPI (Pay Online)" : "Cash on Delivery (COD)",
        items: formattedItems,
        totalAmount: totals.total,
      };

      const response = await apiClient.post("/orders/checkout", orderPayload);

      if (response.data?.success) {
        placeOrder();
        navigate("/thank-you");
      } else {
        throw new Error(response.data?.message || "Failed to place order.");
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.response?.data?.message || err.message || "Something went wrong during checkout.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="checkout-page">
        <div className="container">
          {errorMessage && (
            <div className="checkout-error-banner">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handlePlaceOrderSubmit} className="checkout-form-wrapper">
            
            {/* Left Column: Delivery & Payment Details */}
            <div className="checkout-fields">
              
              {/* Shipping Address Card */}
              <div className="checkout-card">
                <h2>Shipping Address</h2>
                <div className="checkout-grid">
                  <div className="form-group full-width">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingAddress.fullName || ""}
                      onChange={handleShippingChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingAddress.phone || ""}
                      onChange={handleShippingChange}
                      required
                      placeholder="Enter 10-digit mobile number"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Street Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={shippingAddress.address || ""}
                      onChange={handleShippingChange}
                      required
                      placeholder="Flat, House no., Building, Street"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Address Line 2 (Optional)</label>
                    <input
                      type="text"
                      name="address2"
                      value={shippingAddress.address2 || ""}
                      onChange={handleShippingChange}
                      placeholder="Landmark, Area, Colony"
                    />
                  </div>

                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingAddress.city || ""}
                      onChange={handleShippingChange}
                      required
                      placeholder="City / Town"
                    />
                  </div>

                  <div className="form-group">
                    <label>State *</label>
                    <input
                      type="text"
                      name="state"
                      value={shippingAddress.state || ""}
                      onChange={handleShippingChange}
                      required
                      placeholder="State"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={shippingAddress.pincode || ""}
                      onChange={handleShippingChange}
                      required
                      placeholder="6-digit PIN code"
                    />
                  </div>
                </div>
              </div>

              {/* Billing Address Card */}
              <div className="checkout-card">
                <div className="billing-header">
                  <h2>Billing Address</h2>
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={sameAsShipping}
                      onChange={(e) => setSameAsShipping(e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    Same as shipping address
                  </label>
                </div>

                {!sameAsShipping && (
                  <div className="checkout-grid fade-in">
                    <div className="form-group full-width">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={localBillingAddress.fullName}
                        onChange={handleBillingChange}
                        required
                        placeholder="Enter billing full name"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={localBillingAddress.phone}
                        onChange={handleBillingChange}
                        required
                        placeholder="Enter billing phone number"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={localBillingAddress.address}
                        onChange={handleBillingChange}
                        required
                        placeholder="Enter billing street address"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Address Line 2 (Optional)</label>
                      <input
                        type="text"
                        name="address2"
                        value={localBillingAddress.address2}
                        onChange={handleBillingChange}
                        placeholder="Landmark, Area, Colony"
                      />
                    </div>

                    <div className="form-group">
                      <label>City *</label>
                      <input
                        type="text"
                        name="city"
                        value={localBillingAddress.city}
                        onChange={handleBillingChange}
                        required
                        placeholder="City"
                      />
                    </div>

                    <div className="form-group">
                      <label>State *</label>
                      <input
                        type="text"
                        name="state"
                        value={localBillingAddress.state}
                        onChange={handleBillingChange}
                        required
                        placeholder="State"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Pincode *</label>
                      <input
                        type="text"
                        name="pincode"
                        value={localBillingAddress.pincode}
                        onChange={handleBillingChange}
                        required
                        placeholder="PIN code"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Method Card */}
              <div className="checkout-card payment-method-card">
                <h2>Payment Method</h2>
                <p className="payment-subtitle">Choose your preferred payment method to proceed.</p>

                <div className="payment-options">
                  {/* Option 1: UPI (Pay Online) */}
                  <label className={`payment-radio-label ${paymentMethod === "upi" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={(e) => setPaymentMethodState(e.target.value)}
                    />
                    <span className="radio-circle"></span>
                    <div className="payment-option-content">
                      <div className="payment-option-header">
                        <FaMobileAlt className="payment-icon" />
                        <span className="payment-title">UPI (Pay Online)</span>
                      </div>
                      <span className="payment-desc">Pay instantly using Google Pay, PhonePe, Paytm or BHIM UPI</span>
                    </div>
                  </label>

                  {/* Option 2: Cash on Delivery (COD) */}
                  <label className={`payment-radio-label ${paymentMethod === "cod" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethodState(e.target.value)}
                    />
                    <span className="radio-circle"></span>
                    <div className="payment-option-content">
                      <div className="payment-option-header">
                        <FaMoneyBillWave className="payment-icon" />
                        <span className="payment-title">Cash on Delivery (COD)</span>
                      </div>
                      <span className="payment-desc">Pay cash or UPI when your parcel arrives</span>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Right Column: Order Summary */}
            <div className="checkout-summary">
              <div className="summary-card">
                <h2>Order Summary</h2>
                <div className="summary-divider"></div>

                <div className="checkout-items-summary">
                  {displayItems.map((item, idx) => (
                    <div className="checkout-summary-item" key={idx}>
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                      />
                      <div className="summary-item-info">
                        <h4>{item.product.name}</h4>
                        <p>Qty: {item.quantity}</p>
                      </div>
                      <div className="summary-item-price">
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="summary-divider"></div>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{totals.subtotal.toLocaleString()}</span>
                </div>

                {totals.discount > 0 && (
                  <div className="summary-row discount">
                    <span>Discount (10%)</span>
                    <span>- ₹{totals.discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="free-shipping">FREE</span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-row total">
                  <span>Total Payable</span>
                  <span>₹{totals.total.toLocaleString()}</span>
                </div>

                {/* Conditional Payment Button & Note */}
                <div className="payment-action-box">
                  <button
                    type="submit"
                    className={`place-order-btn ${loading ? "loading" : ""}`}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner"></span>
                    ) : paymentMethod === "upi" ? (
                      "PAY NOW"
                    ) : (
                      "PLACE ORDER"
                    )}
                  </button>

                  {/* Payment Note based on selection */}
                  {paymentMethod === "cod" ? (
                    <p className="payment-note cod-note">
                      <FaTruck style={{ marginRight: "6px", color: "#2BA84A" }} />
                      Pay when your order is delivered.
                    </p>
                  ) : (
                    <p className="payment-note upi-note">
                      <FaLock style={{ marginRight: "6px", color: "#EF6F8F" }} />
                      100% Secure Encrypted Online Payment
                    </p>
                  )}
                </div>

                <div className="security-trust-badge">
                  <FaShieldAlt style={{ color: "#D4AF37", fontSize: "16px" }} />
                  <span>30-Day Easy Returns & Money Back Guarantee</span>
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;