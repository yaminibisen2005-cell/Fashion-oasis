import React, { useState } from "react";
import {
  FaChartPie,
  FaBox,
  FaShoppingCart,
  FaStar,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaBoxOpen,
  FaShoppingBag,
  FaRupeeSign,
  FaArrowUp,
  FaPlus,
  FaTrash,
  FaCheck,
  FaFilter,
  FaAngleDown,
  FaUserAlt,
  FaUpload,
  FaArrowLeft,
  FaCalendarAlt,
  FaStore,
} from "react-icons/fa";

import "../Admin/AdminLayout.css";


const INITIAL_PRODUCTS = [
  { id: 1, name: "Floral Diamond Necklace", category: "Necklace", price: 240000, stock: 25, status: "Active", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&q=80" },
  { id: 2, name: "Gold Plated Earrings", category: "Earrings", price: 135000, stock: 40, status: "Active", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&q=80" },
  { id: 3, name: "Pearl Drop Earrings", category: "Earrings", price: 127500, stock: 35, status: "Active", image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=200&q=80" },
  { id: 4, name: "Classic Gold Ring", category: "Rings", price: 86000, stock: 20, status: "Inactive", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&q=80" },
];

const INITIAL_ORDERS = [
  { id: "2045", customer: "Priya Sharma", date: "18 May, 2024", amount: 12450, status: "Pending" },
  { id: "2044", customer: "Ananya Verma", date: "18 May, 2024", amount: 8750, status: "Processing" },
  { id: "2043", customer: "Neha Kapoor", date: "17 May, 2024", amount: 15800, status: "Shipped" },
  { id: "2042", customer: "Ritika Singh", date: "17 May, 2024", amount: 6250, status: "Delivered" },
  { id: "2041", customer: "Sneha Patel", date: "16 May, 2024", amount: 9200, status: "Delivered" },
];

const INITIAL_REVIEWS = [
  { customer: "Priya Sharma", product: "Floral Diamond Necklace", rating: 5, review: "Beautiful design and excellent craftsmanship!", status: "Approved" },
  { customer: "Ananya Verma", product: "Gold Plated Earrings", rating: 5, review: "Very elegant, perfect for occasions.", status: "Approved" },
  { customer: "Neha Kapoor", product: "Pearl Drop Earrings", rating: 4, review: "Loved the finish, delivery was quick.", status: "Approved" },
  { customer: "Ritika Singh", product: "Classic Gold Ring", rating: 5, review: "Perfect fit and stunning look.", status: "Pending" },
];

const SALES_DATA = [
  { date: "12 May", sales: 18500 },
  { date: "13 May", sales: 22000 },
  { date: "14 May", sales: 15800 },
  { date: "15 May", sales: 28400 },
  { date: "16 May", sales: 21000 },
  { date: "17 May", sales: 32500 },
  { date: "18 May", sales: 26800 },
];

const TOP_SELLING = [
  { name: "Floral Diamond Necklace", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=80&q=80", sold: 42, revenue: 10080000 },
  { name: "Gold Plated Earrings", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=80&q=80", sold: 38, revenue: 5130000 },
  { name: "Pearl Drop Earrings", image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=80&q=80", sold: 31, revenue: 3952500 },
  { name: "Classic Gold Ring", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=80&q=80", sold: 24, revenue: 2064000 },
];



const SellerDashboardHome = ({ products, orders }) => {
  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
  const svgW = 480, svgH = 210, padL = 50, padT = 30, padB = 30;
  const chartW = svgW - padL;
  const chartH = svgH - padT - padB;
  const maxSales = Math.max(...SALES_DATA.map((d) => d.sales), 1);

  const toPoint = (i, sales) => {
    const x = padL + (i / Math.max(SALES_DATA.length - 1, 1)) * chartW;
    const y = padT + chartH - (sales / maxSales) * chartH;
    return { x, y };
  };

  const points = SALES_DATA.map((d, i) => toPoint(i, d.sales));
  const linePath = points.length > 1
    ? `M ${points[0].x} ${points[0].y} ` + points.slice(1).map((p) => `L ${p.x} ${p.y}`).join(" ")
    : null;
  const areaPath = linePath
    ? `${linePath} L ${points[points.length - 1].x} ${svgH - padB} L ${points[0].x} ${svgH - padB} Z`
    : null;

  const barChartH = 100;
  const barMaxSales = Math.max(...SALES_DATA.map((d) => d.sales), 1);
  const barSpacing = 240 / SALES_DATA.length;
  const barW = Math.min(barSpacing * 0.5, 16);

  return (
    <div className="admin-dashboard-view fade-in">
      <div className="section-title-row">
        <div>
          <h2>Welcome back, Seller 👋</h2>
          <p className="subtitle">Here's how your store is performing today.</p>
        </div>
        <div className="date-picker-box">
          <span>📅 {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
        </div>
      </div>

      <div className="summary-cards-grid">
        <div className="summary-card">
          <div className="card-top">
            <div>
              <span>My Products</span>
              <h3>{products.length}</h3>
            </div>
            <div className="card-icon-circle"><FaBoxOpen /></div>
          </div>
          <div className="card-trend upward">
            <FaArrowUp /> 12% <span className="trend-lbl">from last month</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-top">
            <div>
              <span>Total Orders</span>
              <h3>{orders.length}</h3>
            </div>
            <div className="card-icon-circle"><FaShoppingBag /></div>
          </div>
          <div className="card-trend upward">
            <FaArrowUp /> 8.5% <span className="trend-lbl">from last month</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-top">
            <div>
              <span>Total Earnings</span>
              <h3>₹{totalRevenue.toLocaleString()}</h3>
            </div>
            <div className="card-icon-circle"><FaRupeeSign /></div>
          </div>
          <div className="card-trend upward">
            <FaArrowUp /> 15.2% <span className="trend-lbl">from last month</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-top">
            <div>
              <span>Store Rating</span>
              <h3>4.8</h3>
            </div>
            <div className="card-icon-circle"><FaStar /></div>
          </div>
          <div className="card-trend upward">
            <FaArrowUp /> 0.3 <span className="trend-lbl">from last month</span>
          </div>
        </div>
      </div>

      <div className="dashboard-charts-row">
        <div className="chart-card sales-overview-chart">
          <div className="chart-header">
            <h3>Sales Overview</h3>
            <span className="chart-range">Last 7 Days ▾</span>
          </div>
          <div className="svg-chart-container">
            <svg viewBox="0 0 530 240" width="100%" height="100%">
              <defs>
                <linearGradient id="sellerSalesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EF6F8F" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#EF6F8F" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <line x1="48" y1="30" x2="510" y2="30" stroke="#F5ECEF" strokeWidth="1" />
              <line x1="48" y1="80" x2="510" y2="80" stroke="#F5ECEF" strokeWidth="1" />
              <line x1="48" y1="130" x2="510" y2="130" stroke="#F5ECEF" strokeWidth="1" />
              <line x1="48" y1="180" x2="510" y2="180" stroke="#F5ECEF" strokeWidth="1" />
              {areaPath && <path d={areaPath} fill="url(#sellerSalesGrad)" />}
              {linePath && (
                <path d={linePath} fill="none" stroke="#EF6F8F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              )}
              {points.map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="5" fill="#EF6F8F" stroke="#fff" strokeWidth="2" />
                  <text x={p.x} y={svgH - padB + 14} textAnchor="middle" fill="#8E7A6B" fontSize="9">
                    {SALES_DATA[i].date}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="chart-card recent-orders-card">
          <div className="chart-header">
            <h3>Recent Orders</h3>
            <span className="view-all-link" style={{ cursor: "pointer" }}>View All</span>
          </div>
          <div className="recent-orders-list">
            {orders.slice(0, 4).map((order) => (
              <div className="recent-order-item" key={order.id}>
                <div className="order-item-prod">
                  <div className="order-prod-thumb"><span>💍</span></div>
                  <div>
                    <h4>#{order.id}</h4>
                    <p>{order.customer}</p>
                  </div>
                </div>
                <span className="order-time">{order.date}</span>
                <span className={`status-badge-inline ${order.status.toLowerCase()}`}>{order.status}</span>
                <span className="order-amt">₹{order.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-grids-row">
        <div className="list-card">
          <div className="list-card-header">
            <h3>Top Selling Products</h3>
            <span className="view-all-link" style={{ cursor: "pointer" }}>View All</span>
          </div>
          <div className="dashboard-list">
            {TOP_SELLING.map((prod, idx) => (
              <div className="list-item" key={idx}>
                <div className="item-left">
                  <img src={prod.image} alt={prod.name} />
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

        <div className="list-card">
          <div className="list-card-header">
            <h3>Recent Reviews</h3>
            <span className="view-all-link" style={{ cursor: "pointer" }}>View All</span>
          </div>
          <div className="dashboard-list">
            {INITIAL_REVIEWS.slice(0, 4).map((rev, idx) => (
              <div className="list-item" key={idx}>
                <div className="item-left">
                  <div className="order-prod-thumb"><span>⭐</span></div>
                  <div>
                    <h4>{rev.customer}</h4>
                    <p>{rev.product}</p>
                  </div>
                </div>
                <div className="reviews-stars-row">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < rev.rating ? "star-active" : "star-inactive"} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="list-card">
          <div className="list-card-header">
            <h3>Earnings Overview</h3>
            <span className="chart-range">Last 7 Days ▾</span>
          </div>
          <div className="revenue-summary">
            <h4>₹{totalRevenue.toLocaleString()}</h4>
            <span className="text-success"><FaArrowUp /> 15.2% from last 7 days</span>
          </div>
          <div className="svg-chart-container bars-chart">
            <svg viewBox="0 0 250 120" width="100%" height="100%">
              {SALES_DATA.map((d, i) => {
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
              })}
              <line x1="10" y1="110" x2="240" y2="110" stroke="#F5ECEF" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const SellerProductsSection = ({ products, deleteProduct, toggleProductStatus, onAddProduct }) => {
  const [search, setSearch] = useState("");
  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="admin-products-view fade-in">
      <div className="section-title-row">
        <div>
          <h2>My Products</h2>
          <p className="subtitle">Manage your product listings and inventory.</p>
        </div>
        <button className="admin-btn-primary" onClick={onAddProduct}>
          <FaPlus /> Add Product
        </button>
      </div>

      <div className="table-controls-card">
        <div className="search-box-wrapper">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: "center", padding: "30px", color: "#8E7A6B" }}>No products found.</td></tr>
            ) : (
              filtered.map((prod) => (
                <tr key={prod.id}>
                  <td>
                    <div className="tbl-product-cell">
                      <img src={prod.image} alt={prod.name} />
                      <strong>{prod.name}</strong>
                    </div>
                  </td>
                  <td>{prod.category}</td>
                  <td>₹{prod.price.toLocaleString()}</td>
                  <td>{prod.stock}</td>
                  <td>
                    <span
                      className={`status-badge-inline ${prod.status === "Active" ? "active" : "inactive"}`}
                      onClick={() => toggleProductStatus(prod.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {prod.status}
                    </span>
                  </td>
                  <td>
                    <button className="tbl-action-btn delete" onClick={() => deleteProduct(prod.id)} title="Delete">
                      <FaTrash />
                    </button>
                    <button className="tbl-action-btn check" onClick={() => toggleProductStatus(prod.id)} title="Toggle Status">
                      {prod.status === "Active" ? <FaTimes /> : <FaCheck />}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SellerAddProductSection = ({ addProduct, onBack, categories }) => {
  const [form, setForm] = useState({ name: "", category: categories[0] || "Necklace", price: "", stock: "", description: "", image: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    addProduct({
      id: Date.now(),
      name: form.name,
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock) || 0,
      status: "Active",
      image: form.image || "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&q=80",
    });
    onBack();
  };

  return (
    <div className="admin-add-product-view fade-in">
      <div className="section-title-row">
        <div>
          <button className="back-nav-btn" onClick={onBack}><FaArrowLeft /> Back to Products</button>
          <h2>Add New Product</h2>
          <p className="subtitle">List a new item in your store catalog.</p>
        </div>
      </div>

      <div className="form-card">
        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-left-col">
            <div>
              <label>Product Name</label>
              <input type="text" placeholder="Enter product name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required style={{ width: "100%", padding: "12px 18px", borderRadius: "8px", border: "1px solid var(--border-color)", fontFamily: "var(--body-font)", fontSize: "13px", outline: "none", backgroundColor: "#FFFDFE" }} />
            </div>
            <div className="form-row-2">
              <div>
                <label>Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label>Price (₹)</label>
                <input type="number" placeholder="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required style={{ width: "100%", padding: "12px 18px", borderRadius: "8px", border: "1px solid var(--border-color)", fontFamily: "var(--body-font)", fontSize: "13px", outline: "none", backgroundColor: "#FFFDFE" }} />
              </div>
            </div>
            <div className="form-row-2">
              <div>
                <label>Stock Quantity</label>
                <input type="number" placeholder="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} style={{ width: "100%", padding: "12px 18px", borderRadius: "8px", border: "1px solid var(--border-color)", fontFamily: "var(--body-font)", fontSize: "13px", outline: "none", backgroundColor: "#FFFDFE" }} />
              </div>
              <div>
                <label>Image URL</label>
                <input type="text" placeholder="https://..." value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} style={{ width: "100%", padding: "12px 18px", borderRadius: "8px", border: "1px solid var(--border-color)", fontFamily: "var(--body-font)", fontSize: "13px", outline: "none", backgroundColor: "#FFFDFE" }} />
              </div>
            </div>
            <div>
              <label>Description</label>
              <textarea rows="4" placeholder="Describe your product..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
          </div>
          <div className="form-right-col">
            <label>Product Image</label>
            <div className="upload-box">
              <FaUpload className="upload-icon" />
              <span>Upload Image</span>
              <p>PNG, JPG up to 5MB</p>
            </div>
            {form.image && (
              <img src={form.image} alt="Preview" style={{ width: "100%", borderRadius: "12px", marginTop: "15px", border: "1px solid var(--border-color)" }} />
            )}
          </div>
          <div className="form-actions-row" style={{ gridColumn: "1 / -1" }}>
            <button type="button" className="admin-btn-secondary" onClick={onBack}>Cancel</button>
            <button type="submit" className="admin-btn-primary"><FaPlus /> Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SellerOrdersSection = ({ orders, updateOrderStatus }) => {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
  const filtered = activeTab === "All" ? orders : orders.filter((o) => o.status.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="admin-orders-view fade-in">
      <div className="section-title-row">
        <div>
          <h2>My Orders</h2>
          <p className="subtitle">Track and manage orders for your products.</p>
        </div>
      </div>

      <div className="orders-filter-bar">
        <div className="filter-tabs">
          {tabs.map((tab) => (
            <button key={tab} className={`filter-tab ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: "center", padding: "30px", color: "#8E7A6B" }}>No orders found under '{activeTab}'.</td></tr>
            ) : (
              filtered.map((order) => (
                <tr key={order.id}>
                  <td><strong>#{order.id}</strong></td>
                  <td>{order.customer}</td>
                  <td>{order.date}</td>
                  <td><strong>₹{order.amount.toLocaleString()}</strong></td>
                  <td><span className={`status-badge-inline ${order.status.toLowerCase()}`}>{order.status}</span></td>
                  <td>
                    <div className="status-select-wrapper">
                      <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <FaAngleDown className="select-icon" />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SellerReviewsSection = ({ reviews, deleteReview }) => (
  <div className="admin-reviews-view fade-in">
    <div className="section-title-row">
      <div>
        <h2>Product Reviews</h2>
        <p className="subtitle">See what customers are saying about your products.</p>
      </div>
    </div>

    <div className="table-card">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Product</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((rev, idx) => (
            <tr key={idx}>
              <td>{rev.customer}</td>
              <td>{rev.product}</td>
              <td>
                <div className="reviews-stars-row">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < rev.rating ? "star-active" : "star-inactive"} />
                  ))}
                </div>
              </td>
              <td className="review-text-cell">{rev.review}</td>
              <td><span className={`status-badge-inline ${rev.status === "Approved" ? "active" : "pending"}`}>{rev.status}</span></td>
              <td>
                <button className="tbl-action-btn delete" onClick={() => deleteReview(idx)} title="Delete"><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const SellerAnalyticsSection = () => (
  <div className="admin-analytics-view fade-in">
    <div className="section-title-row">
      <div>
        <h2>Store Analytics</h2>
        <p className="subtitle">Track your sales performance and customer engagement.</p>
      </div>
      <div className="date-picker-box">
        <FaCalendarAlt />
        <span>Last 30 Days</span>
      </div>
    </div>

    <div className="analytics-metrics-grid">
      <div className="analytics-metric-card">
        <span>Total Earnings</span>
        <h3>₹1,65,000</h3>
        <p className="text-success"><FaArrowUp /> +12.4% from last month</p>
      </div>
      <div className="analytics-metric-card">
        <span>Total Orders</span>
        <h3>156</h3>
        <p className="text-success"><FaArrowUp /> +6.8% from last month</p>
      </div>
      <div className="analytics-metric-card">
        <span>Products Sold</span>
        <h3>342</h3>
        <p className="text-success"><FaArrowUp /> +9.1% from last month</p>
      </div>
      <div className="analytics-metric-card">
        <span>Avg. Order Value</span>
        <h3>₹1,058</h3>
        <p className="text-success"><FaArrowUp /> +3.2% from last month</p>
      </div>
    </div>

    <div className="analytics-charts-grid">
      <div className="analytics-chart-card">
        <h3>Sales Trend</h3>
        <div className="svg-chart-container-large">
          <svg viewBox="0 0 500 220" width="100%" height="100%">
            <defs>
              <linearGradient id="sellerAnalyticsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EF6F8F" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#EF6F8F" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <line x1="40" y1="30" x2="480" y2="30" stroke="#F5ECEF" strokeWidth="1" />
            <line x1="40" y1="75" x2="480" y2="75" stroke="#F5ECEF" strokeWidth="1" />
            <line x1="40" y1="120" x2="480" y2="120" stroke="#F5ECEF" strokeWidth="1" />
            <line x1="40" y1="165" x2="480" y2="165" stroke="#F5ECEF" strokeWidth="1" />
            <path d="M 40 165 L 120 130 L 200 145 L 280 90 L 360 110 L 440 60 L 480 75 L 480 190 L 40 190 Z" fill="url(#sellerAnalyticsGrad)" />
            <path d="M 40 165 L 120 130 L 200 145 L 280 90 L 360 110 L 440 60 L 480 75" fill="none" stroke="#EF6F8F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {[{ x: 40, y: 165 }, { x: 120, y: 130 }, { x: 200, y: 145 }, { x: 280, y: 90 }, { x: 360, y: 110 }, { x: 440, y: 60 }, { x: 480, y: 75 }].map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="5" fill="#EF6F8F" stroke="#fff" strokeWidth="2" />
            ))}
          </svg>
        </div>
      </div>

      <div className="analytics-chart-card">
        <h3>Sales by Category</h3>
        <div className="donut-chart-wrapper">
          <div className="donut-svg-container">
            <svg viewBox="0 0 150 150" width="150" height="150">
              <circle cx="75" cy="75" r="55" fill="none" stroke="#F5ECEF" strokeWidth="18" />
              <circle cx="75" cy="75" r="55" fill="none" stroke="#EF6F8F" strokeWidth="18" strokeDasharray="138 208" strokeDashoffset="0" transform="rotate(-90 75 75)" />
              <circle cx="75" cy="75" r="55" fill="none" stroke="#D94C7A" strokeWidth="18" strokeDasharray="69 277" strokeDashoffset="-138" transform="rotate(-90 75 75)" />
              <circle cx="75" cy="75" r="55" fill="none" stroke="#D4AF37" strokeWidth="18" strokeDasharray="52 294" strokeDashoffset="-207" transform="rotate(-90 75 75)" />
              <circle cx="75" cy="75" r="55" fill="none" stroke="#8E7A6B" strokeWidth="18" strokeDasharray="35 311" strokeDashoffset="-259" transform="rotate(-90 75 75)" />
            </svg>
            <div className="donut-center-lbl">
              <h5>342</h5>
              <span>Items Sold</span>
            </div>
          </div>
          <div className="donut-legend">
            <div className="legend-item"><span className="legend-dot color-pink1" /><span>Necklace</span><strong>40%</strong></div>
            <div className="legend-item"><span className="legend-dot color-pink2" /><span>Earrings</span><strong>25%</strong></div>
            <div className="legend-item"><span className="legend-dot color-gold" /><span>Rings</span><strong>19%</strong></div>
            <div className="legend-item"><span className="legend-dot color-brown" /><span>Other</span><strong>16%</strong></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SellerProfileSection = ({ profile, updateProfile }) => {
  const [form, setForm] = useState({ ...profile });
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="admin-profile-view fade-in">
      <div className="section-title-row">
        <div>
          <h2>My Profile</h2>
          <p className="subtitle">Manage your seller account details.</p>
        </div>
      </div>

      <div className="form-card profile-settings-card">
        <form className="profile-form" onSubmit={handleSave}>
          <div className="avatar-upload-box">
            <img src={form.img} alt={form.name} className="avatar-large" />
            <div className="avatar-info-box">
              <h4>{form.name}</h4>
              <p>Update your profile photo via URL</p>
              <input type="text" className="url-input" placeholder="Image URL" value={form.img} onChange={(e) => setForm({ ...form, img: e.target.value })} />
            </div>
          </div>

          <div className="profile-form-grid">
            <div>
              <label>Full Name</label>
              <div className="input-with-icon">
                <FaUserAlt className="input-icon" />
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
            </div>
            <div>
              <label>Email Address</label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <div>
              <label>Store Name</label>
              <div className="input-with-icon">
                <FaStore className="input-icon" />
                <input type="text" value={form.storeName} onChange={(e) => setForm({ ...form, storeName: e.target.value })} />
              </div>
            </div>
            <div>
              <label>Contact Number</label>
              <div className="input-with-icon">
                <FaUserAlt className="input-icon" />
                <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>
          </div>

          <div className="profile-action-row">
            {saved && <span className="save-success-msg">Profile updated successfully!</span>}
            <button type="submit" className="admin-btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SellerSettingsSection = ({ settings, updateSettings }) => {
  const [form, setForm] = useState({ ...settings });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="admin-settings-view fade-in">
      <div className="section-title-row">
        <div>
          <h2>Store Settings</h2>
          <p className="subtitle">Configure your seller store preferences.</p>
        </div>
      </div>

      <div className="settings-wrapper-card">
        <div className="settings-sidebar">
          <button className="settings-tab-btn active"><FaStore /> Store Info</button>
          <button className="settings-tab-btn"><FaCog /> Notifications</button>
        </div>
        <div className="settings-form-container">
          <div className="settings-form-tab">
            <h3>Store Information</h3>
            <div className="settings-form-grid">
              <div>
                <label>Store Name</label>
                <input type="text" value={form.storeName} onChange={(e) => setForm({ ...form, storeName: e.target.value })} style={{ width: "100%", padding: "12px 18px", borderRadius: "8px", border: "1px solid var(--border-color)", fontFamily: "var(--body-font)", fontSize: "13px", outline: "none", backgroundColor: "#FFFDFE" }} />
              </div>
              <div>
                <label>Store Email</label>
                <input type="email" value={form.storeEmail} onChange={(e) => setForm({ ...form, storeEmail: e.target.value })} style={{ width: "100%", padding: "12px 18px", borderRadius: "8px", border: "1px solid var(--border-color)", fontFamily: "var(--body-font)", fontSize: "13px", outline: "none", backgroundColor: "#FFFDFE" }} />
              </div>
              <div>
                <label>Contact Number</label>
                <input type="text" value={form.contactNumber} onChange={(e) => setForm({ ...form, contactNumber: e.target.value })} style={{ width: "100%", padding: "12px 18px", borderRadius: "8px", border: "1px solid var(--border-color)", fontFamily: "var(--body-font)", fontSize: "13px", outline: "none", backgroundColor: "#FFFDFE" }} />
              </div>
              <div>
                <label>Store Logo Initials</label>
                <div className="logo-preview-row">
                  <div className="logo-badge-mock">{form.storeLogo}</div>
                  <input type="text" value={form.storeLogo} onChange={(e) => setForm({ ...form, storeLogo: e.target.value })} maxLength={3} />
                </div>
              </div>
            </div>
          </div>
          <div className="settings-action-row">
            {saved && <span className="save-success-msg">Settings saved successfully!</span>}
            <button className="admin-btn-primary" onClick={handleSave}>Save Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
};



const SellerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");

  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [settings, setSettings] = useState({
    storeName: "Elegance Jewels",
    storeLogo: "EJ",
    storeEmail: "seller@elegancejewels.com",
    contactNumber: "+91 98765 43210",
  });
  const [profile, setProfile] = useState({
    name: "Rajesh Kumar",
    email: "rajesh@elegancejewels.com",
    storeName: "Elegance Jewels",
    phone: "+91 98765 43210",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80",
  });

  const categories = ["Necklace", "Earrings", "Rings", "Bracelets", "Accessories"];

  const sidebarLinks = [
    { name: "Dashboard", key: "dashboard", icon: <FaChartPie /> },
    { name: "My Products", key: "products", icon: <FaBox /> },
    { name: "Orders", key: "orders", icon: <FaShoppingCart /> },
    { name: "Reviews", key: "reviews", icon: <FaStar /> },
    { name: "Analytics", key: "analytics", icon: <FaChartLine /> },
    { name: "Settings", key: "settings", icon: <FaCog /> },
  ];

  const addProduct = (newP) => setProducts([newP, ...products]);
  const deleteProduct = (id) => setProducts(products.filter((p) => p.id !== id));
  const toggleProductStatus = (id) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" } : p)));
  };
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
  };
  const deleteReview = (idx) => setReviews(reviews.filter((_, i) => i !== idx));

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <SellerDashboardHome products={products} orders={orders} />;
      case "products":
        return (
          <SellerProductsSection
            products={products}
            deleteProduct={deleteProduct}
            toggleProductStatus={toggleProductStatus}
            onAddProduct={() => setActiveSection("add-product")}
          />
        );
      case "add-product":
        return (
          <SellerAddProductSection
            addProduct={addProduct}
            onBack={() => setActiveSection("products")}
            categories={categories}
          />
        );
      case "orders":
        return <SellerOrdersSection orders={orders} updateOrderStatus={updateOrderStatus} />;
      case "reviews":
        return <SellerReviewsSection reviews={reviews} deleteReview={deleteReview} />;
      case "analytics":
        return <SellerAnalyticsSection />;
      case "settings":
        return <SellerSettingsSection settings={settings} updateSettings={setSettings} />;
      case "profile":
        return <SellerProfileSection profile={profile} updateProfile={(p) => setProfile((prev) => ({ ...prev, ...p }))} />;
      default:
        return <SellerDashboardHome products={products} orders={orders} />;
    }
  };

  return (
    <div className="admin-layout-container">
      <header className="admin-header">
        <div className="header-left">
          <button className="mobile-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className="header-logo-group">
            <span className="logo-initial">{settings.storeLogo}</span>
            <div>
              <h3>{settings.storeName}</h3>
              <p>Seller Portal</p>
            </div>
          </div>
        </div>

        <div className="header-search">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search here..." />
        </div>

        <div className="header-right">
          <div className="alert-badge-wrapper">
            <FaBell />
            <span className="badge-dot">2</span>
          </div>
          <div className="alert-badge-wrapper">
            <FaEnvelope />
            <span className="badge-dot">3</span>
          </div>

          <div
            className="profile-badge-link"
            style={{ cursor: "pointer" }}
            onClick={() => setActiveSection("profile")}
          >
            <img src={profile.img} alt={profile.name} className="profile-thumb" />
            <div className="profile-meta">
              <h4>{profile.name}</h4>
              <p>Seller ▾</p>
            </div>
          </div>
        </div>
      </header>

      <div className="admin-body">
        <aside className={`admin-sidebar ${sidebarOpen ? "active" : ""}`}>
          <ul className="sidebar-links-list">
            {sidebarLinks.map((link) => (
              <li key={link.key}>
                <button
                  className={`sidebar-link ${activeSection === link.key || (link.key === "products" && activeSection === "add-product") ? "active" : ""}`}
                  onClick={() => setActiveSection(link.key)}
                  style={{ background: "none", border: "none", width: "100%", cursor: "pointer", textAlign: "left" }}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="sidebar-footer">
            <button
              className="sidebar-link logout-btn"
              style={{ background: "none", border: "none", width: "100%", cursor: "pointer", textAlign: "left" }}
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        <main className="admin-main-content">
          {renderSection()}
        </main>
      </div>

      <footer className="admin-footer-sub text-center py-3">
        💎 Seller Dashboard — Fashion Oasis theme — Elegant, Soft & Luxurious ❤
      </footer>
    </div>
  );
};

export default SellerDashboard;
