import "./ProductInfo.css";
import { FaStar } from "react-icons/fa";
import ProductActions from "../ProductActions/ProductActions";

const ProductInfo = ({ product }) => {
  return (
    <div className="product-info-panel">

      <h1>{product.name}</h1>

      <div className="product-rating">

        <div className="stars">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>

        <span>({product.reviews} Reviews)</span>

        <span className="stock">In Stock</span>

      </div>

      <div className="price-section">

        <span className="price">
          ₹{product.price}
        </span>

        <span className="old-price">
          ₹{product.oldPrice}
        </span>

        <span className="discount-badge">
          {product.discount}% OFF
        </span>

      </div>

      <p className="description">
        Elegant handcrafted jewellery designed for everyday wear
        and special occasions. Made with premium materials and
        attention to detail.
      </p>

      <div className="product-specs">

        <div className="spec-item">
          <span className="spec-label">Material</span>
          <span className="spec-value">Rose Gold Plated</span>
        </div>

        <div className="spec-item">
          <span className="spec-label">Stone</span>
          <span className="spec-value">Cubic Zirconia</span>
        </div>

        <div className="spec-item">
          <span className="spec-label">Chain Length</span>
          <span className="spec-value">18 inch (Adjustable)</span>
        </div>

        <div className="spec-item">
          <span className="spec-label">Weight</span>
          <span className="spec-value">8.5 g</span>
        </div>

      </div>

      <ProductActions />

    </div>
  );
};

export default ProductInfo;