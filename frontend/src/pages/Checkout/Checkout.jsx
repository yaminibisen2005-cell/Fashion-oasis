 import React, { useContext, useState, useEffect } from "react";
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
    sameAsShipping,
    setSameAsShipping,
    placeOrder,
  } = useContext(ShopContext);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const paymentMethod = "cod";

  // Independent local state for billing address to prevent any context bleeding
  const [localBillingAddress, setLocalBillingAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Automatically load logged-in user name into shipping address if available
  useEffect(() => {
    const loggedInName = localStorage.getItem("customerName") || localStorage.getItem("userName") || "";
    if (loggedInName && !shippingAddress.fullName) {
      setShippingAddress((prev) => ({ ...prev, fullName: loggedInName }));
    }
  }, [setShippingAddress, shippingAddress.fullName]);

  // Shipping input state handler
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Local billing input state handler
  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setLocalBillingAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Fallback dataset if cart is empty
  const displayItems = cart.length > 0 ? cart : [
    { product: { name: "Rose Quartz Necklace", price: 1299, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=100&q=80" }, quantity: 1 }
  ];

  const handlePlaceOrderSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const customerEmail = localStorage.getItem("customerEmail");

      const formattedItems = displayItems.map((item) => ({
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      }));

      // Determine final billing payload based on checkbox
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
        paymentMethod,
        items: formattedItems,
        totalAmount: totals.total,
      };

      const response = await fetch("http://localhost:5000/api/v1/orders/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      placeOrder();
      navigate("/payment");
      
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message || "Something went wrong during checkout.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="checkout-page">
        <div className="container">
          {errorMessage && <div className="checkout-error-banner" style={{ color: "red", marginBottom: "15px", textAlign: "center" }}>{errorMessage}</div>}
          
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
                      value={shippingAddress.fullName || ""}
                      onChange={handleShippingChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingAddress.phone || ""}
                      onChange={handleShippingChange}
                      required
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={shippingAddress.address || ""}
                      onChange={handleShippingChange}
                      required
                      placeholder="Enter street address, P.O. Box"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Address Line 2 (Optional)</label>
                    <input
                      type="text"
                      name="address2"
                      value={shippingAddress.address2 || ""}
                      onChange={handleShippingChange}
                      placeholder="Apartment, suite, unit, building"
                    />
                  </div>

                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingAddress.city || ""}
                      onChange={handleShippingChange}
                      required
                      placeholder="Enter city"
                    />
                  </div>

                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      value={shippingAddress.state || ""}
                      onChange={handleShippingChange}
                      required
                      placeholder="Enter state"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={shippingAddress.pincode || ""}
                      onChange={handleShippingChange}
                      required
                      placeholder="Enter 6 digit pincode"
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
                        value={localBillingAddress.fullName}
                        onChange={handleBillingChange}
                        required
                        placeholder="Enter billing full name"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Phone Number</label>
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
                      <label>Address</label>
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
                        placeholder="Apartment, suite, unit, building"
                      />
                    </div>

                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        value={localBillingAddress.city}
                        onChange={handleBillingChange}
                        required
                        placeholder="Enter billing city"
                      />
                    </div>

                    <div className="form-group">
                      <label>State</label>
                      <input
                        type="text"
                        name="state"
                        value={localBillingAddress.state}
                        onChange={handleBillingChange}
                        required
                        placeholder="Enter billing state"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        value={localBillingAddress.pincode}
                        onChange={handleBillingChange}
                        required
                        placeholder="Enter billing pincode"
                      />
                    </div>
                  </div>
                )}
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