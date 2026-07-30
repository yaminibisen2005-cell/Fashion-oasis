import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FaHeart, FaStar, FaTrash } from "react-icons/fa";
import "./Wishlist.css";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, moveToCart, moveAllToCart } =
    useContext(ShopContext);
  const navigate = useNavigate();

  // State to track loading for individual items
  const [loadingItems, setLoadingItems] = useState({});
  // State for "Move All to Cart" loading
  const [loadingAll, setLoadingAll] = useState(false);

  const handleMoveToCart = (id) => {
    setLoadingItems((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      moveToCart(id);
      setLoadingItems((prev) => ({ ...prev, [id]: false }));
    }, 600); // 600ms premium loader
  };

  const handleMoveAllToCart = () => {
    setLoadingAll(true);
    setTimeout(() => {
      moveAllToCart();
      setLoadingAll(false);
    }, 1000); // 1s premium loader for bulk action
  };

  return (
    <>
      <Navbar />
      <div className="wishlist-page">
        <div className="container">
          <div className="wishlist-header">
            <h1>My Wishlist ({wishlist.length})</h1>
            <p>Your curated list of exquisite items ready to join your collection.</p>
          </div>

          {wishlist.length === 0 ? (
            <div className="empty-wishlist text-center">
              <div className="empty-icon-wrapper">
                <FaHeart className="empty-heart-icon" />
              </div>
              <h2>Your Wishlist is Empty</h2>
              <p>Explore our collections and add items you love!</p>
              <button
                className="shop-now-btn"
                onClick={() => navigate("/collections")}
              >
                Explore Collections
              </button>
            </div>
          ) : (
            <>
              <div className="wishlist-grid">
                {wishlist.map((item) => (
                  <div className="wishlist-card" key={item.id}>
                    <div className="wishlist-image-wrapper">
                      <img src={item.image} alt={item.name} />
                      <button
                        className="remove-wishlist-btn"
                        onClick={() => removeFromWishlist(item.id)}
                        title="Remove from wishlist"
                      >
                        <FaHeart className="heart-icon-filled" />
                      </button>
                    </div>

                    <div className="wishlist-info">
                      <h3>{item.name}</h3>
                      <div className="wishlist-stars">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <span>(5.0)</span>
                      </div>
                      <div className="wishlist-price">
                        <span className="current-price">
                          ₹{item.price.toLocaleString()}
                        </span>
                        {item.oldPrice && (
                          <del className="old-price">
                            ₹{item.oldPrice.toLocaleString()}
                          </del>
                        )}
                      </div>

                      <button
                        className={`move-to-cart-btn ${
                          loadingItems[item.id] ? "loading" : ""
                        }`}
                        onClick={() => handleMoveToCart(item.id)}
                        disabled={loadingItems[item.id]}
                      >
                        {loadingItems[item.id] ? (
                          <span className="spinner"></span>
                        ) : (
                          "MOVE TO CART"
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="wishlist-actions text-center">
                <button
                  className={`move-all-btn ${loadingAll ? "loading" : ""}`}
                  onClick={handleMoveAllToCart}
                  disabled={loadingAll}
                >
                  {loadingAll ? (
                    <span className="spinner"></span>
                  ) : (
                    "MOVE ALL TO CART"
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
