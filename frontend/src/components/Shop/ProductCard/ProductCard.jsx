import "./ProductCard.css";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
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
        className={`wishlist-btn ${liked ? "liked" : ""}`}
        onClick={() => setLiked(!liked)}
        aria-label="Add to wishlist"
      >
        {liked ? (
          <FaHeart size={16} className="heart-icon active" />
        ) : (
          <FaRegHeart size={16} className="heart-icon" />
        )}
      </button>

      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
        />
        <div className="image-overlay">
          <Link to={`/product/${product._id || product.id}`}>
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
          <span>{product.rating || 5}</span>
          <small>({product.reviews || 0})</small>
        </div>

        <div className="price-row">
          <span className="price">
            ₹{product.price}
          </span>
          {product.oldPrice && (
            <span className="old-price">
              ₹{product.oldPrice}
            </span>
          )}
        </div>

        <Link
          to={`/product/${product._id || product.id}`}
          className="view-btn"
        >
          View Details
        </Link>
      </div>

    </div>
  );
};

export default ProductCard;