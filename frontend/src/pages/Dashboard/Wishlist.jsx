 import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import "./Wishlist.css";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { ShopContext } from "../../context/ShopContext";

function Wishlist() {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, addToCart } = useContext(ShopContext);

  const handleRemoveFromWishlist = async (item) => {
    const itemId = item.id || item._id;
    await removeFromWishlist(itemId);
  };

  const handleAddToCart = async (item) => {
    addToCart(item, 1);
    await handleRemoveFromWishlist(item);
    navigate("/cart");
  };

  return (
    <DashboardLayout>
      <div className="wishlist-page">
        <div className="wishlist-header">
          <h2>My Wishlist</h2>
          <p>Your favourite Fashion Oasis products.</p>
        </div>

        {(!wishlist || wishlist.length === 0) ? (
          <p style={{ textAlign: "center", padding: "40px" }}>
            Your wishlist is empty.
          </p>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((item) => {
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
                      Move To Cart
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