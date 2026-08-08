import "./FeaturedProductCard.css";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import { notifyWarning } from "../../utils/alerts";

import { toggleWishlist } from "../../api/customer";

const FeaturedProductCard = ({
  product,
  showAddToCart = false,
  hideName = false,
  hideRating = false,
}) => {
  const [liked, setLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useContext(ShopContext);

  const customerEmail = localStorage.getItem("customerEmail");

  const handleWishlistToggle = async () => {
    if (!customerEmail) {
      notifyWarning("Please log in to manage your wishlist.");
      return;
    }

    try {
      const res = await toggleWishlist({
        product: {
          id: product.id || product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          oldPrice: product.oldPrice,
        },
      });

      if (res.success) {
        setLiked(!liked);
      }
    } catch (err) {
      console.error("Failed to update wishlist", err);
    }
  };

  return (
    <div
      className={`featured-product-card ${showAddToCart ? "featured-has-add-to-cart" : ""}`}
    >
      {product.discount && (
        <span className="featured-discount-badge">
          -{product.discount}%
        </span>
      )}

      <button
        className={`featured-wishlist-btn ${liked ? "featured-liked" : ""}`}
        onClick={handleWishlistToggle}
        aria-label="Add to wishlist"
      >
        {liked ? (
          <FaHeart size={16} className="featured-heart-icon featured-active" />
        ) : (
          <FaRegHeart size={16} className="featured-heart-icon" />
        )}
      </button>

      <div className="featured-product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="featured-product-info">
        {showAddToCart ? (
          <>
            <div className="featured-price-row">
              <span className="featured-price">₹{product.price}</span>
              {product.oldPrice && (
                <span className="featured-old-price">
                  ₹{product.oldPrice}
                </span>
              )}
            </div>
            <button
              className="featured-view-btn featured-add-to-cart-btn"
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
            <div className="featured-info-left-content">
              {!hideName && <h4>{product.name}</h4>}

              {!hideRating && product.rating && (
                <div className="featured-rating">
                  <FaStar className="featured-star-icon" />
                  <span>{product.rating}</span>
                  {product.reviews && <small>({product.reviews})</small>}
                </div>
              )}

              <div className="featured-price-row">
                <span className="featured-price">₹{product.price}</span>
                {product.oldPrice && (
                  <span className="featured-old-price">
                    ₹{product.oldPrice}
                  </span>
                )}
              </div>
            </div>

            <Link
              to={`/product/${product.id || product._id}`}
              className="featured-view-btn"
            >
              View Details
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default FeaturedProductCard;
