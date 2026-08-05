 import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FaHeart, FaStar } from "react-icons/fa";
import "./Wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingItems, setLoadingItems] = useState({});
  const navigate = useNavigate();
  const customerEmail = localStorage.getItem("customerEmail");

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!customerEmail) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`http://localhost:5000/api/v1/wishlist/${customerEmail}`);
        const data = await response.json();
        if (response.ok && data.wishlist) {
          setWishlist(data.wishlist);
        }
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [customerEmail]);

  const removeFromWishlist = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/wishlist/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail,
          product: { id },
        }),
      });

      if (response.ok) {
        setWishlist((prev) => prev.filter((item) => (item.id || item._id) !== id));
      }
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  const handleMoveToCart = (item) => {
    const id = item.id || item._id;
    setLoadingItems((prev) => ({ ...prev, [id]: true }));
    setTimeout(async () => {
      // Add your cart API action here if needed, then remove from wishlist
      await removeFromWishlist(id);
      setLoadingItems((prev) => ({ ...prev, [id]: false }));
    }, 600);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="wishlist-page text-center" style={{ padding: "80px 0" }}>
          <p>Loading your wishlist...</p>
        </div>
        <Footer />
      </>
    );
  }

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
            <div className="wishlist-grid">
              {wishlist.map((item) => {
                const itemId = item.id || item._id;
                return (
                  <div className="wishlist-card" key={itemId}>
                    <div className="wishlist-image-wrapper">
                      <img src={item.image} alt={item.name} />
                      <button
                        className="remove-wishlist-btn"
                        onClick={() => removeFromWishlist(itemId)}
                        title="Remove from wishlist"
                      >
                        <FaHeart className="heart-icon-filled" />
                      </button>
                    </div>

                    <div className="wishlist-info">
                      <h3>{item.name}</h3>
                      <div className="wishlist-stars">
                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                        <span>(5.0)</span>
                      </div>
                      <div className="wishlist-price">
                        <span className="current-price">
                          {typeof item.price === "number" ? `₹${item.price.toLocaleString()}` : item.price}
                        </span>
                        {item.oldPrice && (
                          <del className="old-price">
                            {typeof item.oldPrice === "number" ? `₹${item.oldPrice.toLocaleString()}` : item.oldPrice}
                          </del>
                        )}
                      </div>

                      <button
                        className={`move-to-cart-btn ${
                          loadingItems[itemId] ? "loading" : ""
                        }`}
                        onClick={() => handleMoveToCart(item)}
                        disabled={loadingItems[itemId]}
                      >
                        {loadingItems[itemId] ? (
                          <span className="spinner"></span>
                        ) : (
                          "MOVE TO CART"
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;