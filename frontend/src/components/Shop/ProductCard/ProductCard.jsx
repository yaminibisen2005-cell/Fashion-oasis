import "./ProductCard.css";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../../context/ShopContext";

const ProductCard = ({
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
      alert("Please log in to manage your wishlist.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/wishlist/toggle",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerEmail,
            product: {
              id: product.id || product._id,
              name: product.name,
              image: product.image,
              price: product.price,
              oldPrice: product.oldPrice,
            },
          }),
        }
      );

      if (response.ok) {
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
        <img src={product.image} alt={product.name} />

        {!showAddToCart && (
          <div className="image-overlay">
            <Link to={`/product/${product.id || product._id}`}>
              <button className="quick-view-btn">
                Quick View
              </button>
            </Link>
          </div>
        )}
      </div>

      <div className="product-info">
        {!hideName && <h4>{product.name}</h4>}

        {!hideRating && product.rating && (
          <div className="rating">
            <FaStar className="star-icon" />
            <span>{product.rating}</span>
            {product.reviews && <small>({product.reviews})</small>}
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

        {showAddToCart ? (
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
        ) : (
          <Link
            to={`/product/${product.id || product._id}`}
            className="view-btn"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductCard;