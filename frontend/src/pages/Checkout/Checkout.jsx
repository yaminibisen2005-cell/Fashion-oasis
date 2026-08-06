 import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Checkout.css";

const Checkout = () => {
  const { cart, totals, removeFromCart } = useContext(ShopContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Payment method must be lowercase to match backend Zod schema enum ['credit_card', 'debit_card', 'upi', 'cod']
  const paymentMethod = "cod"; 

  // Independent local state for billing address to prevent any context bleeding
  const [localBillingAddress, setLocalBillingAddress] = useState({

  const [customerInfo, setCustomerInfo] = useState({

    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    orderNotes: ""
  });

  useEffect(() => {
    const loggedInName = localStorage.getItem("customerName") || localStorage.getItem("userName") || "";
    const loggedInEmail = localStorage.getItem("customerEmail") || "";
    const loggedInPhone = localStorage.getItem("customerPhone") || "";
    
    if (loggedInName && !customerInfo.fullName) {
      setCustomerInfo(prev => ({ ...prev, fullName: loggedInName }));
    }
    if (loggedInEmail && !customerInfo.email) {
      setCustomerInfo(prev => ({ ...prev, email: loggedInEmail }));
    }
    if (loggedInPhone && !customerInfo.phone) {
      setCustomerInfo(prev => ({ ...prev, phone: loggedInPhone }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!customerInfo.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!customerInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(customerInfo.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!customerInfo.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(customerInfo.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!customerInfo.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!customerInfo.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!customerInfo.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!customerInfo.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^[0-9]{6}$/.test(customerInfo.pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  // Fallback dataset if cart is empty
  const displayItems = cart.length > 0 ? cart : [
    { product: { name: "Rose Quartz Necklace", price: 1299, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=100&q=80" }, quantity: 1 }
  ];

  const handlePlaceOrderSubmit = async (e) => {

  const handleSendInquiry = async (e) => {

    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const displayItems = cart.length > 0 ? cart : [
        { product: { name: "Rose Quartz Necklace", price: 1299, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=100&q=80" }, quantity: 1 }
      ];

      const inquiryMessage = `
*NEW PRODUCT INQUIRY - FASHION OASIS*

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*CUSTOMER DETAILS*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*Name:* ${customerInfo.fullName}
*Phone:* +91 ${customerInfo.phone}
*Email:* ${customerInfo.email}
*Address:* ${customerInfo.address}
*City:* ${customerInfo.city}
*State:* ${customerInfo.state}
*Pincode:* ${customerInfo.pincode}
${customerInfo.orderNotes ? `*Notes:* ${customerInfo.orderNotes}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*ORDER DETAILS*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${displayItems.map((item, idx) => `
${idx + 1}. ${item.product.name}
   Qty: ${item.quantity} × ₹${item.product.price.toLocaleString()} = ₹${(item.product.price * item.quantity).toLocaleString()}
`).join('')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*ORDER SUMMARY*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*Subtotal:* ₹${totals.subtotal.toLocaleString()}
${totals.discount > 0 ? `*Discount:* -₹${totals.discount.toLocaleString()}` : ''}
*Shipping:* FREE
*Total:* ₹${totals.total.toLocaleString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Thank you for your inquiry!
Fashion Oasis Team
      `.trim();

      const whatsappNumber = "917739479666";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(inquiryMessage)}`;
      
      const emailSubject = encodeURIComponent("New Product Inquiry - Fashion Oasis");
      const emailBody = encodeURIComponent(inquiryMessage.replace(/\*/g, ''));
      const mailtoUrl = `mailto:fashionoasis082@gmail.com?subject=${emailSubject}&body=${emailBody}`;

      window.open(whatsappUrl, '_blank');
      
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 1000);

      localStorage.setItem("lastInquiry", JSON.stringify({
        customerInfo,
        products: displayItems.map(item => ({
          productName: item.product.name,
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price
        })),
        orderSummary: {
          subtotal: totals.subtotal,
          discount: totals.discount,
          total: totals.total
        },
        timestamp: new Date().toISOString()
      }));

      console.log("Inquiry created:", inquiryMessage);


      // Calculate total precisely to pass backend Zod refiner validation check
      const calculatedTotal = formattedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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
        totalAmount: calculatedTotal,
      };

      await new Promise(resolve => setTimeout(resolve, 2000));


      cart.forEach(item => removeFromCart(item.product.id));

      navigate("/thank-you");
      
    } catch (err) {
      console.error("Error sending inquiry:", err);
      alert("There was an error sending your inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const displayItems = cart.length > 0 ? cart : [
    { product: { name: "Rose Quartz Necklace", price: 1299, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=100&q=80" }, quantity: 1 }
  ];


  return (
    <>
      <Navbar />
      <div className="checkout-page">
        <div className="container">
          <form onSubmit={handleSendInquiry} className="checkout-form-wrapper">
            
            <div className="checkout-fields">
              <div className="checkout-card">
                <h2>Customer Information</h2>
                <div className="checkout-grid">
                  <div className="form-group full-width">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={customerInfo.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      disabled={loading}
                    />
                    {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                  </div>

                  <div className="form-group full-width">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      disabled={loading}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>

                  <div className="form-group full-width">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        if (value.length <= 10) {
                          handleInputChange({ target: { name: "phone", value } });
                        }
                      }}
                      placeholder="Enter 10-digit number"
                      disabled={loading}
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>

                  <div className="form-group full-width">
                    <label>Street Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      placeholder="Enter street address"
                      disabled={loading}
                    />
                    {errors.address && <span className="error-text">{errors.address}</span>}
                  </div>

                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={customerInfo.city}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                      disabled={loading}
                    />
                    {errors.city && <span className="error-text">{errors.city}</span>}
                  </div>

                  <div className="form-group">
                    <label>State *</label>
                    <input
                      type="text"
                      name="state"
                      value={customerInfo.state}
                      onChange={handleInputChange}
                      placeholder="Enter state"
                      disabled={loading}
                    />
                    {errors.state && <span className="error-text">{errors.state}</span>}
                  </div>

                  <div className="form-group full-width">
                    <label>Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={customerInfo.pincode}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        if (value.length <= 6) {
                          handleInputChange({ target: { name: "pincode", value } });
                        }
                      }}
                      placeholder="Enter 6-digit pincode"
                      disabled={loading}
                    />
                    {errors.pincode && <span className="error-text">{errors.pincode}</span>}
                  </div>

                  <div className="form-group full-width">
                    <label>Order Notes (Optional)</label>
                    <input
                      type="text"
                      name="orderNotes"
                      value={customerInfo.orderNotes}
                      onChange={handleInputChange}
                      placeholder="Any special instructions"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            </div>

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
                    "SEND INQUIRY"
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