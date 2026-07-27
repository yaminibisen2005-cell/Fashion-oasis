import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FaTrash, FaPlus, FaMinus, FaTruck, FaLock, FaUndo } from "react-icons/fa";
import "./Cart.css";

const Cart = () => {
  const {
    cart,
    totals,
    couponCode,
    couponSuccess,
    couponError,
    updateQuantity,
    removeFromCart,
    applyCoupon,
  } = useContext(ShopContext);

  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState(couponCode);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [loadingCoupon, setLoadingCoupon] = useState(false);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setLoadingCoupon(true);
    setTimeout(() => {
      applyCoupon(couponInput);
      setLoadingCoupon(false);
    }, 500);
  };

  const handleCheckout = () => {
    setLoadingCheckout(true);
    setTimeout(() => {
      setLoadingCheckout(false);
      navigate("/checkout");
    }, 800); // 800ms premium loader
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <div className="container">
          <div className="cart-title">
            <h1>Your Cart ({cart.length})</h1>
            <p>Review your selected luxury items before proceeding to checkout.</p>
          </div>

          {cart.length === 0 ? (
            <div className="empty-cart text-center">
              <div className="empty-cart-icon-wrapper">
                <FaLock className="empty-cart-icon" />
              </div>
              <h2>Your Cart is Empty</h2>
              <p>Add some beautiful jewellery pieces to start shopping.</p>
              <button
                className="continue-shopping-btn"
                onClick={() => navigate("/collections")}
              >
                Go to Collections
              </button>
            </div>
          ) : (
            <div className="cart-content-wrapper">
              {/* Left Column: Cart items and Coupon */}
              <div className="cart-left-column">
                <div className="cart-table-card">
                  <div className="cart-table-header">
                    <span className="col-product">Product</span>
                    <span className="col-price">Price</span>
                    <span className="col-quantity">Quantity</span>
                  </div>

                  <div className="cart-items-list">
                    {cart.map((item) => (
                      <div className="cart-item-row" key={item.product.id}>
                        <div className="cart-product-details">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="cart-item-thumbnail"
                          />
                          <div className="cart-item-meta">
                            <h4>{item.product.name}</h4>
                            <span className="item-category">
                              {item.product.category}
                            </span>
                            <button
                              className="remove-item-btn"
                              onClick={() => removeFromCart(item.product.id)}
                            >
                              <FaTrash /> Remove
                            </button>
                          </div>
                        </div>

                        <div className="cart-item-price">
                          ₹{item.product.price.toLocaleString()}
                        </div>

                        <div className="cart-item-qty">
                          <div className="qty-selector">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                            >
                              <FaMinus />
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coupon Code Section */}
                <div className="coupon-card">
                  <h3>Coupon Code</h3>
                  <form onSubmit={handleApplyCoupon} className="coupon-form">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                    />
                    <button type="submit" disabled={loadingCoupon}>
                      {loadingCoupon ? <span className="spinner"></span> : "APPLY"}
                    </button>
                  </form>
                  {couponError && (
                    <p className="coupon-message error">{couponError}</p>
                  )}
                  {couponSuccess && (
                    <p className="coupon-message success">{couponSuccess}</p>
                  )}
                  <p className="coupon-tip">
                    * Tip: Use code <strong>KGL56M6ux</strong> to claim a 10% discount.
                  </p>
                </div>

                {/* Trust Badges */}
                <div className="cart-trust-badges">
                  <div className="badge-item">
                    <div className="badge-icon-wrapper">
                      <FaTruck />
                    </div>
                    <div className="badge-text">
                      <h5>Free Shipping</h5>
                      <p>On orders above ₹999</p>
                    </div>
                  </div>
                  <div className="badge-item">
                    <div className="badge-icon-wrapper">
                      <FaLock />
                    </div>
                    <div className="badge-text">
                      <h5>Secure Payment</h5>
                      <p>100% safe & secure</p>
                    </div>
                  </div>
                  <div className="badge-item">
                    <div className="badge-icon-wrapper">
                      <FaUndo />
                    </div>
                    <div className="badge-text">
                      <h5>Easy Returns</h5>
                      <p>7 days return policy</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary ("Get Summary") */}
              <div className="cart-right-column">
                <div className="summary-card">
                  <h2>Get Summary</h2>
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
                    className={`proceed-btn ${loadingCheckout ? "loading" : ""}`}
                    onClick={handleCheckout}
                    disabled={loadingCheckout}
                  >
                    {loadingCheckout ? (
                      <span className="spinner"></span>
                    ) : (
                      "PROCEED TO CHECKOUT"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
