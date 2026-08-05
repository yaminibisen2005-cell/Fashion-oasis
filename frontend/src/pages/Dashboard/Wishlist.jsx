import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import "./Wishlist.css";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { getWishlist, toggleWishlist } from "../../api/customer";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const customerEmail = localStorage.getItem("customerEmail");

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!customerEmail) {
        setLoading(false);
        return;
      }

      try {
        const data = await getWishlist(customerEmail);
        if (data.wishlist) {
          setWishlistItems(data.wishlist);
        }
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [customerEmail]);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await toggleWishlist({ customerEmail, product: { id: productId } });
      setWishlistItems((prev) =>
        prev.filter((item) => (item.id || item._id) !== productId)
      );
    } catch (err) {
      console.error("Failed to remove item", err);
    }
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
                      onClick={() => handleRemoveFromWishlist(itemId)}
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

                    <button className="cart-btn">
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