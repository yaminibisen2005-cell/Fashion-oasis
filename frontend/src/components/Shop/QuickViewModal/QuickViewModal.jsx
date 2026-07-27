import "./QuickViewModal.css";
import { FaStar, FaHeart } from "react-icons/fa";
import { FiShoppingBag, FiX } from "react-icons/fi";

const QuickViewModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="quick-modal-overlay" onClick={onClose}>
      <div
        className="quick-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-modal" onClick={onClose}>
          <FiX />
        </button>

        <div className="modal-left">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="modal-right">
          <h2>{product.name}</h2>

          <div className="modal-rating">
            <FaStar />
            <span>{product.rating}</span>
            <small>({product.reviews} Reviews)</small>
          </div>

          <h3>₹{product.price}</h3>

          <del>₹{product.oldPrice}</del>

          <p>
            Elegant handcrafted jewellery designed
            for every special occasion.
          </p>

          <div className="modal-buttons">
            <button className="buy-btn">
              <FiShoppingBag />
              Add to Cart
            </button>

            <button className="wish-btn">
              <FaHeart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;