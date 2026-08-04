import React from "react";
import { Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaShoppingBag,
  FaRupeeSign,
  FaUsers,
  FaArrowUp,
  FaEye,
} from "react-icons/fa";

const DashboardSection = ({ products, orders, customers }) => {
  // Hardcoded values from screenshot summary:
  // Products: 250 (+12.5%)
  // Orders: 890 (+8.3%)
  // Revenue: 8,95,000 (+15.7%)
  // Customers: 1,200 (+10.2%)

  // Top Selling Products data
  const topSelling = [
    { name: "Floral Diamond Necklace", sold: 120, revenue: 240000, img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=100&q=80" },
    { name: "Gold Plated Earrings", sold: 96, revenue: 135000, img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=100&q=80" },
    { name: "Pearl Drop Earrings", sold: 85, revenue: 127500, img: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=100&q=80" },
    { name: "Classic Gold Ring", sold: 74, revenue: 86000, img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100&q=80" },
  ];

  // Customers Overview data
  const customerOverview = [
    { name: "Priya Sharma", orders: 8, spent: 15890, img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80" },
    { name: "Ananya Verma", orders: 5, spent: 8750, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80" },
    { name: "Neha Kapoor", orders: 7, spent: 12450, img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80" },
    { name: "Ritika Singh", orders: 3, spent: 6250, img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&q=80" },
  ];

  return (
    <div className="admin-dashboard-view">
      <div className="section-title-row">
        <div>
          <h2>Welcome back, Admin 👋</h2>
          <p className="subtitle">Here's what's happening with your store today.</p>
        </div>
        <div className="date-picker-box">
          <span>📅 18 May, 2024</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards-grid">
        <div className="summary-card">
          <div className="card-top">
            <div>
              <span>Total Products</span>
              <h3>250</h3>
            </div>
            <div className="card-icon-circle">
              <FaBoxOpen />
            </div>
          </div>
          <div className="card-trend upward">
            <FaArrowUp /> 12.5% <span className="trend-lbl">from last month</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-top">
            <div>
              <span>Total Orders</span>
              <h3>890</h3>
            </div>
            <div className="card-icon-circle">
              <FaShoppingBag />
            </div>
          </div>
          <div className="card-trend upward">
            <FaArrowUp /> 8.3% <span className="trend-lbl">from last month</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-top">
            <div>
              <span>Total Revenue</span>
              <h3>₹8,95,000</h3>
            </div>
            <div className="card-icon-circle">
              <FaRupeeSign />
            </div>
          </div>
          <div className="card-trend upward">
            <FaArrowUp /> 15.7% <span className="trend-lbl">from last month</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-top">
            <div>
              <span>Total Customers</span>
              <h3>1,200</h3>
            </div>
            <div className="card-icon-circle">
              <FaUsers />
            </div>
          </div>
          <div className="card-trend upward">
            <FaArrowUp /> 10.2% <span className="trend-lbl">from last month</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="dashboard-charts-row">
        {/* Sales Overview Line Chart */}
        <div className="chart-card sales-overview-chart">
          <div className="chart-header">
            <h3>Sales Overview</h3>
            <span className="chart-range">Last 7 Days ▾</span>
          </div>
          <div className="svg-chart-container">
            {/* Inline SVG Chart */}
            <svg viewBox="0 0 500 220" width="100%" height="100%">
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EF6F8F" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#EF6F8F" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              
              {/* Horizontal Grid lines */}
              <line x1="40" y1="30" x2="480" y2="30" stroke="#F5ECEF" strokeWidth="1" />
              <line x1="40" y1="75" x2="480" y2="75" stroke="#F5ECEF" strokeWidth="1" />
              <line x1="40" y1="120" x2="480" y2="120" stroke="#F5ECEF" strokeWidth="1" />
              <line x1="40" y1="165" x2="480" y2="165" stroke="#F5ECEF" strokeWidth="1" />

              {/* Y Axis Labels */}
              <text x="30" y="35" textAnchor="end" fill="#8E7A6B" fontSize="10">2,00,000</text>
              <text x="30" y="80" textAnchor="end" fill="#8E7A6B" fontSize="10">1,50,000</text>
              <text x="30" y="125" textAnchor="end" fill="#8E7A6B" fontSize="10">1,00,000</text>
              <text x="30" y="170" textAnchor="end" fill="#8E7A6B" fontSize="10">50,000</text>
              <text x="30" y="210" textAnchor="end" fill="#8E7A6B" fontSize="10">0</text>

              {/* Line graph coordinates */}
              {/* May 12: 120, May 13: 160, May 14: 90, May 15: 140, May 16: 120, May 17: 60, May 18: 40 */}
              <path
                d="M 50 170 Q 110 135 120 125 T 190 145 T 260 95 T 330 115 T 400 65 T 470 45"
                fill="none"
                stroke="#EF6F8F"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Area under the line */}
              <path
                d="M 50 170 Q 110 135 120 125 T 190 145 T 260 95 T 330 115 T 400 65 T 470 45 L 470 210 L 50 210 Z"
                fill="url(#salesGrad)"
              />

              {/* Data points */}
              <circle cx="50" cy="170" r="5" fill="#EF6F8F" stroke="#fff" strokeWidth="2" />
              <circle cx="120" cy="125" r="5" fill="#EF6F8F" stroke="#fff" strokeWidth="2" />
              <circle cx="190" cy="145" r="5" fill="#EF6F8F" stroke="#fff" strokeWidth="2" />
              <circle cx="260" cy="95" r="5" fill="#EF6F8F" stroke="#fff" strokeWidth="2" />
              <circle cx="330" cy="115" r="5" fill="#EF6F8F" stroke="#fff" strokeWidth="2" />
              <circle cx="400" cy="65" r="5" fill="#EF6F8F" stroke="#fff" strokeWidth="2" />
              <circle cx="470" cy="45" r="5" fill="#EF6F8F" stroke="#fff" strokeWidth="2" />

              {/* X Axis Labels */}
              <text x="50" y="210" textAnchor="middle" fill="#8E7A6B" fontSize="9">May 12</text>
              <text x="120" y="210" textAnchor="middle" fill="#8E7A6B" fontSize="9">May 13</text>
              <text x="190" y="210" textAnchor="middle" fill="#8E7A6B" fontSize="9">May 14</text>
              <text x="260" y="210" textAnchor="middle" fill="#8E7A6B" fontSize="9">May 15</text>
              <text x="330" y="210" textAnchor="middle" fill="#8E7A6B" fontSize="9">May 16</text>
              <text x="400" y="210" textAnchor="middle" fill="#8E7A6B" fontSize="9">May 17</text>
              <text x="470" y="210" textAnchor="middle" fill="#8E7A6B" fontSize="9">May 18</text>
            </svg>
          </div>
        </div>

        {/* Recent Orders List inside dashboard */}
        <div className="chart-card recent-orders-card">
          <div className="chart-header">
            <h3>Recent Orders</h3>
            <Link to="/admin/orders" className="view-all-link">View All</Link>
          </div>
          <div className="recent-orders-list">
            {orders.slice(0, 4).map((order) => (
              <div className="recent-order-item" key={order.id}>
                <div className="order-item-prod">
                  <div className="order-prod-thumb">
                    <span>💍</span>
                  </div>
                  <div>
                    <h4>#{order.id}</h4>
                    <p>{order.customer}</p>
                  </div>
                </div>
                <span className="order-time">{order.date}</span>
                <span className={`status-badge-inline ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
                <span className="order-amt">₹{order.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of lists */}
      <div className="dashboard-grids-row">
        {/* Top Selling Products */}
        <div className="list-card">
          <div className="list-card-header">
            <h3>Top Selling Products</h3>
            <Link to="/admin/products" className="view-all-link">View All</Link>
          </div>
          <div className="dashboard-list">
            {topSelling.map((prod, idx) => (
              <div className="list-item" key={idx}>
                <div className="item-left">
                  <img src={prod.img} alt={prod.name} />
                  <div>
                    <h4>{prod.name}</h4>
                    <p>{prod.sold} sold</p>
                  </div>
                </div>
                <strong className="item-price">₹{prod.revenue.toLocaleString()}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Customers Overview */}
        <div className="list-card">
          <div className="list-card-header">
            <h3>Customers Overview</h3>
            <Link to="/admin/customers" className="view-all-link">View All</Link>
          </div>
          <div className="dashboard-list">
            {customerOverview.map((cust, idx) => (
              <div className="list-item" key={idx}>
                <div className="item-left">
                  <img src={cust.img} alt={cust.name} className="avatar" />
                  <div>
                    <h4>{cust.name}</h4>
                    <p>Orders: {cust.orders}</p>
                  </div>
                </div>
                <strong className="item-price text-pink">₹{cust.spent.toLocaleString()}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Overview bar chart */}
        <div className="list-card">
          <div className="list-card-header">
            <h3>Revenue Overview</h3>
            <span className="chart-range">Last 7 Days ▾</span>
          </div>
          <div className="revenue-summary">
            <h4>₹8,95,000</h4>
            <span className="text-success"><FaArrowUp /> 15.7% from last 7 days</span>
          </div>
          <div className="svg-chart-container bars-chart">
            <svg viewBox="0 0 250 120" width="100%" height="100%">
              {/* Bars: coordinates */}
              <rect x="25" y="80" width="12" height="40" fill="#EF6F8F" rx="3" />
              <rect x="55" y="60" width="12" height="60" fill="#EF6F8F" rx="3" />
              <rect x="85" y="90" width="12" height="30" fill="#EF6F8F" rx="3" />
              <rect x="115" y="70" width="12" height="50" fill="#EF6F8F" rx="3" />
              <rect x="145" y="50" width="12" height="70" fill="#EF6F8F" rx="3" />
              <rect x="175" y="30" width="12" height="90" fill="#EF6F8F" rx="3" />
              <rect x="205" y="20" width="12" height="100" fill="#EF6F8F" rx="3" />

              {/* Grid line at bottom */}
              <line x1="15" y1="120" x2="235" y2="120" stroke="#F5ECEF" strokeWidth="1" />

              {/* Labels */}
              <text x="31" y="115" textAnchor="middle" fill="#fff" fontSize="6">M12</text>
              <text x="61" y="115" textAnchor="middle" fill="#fff" fontSize="6">M13</text>
              <text x="91" y="115" textAnchor="middle" fill="#fff" fontSize="6">M14</text>
              <text x="121" y="115" textAnchor="middle" fill="#fff" fontSize="6">M15</text>
              <text x="151" y="115" textAnchor="middle" fill="#fff" fontSize="6">M16</text>
              <text x="181" y="115" textAnchor="middle" fill="#fff" fontSize="6">M17</text>
              <text x="211" y="115" textAnchor="middle" fill="#fff" fontSize="6">M18</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
