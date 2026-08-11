import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { getCustomerDashboardStats } from "../../api/customer";
import apiClient from "../../api/client";
import "./Dashboard.css";
import {
  FaArrowRight,
  FaGift,
  FaHeart,
  FaRegHeart,
  FaShoppingBag,
  FaStar,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";
import dashboardbanner from "../../assets/shop/hero-banner1.png";

const safeStoredJson = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};

function Dashboard() {
  const navigate = useNavigate();
  const { addToCart, wishlist, addToWishlist, removeFromWishlist } = useContext(ShopContext);
  const [userName, setUserName] = useState("User");
  const [stats, setStats] = useState({ totalOrders: "0", wishlistCount: "0", reviewsCount: "0", rewardPoints: "0", lastOrderDate: "" });
  const [orders, setOrders] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    const customerInfo = safeStoredJson("customerInfo");
    const user = customerInfo || safeStoredJson("userInfo") || safeStoredJson("user");

    const name = user?.fullName || user?.name || user?.username || `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
    if (name) setUserName(name);

    const loadDashboard = async () => {
      try {
        setLoading(true);
        const statsRes = await getCustomerDashboardStats();
        const data = statsRes?.data || statsRes || {};

        setStats({
          totalOrders: String(data.totalOrders ?? 0),
          wishlistCount: String(data.wishlistCount ?? 0),
          reviewsCount: String(data.reviewsCount ?? 0),
          rewardPoints: String(data.rewardPoints ?? 0),
          lastOrderDate: data.lastOrderDate || "",
        });

        setOrders(data.recentOrders || []);

        const recRes = await apiClient.get("/products/recommended");
        if (recRes.data?.success) {
          setRecommendations(recRes.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const isInWishlist = (productId) => {
    return wishlist?.some(
      (item) => String(item.product?.id || item.product?._id || item.id || item._id) === String(productId)
    );
  };

  const handleWishlistToggle = async (product) => {
    const prodId = product.id || product._id;
    if (isInWishlist(prodId)) {
      await removeFromWishlist(prodId);
      setToastMsg(`"${product.name}" removed from wishlist.`);
    } else {
      await addToWishlist(product);
      setToastMsg(`"${product.name}" added to wishlist!`);
    }
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setToastMsg(`"${product.name}" added to cart!`);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const statCards = [
    { icon: <FaShoppingBag />, title: "Total Orders", value: stats.totalOrders, subtitle: "Active orders" },
    { icon: <FaHeart />, title: "Wishlist", value: stats.wishlistCount, subtitle: "Items" },
    { icon: <FaStar />, title: "Reviews", value: stats.reviewsCount, subtitle: "Reviews" },
    { icon: <FaGift />, title: "Reward Points", value: stats.rewardPoints, subtitle: "Points" },
  ];

  const quickActions = [
    { icon: <FaShoppingBag />, label: "Shop Now", path: "/shop" },
    { icon: <FaHeart />, label: "Wishlist", path: "/dashboard/wishlist" },
    { icon: <FaTruck />, label: "Track Order", path: "/track-order" },
  ];

  return (
    <DashboardLayout>
      {toastMsg && (
        <div style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          backgroundColor: "#EF6F8F",
          color: "#fff",
          padding: "12px 20px",
          borderRadius: "8px",
          boxShadow: "0 4px 15px rgba(239, 111, 143, 0.3)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontWeight: "600",
          fontSize: "14px"
        }}>
          <FaCheckCircle /> {toastMsg}
        </div>
      )}

      <section className="dashboard-hero" style={{ backgroundImage: `url(${dashboardbanner})` }}>
        <div className="hero-content">
          <span className="hero-eyebrow">FASHION OASIS • MEMBER PERKS</span>
          <h2>Welcome back, {userName}! ✨</h2>
          <p>Here's what's happening with your Fashion Oasis account today.</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate("/shop")}><FaShoppingBag /> Continue Shopping</button>
          </div>
        </div>
      </section>

      <section className="dashboard-metrics">
        <div className="dashboard-cards">
          {statCards.map((item) => (
            <div className="card-box" key={item.title}>
              <div className="icon">{item.icon}</div>
              <h5>{item.title}</h5>
              <h2>{item.value}</h2>
              <span className="subtitle">{item.subtitle}</span>
            </div>
          ))}
        </div>
        <div className="quick-actions-card">
          <h5>Quick Actions</h5>
          <div className="quick-actions-grid">
            {quickActions.map((action) => (
              <button key={action.label} className="quick-action-btn" onClick={() => navigate(action.path)}>
                {action.icon}<span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="orders-card">
        <div className="orders-header">
          <h3>Recent Orders</h3>
          <button className="view-all-link" onClick={() => navigate("/dashboard/orders")}>View All <FaArrowRight /></button>
        </div>
        {loading ? (
          <p className="dashboard-empty-state">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="dashboard-empty-state">No recent orders found.</p>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="table-responsive desktop-orders-table">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.flatMap((order, orderIdx) => {
                    const orderItems = order.items && order.items.length > 0 ? order.items : [order];
                    return orderItems.map((item, itemIdx) => (
                      <tr key={`${order._id || order.id || orderIdx}-${itemIdx}`}>
                        <td>
                          <div className="product">
                            <img src={item.image || item.product?.image} alt={item.productName || item.name || "Product"} />
                            <div className="product-details">
                              <h6>{item.productName || item.name || item.product}</h6>
                              <span className="order-id">Order: {order.orderId || order.id} (Qty: {item.quantity || 1})</span>
                            </div>
                          </div>
                        </td>
                        <td>{order.date || (order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A")}</td>
                        <td><span className={`status ${order.status?.toLowerCase() || ""}`}>{order.status}</span></td>
                        <td className="amount">₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}</td>
                        <td><button className="view-details-btn" onClick={() => navigate("/dashboard/orders")}>View Details</button></td>
                      </tr>
                    ));
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Order Cards View */}
            <div className="mobile-orders-list">
              {orders.flatMap((order, orderIdx) => {
                const orderItems = order.items && order.items.length > 0 ? order.items : [order];
                return orderItems.map((item, itemIdx) => (
                  <div className="mobile-order-card" key={`mobile-${order._id || order.id || orderIdx}-${itemIdx}`}>
                    <div className="mobile-order-card-top">
                      <img
                        src={item.image || item.product?.image}
                        alt={item.productName || item.name || "Product"}
                        className="mobile-order-img"
                      />
                      <div className="mobile-order-info">
                        <span className={`status ${order.status?.toLowerCase() || ""}`}>
                          {order.status}
                        </span>
                        <h6 className="mobile-order-title">{item.productName || item.name || item.product}</h6>
                        <span className="mobile-order-meta">
                          ID: {order.orderId || order.id} • Qty: {item.quantity || 1}
                        </span>
                        <span className="mobile-order-date">
                          {order.date || (order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A")}
                        </span>
                      </div>
                    </div>
                    <div className="mobile-order-card-bottom">
                      <div className="mobile-order-price-wrap">
                        <span className="mobile-price-label">Total Amount</span>
                        <span className="mobile-order-price">₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}</span>
                      </div>
                      <button className="mobile-order-btn" onClick={() => navigate("/dashboard/orders")}>
                        View Details
                      </button>
                    </div>
                  </div>
                ));
              })}
            </div>
          </>
        )}
      </section>

      <section className="recommendations-section">
        <div className="section-header"><h3>Recommended For You</h3><button className="view-all-link" onClick={() => navigate("/shop")}>View All Products <FaArrowRight /></button></div>
        <div className="recommendations-grid">
          {loading ? <p className="dashboard-empty-state">Loading recommendations...</p> : recommendations.length === 0 ? <p className="dashboard-empty-state">No recommendations available right now.</p> : recommendations.map((product) => (
            <div className="recommendation-card" key={product.id || product._id}>
              <button
                className={`wishlist-btn ${isInWishlist(product.id || product._id) ? "active" : ""}`}
                onClick={() => handleWishlistToggle(product)}
                aria-label={`Wishlist ${product.name}`}
              >
                {isInWishlist(product.id || product._id) ? (
                  <FaHeart style={{ color: "#EF6F8F" }} />
                ) : (
                  <FaRegHeart />
                )}
              </button>
              <div className="img-wrapper"><img src={product.image} alt={product.name} /></div>
              <div className="recommendation-details">
                <span className="recommendation-material">{product.material}</span><h6>{product.name}</h6>
                <div className="rating"><span className="stars">★★★★★</span><span className="reviews-count">({product.reviewsCount || 0})</span></div>
                <div className="pricing"><span className="price">₹{product.price}</span>{product.originalPrice && <span className="original-price">₹{product.originalPrice}</span>}</div>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}><FaShoppingBag /> Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}

export default Dashboard;
