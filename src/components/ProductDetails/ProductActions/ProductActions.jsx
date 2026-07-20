import "./ProductActions.css";
import { useState } from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

const ProductActions = () => {
  const [qty, setQty] = useState(1);

  const decrease = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const increase = () => {
    setQty(qty + 1);
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

        <button className="add-cart-btn">
          <FiShoppingCart />
          Add to Cart
        </button>

      </div>

      <div className="actions-row-2">

        <button className="buy-btn">
          Buy Now
        </button>

        <button className="wishlist-btn-detail">
          <FiHeart />
        </button>

      </div>

    </div>
  );
};

export default ProductActions;