  import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import "./Dashboard.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  FaShoppingBag,
  FaHeart,
  FaStar,
  FaGift,
  FaRegHeart,
  FaTruck,
  FaArrowRight,
} from "react-icons/fa";

import dashboardbanner from "../../assets/shop/hero-banner1.png";

function Dashboard() {
  const [userName, setUserName] = useState("User");
  const [stats, setStats] = useState({
    totalOrders: "0",
    wishlistCount: "0",
    reviewsCount: "0",
    rewardPoints: "0",
  });
  const [orders, setOrders] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check all potential storage keys for token and user data
    const token = 
      localStorage.getItem("token") || 
      localStorage.getItem("authToken") || 
      JSON.parse(localStorage.getItem("customerInfo"))?.token;

    // if (!token) {
    //   window.location.href = "/login";
    //   return;
    // }

    // 2. Extract user details robustly from any matching storage key
  const storedUser = 
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(localStorage.getItem("customerInfo")) || 
      JSON.parse(localStorage.getItem("userInfo"));
    if (storedUser) {
      const resolvedName = 
        storedUser.fullName || 
        storedUser.name || 
        storedUser.username || 
        `${storedUser.firstName || ""} ${storedUser.lastName || ""}`.trim();

      if (resolvedName) {
        setUserName(resolvedName);
      }
    }

    // 3. Fetch dashboard data from backend
    const fetchDashboardData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const email = storedUser?.email;
        if (email) {
          const profileRes = await axios.get(`http://localhost:5000/api/v1/customer/profile?email=${email}`, config);
          if (profileRes.data.success && profileRes.data.data) {
            const data = profileRes.data.data;
            setStats({
              totalOrders: data.totalOrders?.toString() || "0",
              wishlistCount: data.wishlist?.length?.toString() || "0",
              reviewsCount: data.reviewsCount?.toString() || "0",
              rewardPoints: data.rewardPoints?.toString() || "0",
            });
            setOrders(data.recentOrders || []);
          }
        }

        const prodRes = await axios.get("http://localhost:5000/api/v1/products/recommended", config);
        if (prodRes.data.success) {
          setRecommendations(prodRes.data.data || []);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        if (err.response?.status === 401) {
          localStorage.clear();
          window.location.href = "/login";
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCardsData = [
    {
      icon: <FaShoppingBag />,
      title: "Total Orders",
      value: stats.totalOrders,
      subtitle: "Active orders",
    },
    {
      icon: <FaHeart />,
      title: "Wishlist",
      value: stats.wishlistCount,
      subtitle: "Items",
    },
    {
      icon: <FaStar />,
      title: "Reviews",
      value: stats.reviewsCount,
      subtitle: "Reviews",
    },
    {
      icon: <FaGift />,
      title: "Reward Points",
      value: stats.rewardPoints,
      subtitle: "Points",
    },
  ];

  const quickActions = [
    { icon: <FaShoppingBag />, label: "Shop Now" },
    { icon: <FaHeart />, label: "Wishlist" },
    { icon: <FaTruck />, label: "Track Order" },
    { icon: <FaGift />, label: "Rewards" },
  ];

  return (
    <>
      <DashboardLayout>
        {/* HERO SECTION */}
        <div className="dashboard-header-text"></div>

        <section
          className="dashboard-hero"
          style={{ backgroundImage: `url(${dashboardbanner})` }}
        >
          <div className="hero-content">
            <span className="hero-eyebrow">FASHION OASIS • MEMBER PERKS</span>

            <h2>Welcome back, {userName}!✨</h2>
            <p>Here's what's happening with your Fashion Oasis account today.</p>

            <div className="hero-actions">
              <button className="btn-primary" onClick={() => window.location.href = "/shop"}>
                <FaShoppingBag />
                Continue Shopping
              </button>
            </div>
          </div>
        </section>

        {/* STATS & QUICK ACTIONS SECTION */}
        <section className="dashboard-metrics">
          <div className="dashboard-cards">
            {statCardsData.map((item, index) => (
              <div className="card-box" key={index}>
                <div className="icon">{item.icon}</div>
                <h5>{item.title}</h5>
                <h2>{item.value}</h2>
                <span className="subtitle">
                  {item.subtitle}
                </span>
              </div>
            ))}
          </div>

          {/* QUICK ACTIONS PANEL */}
          <div className="quick-actions-card">
            <h5>Quick Actions</h5>
            <div className="quick-actions-grid">
              {quickActions.map((action, index) => (
                <button key={index} className="quick-action-btn">
                  {action.icon}
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* RECENT ORDERS */}
        <section className="orders-card">
          <div className="orders-header">
            <div>
              <h3>Recent Orders</h3>
            </div>
            <button className="view-all-link">
              View All <FaArrowRight />
            </button>
          </div>

          <div className="table-responsive">
            {orders.length === 0 ? (
              <p style={{ padding: "30px", textAlign: "center", color: "#888" }}>
                {loading ? "Loading orders..." : "No recent orders found."}
              </p>
            ) : (
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
                  {orders.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div className="product">
                          <img src={item.image} alt={item.product} />
                          <div className="product-details">
                            <h6>{item.product}</h6>
                            <span className="order-id">{item.id}</span>
                          </div>
                        </div>
                      </td>
                      <td>{item.date}</td>
                      <td>
                        <span
                          className={`status ${item.status?.toLowerCase()}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="amount">{item.amount}</td>
                      <td>
                        <button className="view-details-btn">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* RECOMMENDED FOR YOU */}
        <section className="recommendations-section">
          <div className="section-header">
            <h3>Recommended For You</h3>
            <button className="view-all-link">
              View All Products <FaArrowRight />
            </button>
          </div>

          <div className="recommendations-grid">
            {recommendations.length === 0 ? (
              <p style={{ padding: "30px", textAlign: "center", color: "#888", gridColumn: "1 / -1" }}>
                {loading ? "Loading recommendations..." : "No recommendations available right now."}
              </p>
            ) : (
              recommendations.map((prod) => (
                <div className="recommendation-card" key={prod.id || prod._id}>
                  <button className="wishlist-btn">
                    <FaRegHeart />
                  </button>
                  <div className="img-wrapper">
                    <img src={prod.image} alt={prod.name} />
                  </div>
                  <div className="recommendation-details">
                    <span className="recommendation-material">{prod.material}</span>
                    <h6>{prod.name}</h6>
                    <div className="rating">
                      <span className="stars">★★★★★</span>
                      <span className="reviews-count">({prod.reviewsCount || 0})</span>
                    </div>
                    <div className="pricing">
                      <span className="price">₹{prod.price}</span>
                      {prod.originalPrice && (
                        <span className="original-price">₹{prod.originalPrice}</span>
                      )}
                    </div>
                    <button className="add-to-cart-btn">
                      <FaShoppingBag /> Add to Cart
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </DashboardLayout>
    </>
  );
}

export default Dashboard;