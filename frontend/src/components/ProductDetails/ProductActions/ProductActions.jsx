import "./ProductActions.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../../context/ShopContext";

import { FiHeart, FiShoppingCart } from "react-icons/fi";

const ProductActions = ({ product }) => {
  const navigate = useNavigate();

const {
  addToCart,
  addToWishlist,
} = useContext(ShopContext);
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
  onClick={() => {
    addToCart(product, qty);
    navigate("/checkout");
  }}
>
          Buy Now
        </button>

      <button
  className="wishlist-btn-detail"
  onClick={() => addToWishlist(product)}
>
          <FiHeart />
        </button>

      </div>

    </div>
  );
};

export default ProductActions;