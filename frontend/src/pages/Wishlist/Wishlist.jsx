 import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FaHeart, FaStar } from "react-icons/fa";
import { getWishlist, toggleWishlist } from "../../api/customer";
import { ShopContext } from "../../context/ShopContext";
import "./Wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingItems, setLoadingItems] = useState({});
  const navigate = useNavigate();
  const { addToCart } = useContext(ShopContext);

  const customerToken = localStorage.getItem("customerToken") || localStorage.getItem("token");

  useEffect(() => {
    const fetchWishlistData = async () => {
      if (!customerToken) {
        setLoading(false);
        return;
      }
      try {
        const data = await getWishlist();
        if (data && data.wishlist) {
          setWishlist(data.wishlist);
        }
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistData();
  }, [customerToken]);

  const removeFromWishlist = async (item) => {
    const id = item.id || item._id;
    try {
      const data = await toggleWishlist({
        product: {
          id,
          name: item.name,
          image: item.image,
          price: item.price,
          oldPrice: item.oldPrice,
        },
      });
      if (data && data.wishlist) {
        setWishlist(data.wishlist);
      }
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

   const handleMoveToCart = (item) => {
    const id = item.id || item._id;
    setLoadingItems((prev) => ({ ...prev, [id]: true }));
    
    setTimeout(async () => {
      // 1. Add item to cart and store it persistently
      addToCart(item, 1);
      
      // 2. Remove item from wishlist API/state
      await removeFromWishlist(item);
      
      setLoadingItems((prev) => ({ ...prev, [id]: false }));
      
      // 3. Use client-side routing instead of hard reload
      navigate("/cart");
    }, 400);
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
                onClick={() => navigate("/shop")}
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
                        onClick={() => removeFromWishlist(item)}
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