import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../../context/ShopContext";
import { getProfile, getOrders, getCustomerReviews } from "../../api/customer";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import "./Dashboard.css";
import {
  FaArrowRight,
  FaGift,
  FaHeart,
  FaRegHeart,
  FaShoppingBag,
  FaStar,
  FaTruck,
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
  const { addToCart, wishlist } = useContext(ShopContext);
  const [userName, setUserName] = useState("User");
  const [stats, setStats] = useState({ totalOrders: "0", wishlistCount: "0", reviewsCount: "0", rewardPoints: "0" });
  const [orders, setOrders] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const customerInfo = safeStoredJson("customerInfo");
    const user = customerInfo || safeStoredJson("userInfo") || safeStoredJson("user");
    const token = localStorage.getItem("token") || localStorage.getItem("authToken") || customerInfo?.token;
    const email = user?.email || localStorage.getItem("customerEmail");

    const name = user?.fullName || user?.name || user?.username || `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
    if (name) setUserName(name);

    const loadDashboard = async () => {
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      try {
        if (email) {
          const [profileRes, orderRes, reviewRes] = await Promise.all([
            getProfile().catch(() => null),
            getOrders(email).catch(() => null),
            getCustomerReviews().catch(() => null)
          ]);

          if (profileRes && profileRes.success) {
            const data = profileRes.data;
            if (data.firstName || data.lastName) {
              setUserName(`${data.firstName || ""} ${data.lastName || ""}`.trim());
            }
          }

          let fetchedOrders = [];
          if (orderRes && orderRes.success) {
            fetchedOrders = orderRes.orders || [];
          }

          let fetchedReviews = [];
          if (reviewRes && reviewRes.success) {
            fetchedReviews = reviewRes.data || [];
          }

          setStats({
            totalOrders: String(fetchedOrders.length),
            wishlistCount: String(wishlist?.length || 0),
            reviewsCount: String(fetchedReviews.length),
            rewardPoints: "0",
          });
          
          setOrders(fetchedOrders.slice(0, 5));
        }

        const response = await axios.get("http://localhost:5000/api/v1/products/recommended", config);
        if (response.data?.success) setRecommendations(response.data.data || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [wishlist]);

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
        <div className="table-responsive">
          {loading ? <p className="dashboard-empty-state">Loading orders...</p> : orders.length === 0 ? <p className="dashboard-empty-state">No recent orders found.</p> : (
            <table>
              <thead><tr><th>Product</th><th>Date</th><th>Status</th><th>Amount</th><th>Action</th></tr></thead>
              <tbody>
  {orders.flatMap((order, orderIdx) => {
    // If the order has multiple items, map each item. Otherwise fallback to the order itself.
    const orderItems = order.items && order.items.length > 0 ? order.items : [order];
    
    return orderItems.map((item, itemIdx) => (
      <tr key={`${order._id || orderIdx}-${itemIdx}`}>
        <td>
          <div className="product">
            <img src={item.image || item.product?.image} alt={item.productName || item.name || "Product"} />
            <div className="product-details">
              <h6>{item.productName || item.name || item.product}</h6>
              <span className="order-id">Order: {order.orderId || order.id} (Qty: {item.quantity})</span>
            </div>
          </div>
        </td>
        <td>{order.date || new Date(order.createdAt).toLocaleDateString()}</td>
        <td><span className={`status ${order.status?.toLowerCase() || ""}`}>{order.status}</span></td>
        <td className="amount">₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}</td>
        <td><button className="view-details-btn" onClick={() => navigate(`/dashboard/orders`)}>View Details</button></td>
      </tr>
    ));
  })}
</tbody>
            </table>
          )}
        </div>
      </section>

      <section className="recommendations-section">
        <div className="section-header"><h3>Recommended For You</h3><button className="view-all-link" onClick={() => navigate("/shop")}>View All Products <FaArrowRight /></button></div>
        <div className="recommendations-grid">
          {loading ? <p className="dashboard-empty-state">Loading recommendations...</p> : recommendations.length === 0 ? <p className="dashboard-empty-state">No recommendations available right now.</p> : recommendations.map((product) => (
            <div className="recommendation-card" key={product.id || product._id}>
              <button className="wishlist-btn" aria-label={`Add ${product.name} to wishlist`}><FaRegHeart /></button>
              <div className="img-wrapper"><img src={product.image} alt={product.name} /></div>
              <div className="recommendation-details">
                <span className="recommendation-material">{product.material}</span><h6>{product.name}</h6>
                <div className="rating"><span className="stars">★★★★★</span><span className="reviews-count">({product.reviewsCount || 0})</span></div>
                <div className="pricing"><span className="price">₹{product.price}</span>{product.originalPrice && <span className="original-price">₹{product.originalPrice}</span>}</div>
                <button className="add-to-cart-btn" onClick={() => addToCart(product)}><FaShoppingBag /> Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}

export default Dashboard;
