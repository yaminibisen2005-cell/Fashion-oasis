import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBoxOpen, FaShoppingBag, FaRupeeSign, FaUsers, FaArrowUp } from "react-icons/fa";

const API = "http://localhost:5000/api/v1/admin/dashboard";

const DashboardSection = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const [customerOverview, setCustomerOverview] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLoading(false);
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch(`${API}/stats`, { headers }).then((r) => r.json()),
      fetch(`${API}/recent-orders?limit=4`, { headers }).then((r) => r.json()),
      fetch(`${API}/top-products?limit=4`, { headers }).then((r) => r.json()),
      fetch(`${API}/top-customers?limit=4`, { headers }).then((r) => r.json()),
      fetch(`${API}/sales-analytics?range=7days`, { headers }).then((r) => r.json()),
    ])
      .then(([statsRes, ordersRes, productsRes, customersRes, salesRes]) => {
        if (statsRes.success) setStats(statsRes.data);
        if (ordersRes.success) setRecentOrders(ordersRes.data);
        if (productsRes.success) setTopSelling(productsRes.data);
        if (customersRes.success) setCustomerOverview(customersRes.data);
        if (salesRes.success) setSalesData(salesRes.data.series || []);
      })
      .catch((err) => {
        console.error("Failed to load dashboard data:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Compute dynamic SVG points from salesData
  const svgW = 480, svgH = 210, padL = 50, padT = 30, padB = 30;
  const chartW = svgW - padL;
  const chartH = svgH - padT - padB;
  const maxSales = salesData.length > 0 ? Math.max(...salesData.map((d) => d.sales), 1) : 1;

  const toPoint = (i, sales) => {
    const x = padL + (i / Math.max(salesData.length - 1, 1)) * chartW;
    const y = padT + chartH - (sales / maxSales) * chartH;
    return { x, y };
  };

  const points = salesData.map((d, i) => toPoint(i, d.sales));
  const linePath = points.length > 1
    ? `M ${points[0].x} ${points[0].y} ` +
      points.slice(1).map((p) => `L ${p.x} ${p.y}`).join(" ")
    : null;
  const areaPath = linePath
    ? `${linePath} L ${points[points.length - 1].x} ${svgH - padB} L ${points[0].x} ${svgH - padB} Z`
    : null;

  // Bar chart from salesData (revenue overview)
  const barChartH = 100;
  const barMaxSales = salesData.length > 0 ? Math.max(...salesData.map((d) => d.sales), 1) : 1;
  const barSpacing = salesData.length > 0 ? 240 / salesData.length : 30;
  const barW = Math.min(barSpacing * 0.5, 16);

  if (loading) {
    return (
      <div className="admin-dashboard-view" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300 }}>
        <p style={{ color: "#8E7A6B", fontSize: 16 }}>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-view">
      <div className="section-title-row">
        <div>
          <h2>Welcome back, Admin 👋</h2>
          <p className="subtitle">Here's what's happening with your store today.</p>
        </div>
        <div className="date-picker-box">
          <span>📅 {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards-grid">
        <div className="summary-card">
          <div className="card-top">
            <div>
              <span>Total Products</span>
              <h3>{stats?.totalProducts ?? "0"}</h3>
            </div>
            <div className="card-icon-circle"><FaBoxOpen /></div>
          </div>
          <div className="card-trend upward">
            <FaArrowUp /> {stats?.productsTrend ?? 0}% <span className="trend-lbl">from last month</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-top">
            <div>
              <span>Total Orders</span>
              <h3>{stats?.totalOrders ?? "0"}</h3>
            </div>
            <div className="card-icon-circle"><FaShoppingBag /></div>
          </div>
          <div className="card-trend upward">
            <FaArrowUp /> {stats?.ordersTrend ?? 0}% <span className="trend-lbl">from last month</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-top">
            <div>
              <span>Total Revenue</span>
              <h3>₹{stats?.totalRevenue != null ? Number(stats.totalRevenue).toLocaleString() : "0"}</h3>
            </div>
            <div className="card-icon-circle"><FaRupeeSign /></div>
          </div>
          <div className="card-trend upward">
            <FaArrowUp /> {stats?.revenueTrend ?? 0}% <span className="trend-lbl">from last month</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-top">
            <div>
              <span>Total Customers</span>
              <h3>{stats?.totalCustomers != null ? Number(stats.totalCustomers).toLocaleString() : "0"}</h3>
            </div>
            <div className="card-icon-circle"><FaUsers /></div>
          </div>
          <div className="card-trend upward">
            <FaArrowUp /> {stats?.customersTrend ?? 0}% <span className="trend-lbl">from last month</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="dashboard-charts-row">
        {/* Sales Overview Line Chart — driven by salesData */}
        <div className="chart-card sales-overview-chart">
          <div className="chart-header">
            <h3>Sales Overview</h3>
            <span className="chart-range">Last 7 Days ▾</span>
          </div>
          <div className="svg-chart-container">
            <svg viewBox="0 0 530 240" width="100%" height="100%">
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EF6F8F" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#EF6F8F" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <line x1="48" y1="30" x2="510" y2="30" stroke="#F5ECEF" strokeWidth="1" />
              <line x1="48" y1="80" x2="510" y2="80" stroke="#F5ECEF" strokeWidth="1" />
              <line x1="48" y1="130" x2="510" y2="130" stroke="#F5ECEF" strokeWidth="1" />
              <line x1="48" y1="180" x2="510" y2="180" stroke="#F5ECEF" strokeWidth="1" />

              {salesData.length > 0 ? (
                <>
                  {areaPath && <path d={areaPath} fill="url(#salesGrad)" />}
                  {linePath && (
                    <path d={linePath} fill="none" stroke="#EF6F8F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  )}
                  {points.map((p, i) => (
                    <g key={i}>
                      <circle cx={p.x} cy={p.y} r="5" fill="#EF6F8F" stroke="#fff" strokeWidth="2" />
                      <text x={p.x} y={svgH - padB + 14} textAnchor="middle" fill="#8E7A6B" fontSize="9">
                        {salesData[i].date}
                      </text>
                    </g>
                  ))}
                </>
              ) : (
                <text x="265" y="120" textAnchor="middle" fill="#C7A8B4" fontSize="13">
                  No sales data for the last 7 days
                </text>
              )}
            </svg>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="chart-card recent-orders-card">
          <div className="chart-header">
            <h3>Recent Orders</h3>
            <Link to="/admin/orders" className="view-all-link">View All</Link>
          </div>
          <div className="recent-orders-list">
            {recentOrders.length === 0 ? (
              <p style={{ color: "#C7A8B4", textAlign: "center", padding: "20px 0" }}>No orders yet</p>
            ) : (
              recentOrders.slice(0, 4).map((order, idx) => (
                <div className="recent-order-item" key={order._id || idx}>
                  <div className="order-item-prod">
                    <div className="order-prod-thumb"><span>💍</span></div>
                    <div>
                      <h4>#{order.orderId}</h4>
                      <p>{order.customer?.name || order.customerName}</p>
                    </div>
                  </div>
                  <span className="order-time">
                    {new Date(order.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                  <span className={`status-badge-inline ${order.status.toLowerCase()}`}>{order.status}</span>
                  <span className="order-amt">₹{Number(order.totalAmount).toLocaleString()}</span>
                </div>
              ))
            )}
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
            {topSelling.length === 0 ? (
              <p style={{ color: "#C7A8B4", textAlign: "center", padding: "20px 0" }}>No products yet</p>
            ) : (
              topSelling.map((prod, idx) => (
                <div className="list-item" key={prod._id || idx}>
                  <div className="item-left">
                    <img src={prod.image} alt={prod.name} />
                    <div>
                      <h4>{prod.name}</h4>
                      <p>{prod.totalSold} sold</p>
                    </div>
                  </div>
                  <strong className="item-price">₹{Number(prod.totalRevenue).toLocaleString()}</strong>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Customers Overview */}
        <div className="list-card">
          <div className="list-card-header">
            <h3>Customers Overview</h3>
            <Link to="/admin/customers" className="view-all-link">View All</Link>
          </div>
          <div className="dashboard-list">
            {customerOverview.length === 0 ? (
              <p style={{ color: "#C7A8B4", textAlign: "center", padding: "20px 0" }}>No customers yet</p>
            ) : (
              customerOverview.map((cust, idx) => (
                <div className="list-item" key={cust._id || idx}>
                  <div className="item-left">
                    <img src={cust.img} alt={cust.name} className="avatar" />
                    <div>
                      <h4>{cust.name}</h4>
                      <p>Orders: {cust.orders}</p>
                    </div>
                  </div>
                  <strong className="item-price text-pink">₹{Number(cust.spent).toLocaleString()}</strong>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Revenue Overview Bar Chart — driven by salesData */}
        <div className="list-card">
          <div className="list-card-header">
            <h3>Revenue Overview</h3>
            <span className="chart-range">Last 7 Days ▾</span>
          </div>
          <div className="revenue-summary">
            <h4>₹{stats?.totalRevenue != null ? Number(stats.totalRevenue).toLocaleString() : "0"}</h4>
            <span className="text-success"><FaArrowUp /> {stats?.revenueTrend ?? 0}% from last 7 days</span>
          </div>
          <div className="svg-chart-container bars-chart">
            <svg viewBox="0 0 250 120" width="100%" height="100%">
              {salesData.length === 0 ? (
                <text x="125" y="65" textAnchor="middle" fill="#C7A8B4" fontSize="11">No data</text>
              ) : (
                salesData.map((d, i) => {
                  const barH = Math.max((d.sales / barMaxSales) * barChartH, 2);
                  const x = 15 + i * barSpacing + (barSpacing - barW) / 2;
                  const y = barChartH + 10 - barH;
                  return (
                    <g key={i}>
                      <rect x={x} y={y} width={barW} height={barH} fill="#EF6F8F" rx="3" />
                      <text x={x + barW / 2} y="115" textAnchor="middle" fill="#8E7A6B" fontSize="6">
                        {d.date.replace(/[a-z]/g, "").trim().slice(0, 3)}
                      </text>
                    </g>
                  );
                })
              )}
              <line x1="10" y1="110" x2="240" y2="110" stroke="#F5ECEF" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
