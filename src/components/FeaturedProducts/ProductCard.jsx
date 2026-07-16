import "./FeaturedProducts.css";
import { FaHeart, FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">

      <button className="wishlist-btn-card">
        <FaHeart />
      </button>

      <div className="product-image">

        <img
          src={product.image}
          alt={product.title}
        />

      </div>

      <div className="product-content">

        <div className="product-rating">

          {[...Array(product.rating)].map((_, index) => (
            <FaStar key={index} />
          ))}

        </div>

        <h3>{product.title}</h3>

        <div className="product-price">

          <span className="new-price">

            ₹{product.price}

          </span>

          <span className="old-price">

            ₹{product.oldPrice}

          </span>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;