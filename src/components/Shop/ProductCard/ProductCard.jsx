import "./ProductCard.css";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="product-card">

      {product.discount && (
        <span className="discount-badge">
          -{product.discount}%
        </span>
      )}

      <button
        className="wishlist-btn"
        onClick={() => setLiked(!liked)}
      >
        {liked ? <FaHeart /> : <FaRegHeart />}
      </button>

      <div className="product-image">

        <img
          src={product.image}
          alt={product.name}
        />

        <div className="image-overlay">
          <Link to={`/product/${product.id}`}>
            <button className="quick-view-btn">
              Quick View
            </button>
          </Link>
        </div>

      </div>

      <div className="product-info">

        <h4>{product.name}</h4>

        <div className="rating">
          <FaStar className="star-icon" />
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

        <Link
          to={`/product/${product.id}`}
          className="view-btn"
        >
          View Details
        </Link>

      </div>

    </div>
  );
};

export default ProductCard;