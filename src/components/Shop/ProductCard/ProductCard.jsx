import "./ProductCard.css";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="product-card">

      {/* Discount Badge */}
      {product.discount && (
        <span className="discount-badge">
          -{product.discount}%
        </span>
      )}

      {/* Wishlist */}
      <button
        className="wishlist-btn"
        onClick={() => setLiked(!liked)}
      >
        {liked ? <FaHeart /> : <FaRegHeart />}
      </button>

      {/* Product Image */}
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      {/* Product Details */}
      <div className="product-info">

        <h4>{product.name}</h4>

        <div className="rating">
          <FaStar />
          <span>{product.rating}</span>
          <small>({product.reviews})</small>
        </div>

        <div className="price-row">

          <span className="price">
            ₹{product.price}
          </span>

          <span className="old-price">
            ₹{product.oldPrice}
          </span>

        </div>

        <button className="cart-btn">

          <FiShoppingBag />

          Add to Cart

        </button>

      </div>

    </div>
  );
};

export default ProductCard;