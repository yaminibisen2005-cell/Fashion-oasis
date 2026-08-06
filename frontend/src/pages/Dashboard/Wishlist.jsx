 import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import "./Wishlist.css";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { getWishlist, toggleWishlist } from "../../api/customer";
import { ShopContext } from "../../context/ShopContext";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart, removeFromWishlist: removeContextWishlist } = useContext(ShopContext);

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
          setWishlistItems(data.wishlist);
        }
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistData();
  }, [customerToken]);

  const handleRemoveFromWishlist = async (item) => {
    const itemId = item.id || item._id;
    try {
      const data = await toggleWishlist({
        product: {
          id: itemId,
          name: item.name,
          image: item.image,
          price: item.price,
          oldPrice: item.oldPrice,
        },
      });
      if (data && data.wishlist) {
        setWishlistItems(data.wishlist);
      }
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  const handleAddToCart = async (item) => {
    const itemId = item.id || item._id;
    
    // 1. Add item to cart context
    addToCart(item, 1);
    
    // 2. Remove item from backend wishlist database via toggle
    await handleRemoveFromWishlist(item);
    
    // 3. Remove locally from state list
    setWishlistItems(wishlistItems.filter((i) => (i.id || i._id) !== itemId));
    
    // 4. Navigate to cart section/page
    navigate("/cart");
  };

  return (
    <DashboardLayout>
      <div className="wishlist-page">
        <div className="wishlist-header">
          <h2>My Wishlist</h2>
          <p>Your favourite Fashion Oasis products.</p>
        </div>

        {loading ? (
          <p style={{ textAlign: "center", padding: "40px" }}>
            Loading wishlist...
          </p>
        ) : wishlistItems.length === 0 ? (
          <p style={{ textAlign: "center", padding: "40px" }}>
            Your wishlist is empty.
          </p>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map((item) => {
              const itemId = item.id || item._id;

              return (
                <div className="wishlist-card" key={itemId}>
                  <div className="wishlist-image">
                    <img src={item.image} alt={item.name} />

                    <button
                      className="heart-btn"
                      onClick={() => handleRemoveFromWishlist(item)}
                    >
                      <FaHeart color="#e91e63" />
                    </button>
                  </div>

                  <div className="wishlist-content">
                    <h4>{item.name}</h4>

                    <h3>
                      {typeof item.price === "number"
                        ? `₹${item.price.toLocaleString()}`
                        : item.price}
                    </h3>

                    <button 
                      className="cart-btn"
                      onClick={() => handleAddToCart(item)}
                    >
                      <FaShoppingCart />
                      Add To Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Wishlist;