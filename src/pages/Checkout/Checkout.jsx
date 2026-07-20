import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Checkout.css";

const Checkout = () => {
  const {
    cart,
    totals,
    shippingAddress,
    setShippingAddress,
    billingAddress,
    setBillingAddress,
    sameAsShipping,
    setSameAsShipping,
    paymentMethod,
    setPaymentMethod,
    placeOrder,
  } = useContext(ShopContext);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Local shipping input state
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Local billing input state
  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrderSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate placing order details and proceeding to payment page
    setTimeout(() => {
      placeOrder();
      setLoading(false);
      navigate("/payment");
    }, 1200); // 1.2s loader to look extremely professional
  };

  // If cart is empty, redirect back to cart (unless we already placed order, but context keeps active cart)
  // To allow checking out the pre-populated cart items, we'll render even if cart size is 0 (fallback dataset)
  const displayItems = cart.length > 0 ? cart : [
    { product: { name: "Rose Quartz Necklace", price: 1299, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=100&q=80" }, quantity: 1 }
  ];

  return (
    <>
      <Navbar />
      <div className="checkout-page">
        <div className="container">
          <form onSubmit={handlePlaceOrderSubmit} className="checkout-form-wrapper">
            
            {/* Left Column: Form Fields */}
            <div className="checkout-fields">
              
              {/* Shipping Address */}
              <div className="checkout-card">
                <h2>Shipping Address</h2>
                <div className="checkout-grid">
                  <div className="form-group full-width">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingAddress.fullName}
                      onChange={handleShippingChange}
                      required
                      placeholder="e.g. Neha Sharma"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingAddress.phone}
                      onChange={handleShippingChange}
                      required
                      placeholder="e.g. +91 98760 42725"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={shippingAddress.address}
                      onChange={handleShippingChange}
                      required
                      placeholder="Street address, P.O. Box"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Address Line 2 (Optional)</label>
                    <input
                      type="text"
                      name="address2"
                      value={shippingAddress.address2}
                      onChange={handleShippingChange}
                      placeholder="Apartment, suite, unit, building"
                    />
                  </div>

                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleShippingChange}
                      required
                      placeholder="e.g. Mumbai"
                    />
                  </div>

                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleShippingChange}
                      required
                      placeholder="e.g. Maharashtra"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={shippingAddress.pincode}
                      onChange={handleShippingChange}
                      required
                      placeholder="6 digit pincode"
                    />
                  </div>
                </div>
              </div>

              {/* Billing Address */}
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
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={billingAddress.fullName}
                        onChange={handleBillingChange}
                        required
                        placeholder="e.g. Neha Sharma"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={billingAddress.phone}
                        onChange={handleBillingChange}
                        required
                        placeholder="e.g. +91 98760 42725"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Address</label>
                      <input
                        type="text"
                        name="address"
                        value={billingAddress.address}
                        onChange={handleBillingChange}
                        required
                        placeholder="Street address, P.O. Box"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Address Line 2 (Optional)</label>
                      <input
                        type="text"
                        name="address2"
                        value={billingAddress.address2}
                        onChange={handleBillingChange}
                        placeholder="Apartment, suite, unit, building"
                      />
                    </div>

                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        value={billingAddress.city}
                        onChange={handleBillingChange}
                        required
                        placeholder="e.g. Mumbai"
                      />
                    </div>

                    <div className="form-group">
                      <label>State</label>
                      <input
                        type="text"
                        name="state"
                        value={billingAddress.state}
                        onChange={handleBillingChange}
                        required
                        placeholder="e.g. Maharashtra"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        value={billingAddress.pincode}
                        onChange={handleBillingChange}
                        required
                        placeholder="6 digit pincode"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="checkout-card">
                <h2>Payment Method</h2>
                <div className="payment-options">
                  <label className="payment-radio-label">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                    />
                    <span className="radio-circle"></span>
                    <span className="payment-text">UPI / QR Code</span>
                  </label>

                  <label className="payment-radio-label">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                    />
                    <span className="radio-circle"></span>
                    <span className="payment-text">Credit / Debit Card</span>
                  </label>

                  <label className="payment-radio-label">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="netbanking"
                      checked={paymentMethod === "netbanking"}
                      onChange={() => setPaymentMethod("netbanking")}
                    />
                    <span className="radio-circle"></span>
                    <span className="payment-text">Net Banking</span>
                  </label>

                  <label className="payment-radio-label">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />
                    <span className="radio-circle"></span>
                    <span className="payment-text">Cash on Delivery</span>
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
                  <span>Total</span>
                  <span>₹{totals.total.toLocaleString()}</span>
                </div>

                <button
                  type="submit"
                  className={`place-order-btn ${loading ? "loading" : ""}`}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="spinner"></span>
                  ) : (
                    "PLACE ORDER"
                  )}
                </button>
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
