import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStore } from "react-icons/fa";
import { FiPackage, FiUsers, FiTrendingUp, FiLogOut, FiSettings } from "react-icons/fi";
import "./SellerDashboard.css";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [sellerData, setSellerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if seller is logged in
    const session = localStorage.getItem("sellerSession");
    if (!session) {
      navigate("/seller/login");
      return;
    }

    setSellerData(JSON.parse(session));
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("sellerSession");
    localStorage.removeItem("sellerRememberMe");
    navigate("/seller/login");
  };

  if (loading) {
    return (
      <div className="seller-dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const stats = [
    { icon: FiPackage, label: "Total Orders", value: "156", color: "#EA6B8D" },
    { icon: FiTrendingUp, label: "Total Sales", value: "₹2.4L", color: "#D4A73A" },
    { icon: FiUsers, label: "Customers", value: "89", color: "#6B8AEA" },
    { icon: FaStore, label: "Products", value: "42", color: "#6BD48A" },
  ];

  return (
    <div className="seller-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Seller Dashboard</h1>
          <p>Welcome back, {sellerData?.storeName || "Seller"}</p>
        </div>
        <div className="header-right">
          <button className="header-btn" onClick={() => navigate("/seller/settings")}>
            <FiSettings />
            Settings
          </button>
          <button className="header-btn logout-btn" onClick={handleLogout}>
            <FiLogOut />
            Logout
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ color: stat.color }}>
              <stat.icon />
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="content-card">
          <h2>Recent Orders</h2>
          <div className="table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#ORD-001</td>
                  <td>Rahul Kumar</td>
                  <td>Rose Quartz Necklace</td>
                  <td>₹1,299</td>
                  <td><span className="status pending">Pending</span></td>
                </tr>
                <tr>
                  <td>#ORD-002</td>
                  <td>Priya Singh</td>
                  <td>Gold Earrings Set</td>
                  <td>₹2,499</td>
                  <td><span className="status processing">Processing</span></td>
                </tr>
                <tr>
                  <td>#ORD-003</td>
                  <td>Anita Devi</td>
                  <td>Pearl Bracelet</td>
                  <td>₹899</td>
                  <td><span className="status delivered">Delivered</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="content-card">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <button className="action-btn">
              <FiPackage />
              Add New Product
            </button>
            <button className="action-btn">
              <FiUsers />
              View Customers
            </button>
            <button className="action-btn">
              <FiTrendingUp />
              View Analytics
            </button>
            <button className="action-btn">
              <FiSettings />
              Store Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
