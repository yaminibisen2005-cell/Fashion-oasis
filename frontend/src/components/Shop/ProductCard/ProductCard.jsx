import "./ProductCard.css";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../../context/ShopContext";
import { toggleWishlist } from "../../../api/customer";
import { notifyWarning } from "../../../utils/alerts";

const ProductCard = ({
  product,
  showAddToCart = false,
  hideName = false,
  hideRating = false,
}) => {
  const [liked, setLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useContext(ShopContext);

  const customerToken = localStorage.getItem("token") || localStorage.getItem("customerToken");

  const handleWishlistToggle = async () => {
    if (!customerToken) {
      notifyWarning("Please log in to manage your wishlist.");
      return;
    }

    try {
       const data = await toggleWishlist({
        product: {
          id: String(product.id || product._id),
          name: product.name,
          image: product.image,
          price: product.price,
          oldPrice: product.oldPrice,
        },
      });

      if (data) {
        setLiked(!liked);
      }
    } catch (err) {
      console.error("Failed to update wishlist", err);
    }
  };

  return (
    <div
      className={`product-card ${showAddToCart ? "has-add-to-cart" : ""}`}
    >
      {product.discount && (
        <span className="discount-badge">
          -{product.discount}%
        </span>
      )}

      <button
        className={`wishlist-btn ${liked ? "liked" : ""}`}
        onClick={handleWishlistToggle}
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
        {showAddToCart ? (
          <>
            <div className="price-row">
              <span className="price">₹{product.price}</span>
              {product.oldPrice && (
                <span className="old-price">
                  ₹{product.oldPrice}
                </span>
              )}
            </div>
            <button
              className="view-btn add-to-cart-btn"
              onClick={() => {
                addToCart(product, 1);
                setAddedToCart(true);
                setTimeout(() => setAddedToCart(false), 2000);
              }}
            >
              {addedToCart ? "Added!" : "Add to Cart"}
            </button>
          </>
        ) : (
          <>
            <div className="info-left-content">
              {!hideName && <h4>{product.name}</h4>}

              {!hideRating && (
                <div className="rating">
                  <FaStar className="star-icon" />
                  <span>{product.rating || 5}</span>
                  <small>({product.reviews || 0})</small>
                </div>
              )}

              <div className="price-row">
                <span className="price">₹{product.price}</span>
                {product.oldPrice && (
                  <span className="old-price">
                    ₹{product.oldPrice}
                  </span>
                )}
              </div>
            </div>

            <Link
              to={`/product/${product._id || product.id}`}
              className="view-btn"
            >
              View Details
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;