import "./ProductActions.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../../context/ShopContext";
import AuthRequiredModal from "../../AuthRequiredModal/AuthRequiredModal";
import { isCustomerAuthenticated } from "../../ProtectedRoute/ProtectedRoute";

import { FiHeart, FiShoppingCart } from "react-icons/fi";

const ProductActions = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, addToWishlist } = useContext(ShopContext);
  const [qty, setQty] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authRedirectPath, setAuthRedirectPath] = useState("/checkout");
  const [authMessage, setAuthMessage] = useState("Please login to continue your purchase.");

  const decrease = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const increase = () => {
    setQty(qty + 1);
  };

  const handleBuyNow = () => {
    // Save product to cart first so cart data is preserved
    addToCart(product, qty);

    if (isCustomerAuthenticated()) {
      navigate("/checkout");
    } else {
      setAuthRedirectPath("/checkout");
      setAuthMessage("Please login to continue your purchase.");
      setShowAuthModal(true);
    }
  };

  const handleWishlistClick = () => {
    if (isCustomerAuthenticated()) {
      addToWishlist(product);
    } else {
      setAuthRedirectPath("/wishlist");
      setAuthMessage("Please login to save items to your wishlist.");
      setShowAuthModal(true);
    }
  };

  return (
    <div className="product-actions">
      <div className="actions-row-1">
        <div className="quantity-wrapper">
          <span className="qty-label">Quantity:</span>
          <div className="quantity-box">
            <button onClick={decrease}>−</button>
            <span>{qty}</span>
            <button onClick={increase}>+</button>
          </div>
        </div>

        <button
          className="add-cart-btn"
          onClick={() => {
            addToCart(product, qty);
            navigate("/cart");
          }}
        >
          <FiShoppingCart />
          Add to Cart
        </button>
      </div>

      <div className="actions-row-2">
        <button
          className="buy-btn"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>

        <button
          className="wishlist-btn-detail"
          onClick={handleWishlistClick}
        >
          <FiHeart />
        </button>
      </div>

      {/* Auth Prompt Modal */}
      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        redirectPath={authRedirectPath}
        message={authMessage}
      />
    </div>
  );
};

export default ProductActions;