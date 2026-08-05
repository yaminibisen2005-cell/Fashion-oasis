import React, { useState, useRef } from "react";
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
  FaBoxes,
  FaDownload,
  FaEye,
  FaExclamationTriangle,
  FaWallet,
  FaClock,
  FaUserCircle,
  FaTruck,
  FaTags,
  FaInfoCircle,
  FaImage,
  FaReply,
  FaSyncAlt,
  FaSort,
  FaCreditCard,
  FaShareAlt,
  FaFileContract,
  FaSave,
} from "react-icons/fa";

import "../Admin/AdminLayout.css";
import "./SellerLayout.css";
import logo from "../../assets/logo.png";

const INITIAL_PRODUCTS = [
  { id: 1, name: "Handmade Pearl Necklace", sku: "FO-001", category: "Necklace", price: 899, stock: 25, sold: 180, views: 1200, rating: 4.9, status: "Active", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&q=80" },
  { id: 2, name: "Silver Charm Bracelet", sku: "FO-042", category: "Bracelets", price: 549, stock: 2, sold: 340, views: 3800, rating: 4.7, status: "Active", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&q=80" },
  { id: 3, name: "Premium Gift Box", sku: "FO-115", category: "Accessories", price: 120, stock: 1, sold: 50, views: 620, rating: 4.2, status: "Active", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&q=80" },
  { id: 4, name: "Gold Plated Earrings", sku: "FO-060", category: "Earrings", price: 649, stock: 40, sold: 260, views: 4100, rating: 4.8, status: "Active", image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=300&q=80" },
  { id: 5, name: "Classic Gold Ring", sku: "FO-088", category: "Rings", price: 860, stock: 0, sold: 95, views: 1900, rating: 4.5, status: "Inactive", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&q=80" },
  { id: 6, name: "Pearl Drop Earrings", sku: "FO-121", category: "Earrings", price: 1275, stock: 18, sold: 120, views: 2400, rating: 4.6, status: "Active", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=300&q=80" },
];

const INITIAL_ORDERS = [
  { id: "FO1021", customer: "Priya Sharma", initials: "PS", product: "Silk Saree Collection", date: "Oct 24, 2023", amount: 4500, status: "Pending" },
  { id: "FO1022", customer: "Neha Gupta", initials: "NG", product: "Designer Lehenga", date: "Oct 23, 2023", amount: 12000, status: "Delivered" },
  { id: "FO1023", customer: "Riya Singh", initials: "RS", product: "Cotton Kurti Set", date: "Oct 22, 2023", amount: 1850, status: "Shipped" },
  { id: "FO1024", customer: "Anjali Verma", initials: "AV", product: "Festive Dupatta", date: "Oct 21, 2023", amount: 950, status: "Processing" },
  { id: "FO1025", customer: "Amit Rao", initials: "AR", product: "Handmade Pearl Necklace", date: "Oct 20, 2023", amount: 899, status: "Shipped" },
  { id: "FO1026", customer: "Neha Kapoor", initials: "NK", product: "Gold Plated Earrings", date: "Oct 19, 2023", amount: 1298, status: "Delivered" },
  { id: "FO1027", customer: "Ritika Singh", initials: "RS", product: "Silver Charm Bracelet", date: "Oct 18, 2023", amount: 549, status: "Cancelled" },
  { id: "FO1028", customer: "Sneha Patel", initials: "SP", product: "Pearl Drop Earrings", date: "Oct 17, 2023", amount: 1275, status: "Pending" },
];

const ORDER_COUNTS = { Pending: 18, Processing: 12, Shipped: 25, Delivered: 420, Cancelled: 8 };

const INITIAL_REVIEWS = [
  { id: 1, customer: "Sarah Jenkins", initial: "S", rating: 5, date: "Oct 24, 2023", product: "Emerald Bracelet", review: "Absolutely love the quality of this bracelet! This is incredibly soft and the color is exactly as pictured, maybe even more vibrant in person.", status: "Approved", verified: true },
  { id: 3, customer: "Amanda R.", initial: "A", rating: 5, date: "Oct 20, 2023", product: "Tan Leather Crossbody", review: "Beautiful bag! The leather is gorgeous and it holds surprisingly more than it looks like it would. Perfect for everyday use.", status: "Approved", verified: true },
  { id: 4, customer: "Priya Sharma", initial: "P", rating: 5, date: "Oct 19, 2023", product: "Handmade Pearl Necklace", review: "Absolutely love the quality and design. Fast shipping too!", status: "Pending", verified: true },
  { id: 5, customer: "Riya Kapoor", initial: "R", rating: 4, date: "Oct 18, 2023", product: "Pearl Drop Earrings", review: "Nice earrings, slightly smaller than expected but elegant.", status: "Approved", verified: false },
  { id: 6, customer: "Neha Verma", initial: "N", rating: 5, date: "Oct 17, 2023", product: "Premium Gift Box", review: "Perfect packaging. Made for a wonderful anniversary present.", status: "Approved", verified: true },
  { id: 7, customer: "Sarah Jenkins", initial: "S", rating: 5, date: "Oct 16, 2023", product: "Silver Charm Bracelet", review: "The silver bracelet is so delicate and elegant! It goes with everything and the charm detail is just beautiful.", status: "Approved", verified: true },
  { id: 8, customer: "Michael T.", initial: "M", rating: 4, date: "Oct 15, 2023", product: "Gold Plated Earrings", review: "Great everyday earrings. The gold tone is warm and they are lightweight enough to wear all day.", status: "Approved", verified: false },
  { id: 9, customer: "Amanda R.", initial: "A", rating: 5, date: "Oct 14, 2023", product: "Classic Gold Ring", review: "Timeless design and the fit is perfect. It looks far more expensive than the price. Highly recommend!", status: "Approved", verified: true },
  { id: 10, customer: "Priya Sharma", initial: "P", rating: 5, date: "Oct 13, 2023", product: "Premium Gift Box", review: "The gift box is gorgeous and the quality is top notch. It made the perfect present!", status: "Pending", verified: true },
  { id: 11, customer: "Riya Kapoor", initial: "R", rating: 4, date: "Oct 12, 2023", product: "Gold Plated Earrings", review: "Elegant and classy, exactly what I wanted for a family wedding. Slightly lighter than expected but very pretty.", status: "Approved", verified: false },
  { id: 12, customer: "Neha Verma", initial: "N", rating: 5, date: "Oct 11, 2023", product: "Gold Plated Earrings", review: "Second pair I have bought from this store. Great quality and the colour hasn't faded at all.", status: "Approved", verified: true },
  { id: 13, customer: "Michael T.", initial: "M", rating: 5, date: "Oct 10, 2023", product: "Classic Gold Ring", review: "Bought this as a gift and my wife loved it. The finishing is really premium.", status: "Approved", verified: true },
  { id: 14, customer: "Amanda R.", initial: "A", rating: 4, date: "Oct 9, 2023", product: "Silver Charm Bracelet", review: "Cute bracelet, well made. A bit small for my wrist but the design is lovely.", status: "Approved", verified: false },
];

const RATING_BREAKDOWN = [
  { stars: 5, count: 318, width: 75 },
  { stars: 4, count: 64, width: 15 },
  { stars: 3, count: 21, width: 5 },
  { stars: 2, count: 12, width: 3 },
  { stars: 1, count: 10, width: 2 },
];

const SALES_DATA = [
  { day: "Mon", sales: 32 },
  { day: "Tue", sales: 45 },
  { day: "Wed", sales: 38 },
  { day: "Thu", sales: 72 },
  { day: "Fri", sales: 55 },
  { day: "Sat", sales: 66 },
  { day: "Sun", sales: 41 },
];

const REVENUE_DATA = [
  { m: "Jan", v: 30 }, { m: "Feb", v: 45 }, { m: "Mar", v: 60 },
  { m: "Apr", v: 40 }, { m: "May", v: 85 }, { m: "Jun", v: 70 }, { m: "Jul", v: 55 },
];

const TOP_SELLING = [
  { name: "Handmade Pearl Necklace", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=80&q=80", sold: 180, revenue: 161820 },
  { name: "Gold Plated Earrings", image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=80&q=80", sold: 260, revenue: 168740 },
  { name: "Silver Charm Bracelet", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=80&q=80", sold: 340, revenue: 186660 },
  { name: "Pearl Drop Earrings", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=80&q=80", sold: 120, revenue: 153000 },
];

const Stars = ({ count }) => (
  <div className="reviews-stars-row">
    {[...Array(5)].map((_, i) => (
      <FaStar key={i} className={i < count ? "star-active" : "star-inactive"} />
    ))}
  </div>
);

const badgeClass = (status) => status.toLowerCase().replace(/\s+/g, "-");

const OverviewSection = ({ products, orders, onAddProduct }) => {
  const totalRevenue = orders.reduce((s, o) => s + o.amount, 0);
  const chartH = 130;
  const barMax = Math.max(...SALES_DATA.map((d) => d.sales), 1);
  const spacing = 240 / SALES_DATA.length;
  const barW = Math.min(spacing * 0.5, 16);

  const maxRev = Math.max(...REVENUE_DATA.map((d) => d.v), 1);
  const revSpacing = 250 / REVENUE_DATA.length;

  return (
    <div className="admin-dashboard-view fade-in">
      <div className="section-title-row">
        <div>
          <h2>Overview</h2>
          <p className="subtitle">Welcome back to your seller dashboard.</p>
        </div>
        <div className="date-picker-box">
          <FaCalendarAlt />
          <span>{new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
        </div>
      </div>

      <div className="summary-cards-grid">
        <div className="summary-card">
          <div className="card-top">
            <div>
              <span>Total Revenue</span>
              <h3>₹1,28,500</h3>
            </div>
            <div className="card-icon-circle"><FaWallet /></div>
          </div>
          <div className="card-trend upward"><FaArrowUp /> 12.5% <span className="trend-lbl">vs last month</span></div>
        </div>

        <div className="summary-card">
          <div className="card-top">
            <div>
              <span>Today's Sales</span>
              <h3>₹8,450</h3>
            </div>
            <div className="card-icon-circle"><FaRupeeSign /></div>
          </div>
          <div className="card-trend upward"><FaArrowUp /> 4.2% <span className="trend-lbl">today</span></div>
        </div>

        <div className="summary-card">
          <div className="card-top">
            <div>
              <span>Active Listings</span>
              <h3>{products.filter((p) => p.status === "Active").length} <span className="trend-lbl" style={{ fontSize: 13 }}>/ {products.length} Total</span></h3>
            </div>
            <div className="card-icon-circle"><FaShoppingBag /></div>
          </div>
          <div className="card-trend" style={{ color: "#F5222D" }}><FaExclamationTriangle /> 3 Low Stock Items</div>
        </div>

        <div className="summary-card">
          <div className="card-top">
            <div>
              <span>Store Rating</span>
              <h3>4.8</h3>
            </div>
            <div className="card-icon-circle"><FaStar /></div>
          </div>
          <div className="card-trend"><span className="trend-lbl">Based on 425 orders</span></div>
        </div>
      </div>

      <div className="dashboard-charts-row">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Sales Analytics</h3>
            <span className="chart-range">Last 7 Days ▾</span>
          </div>
          <div className="svg-chart-container">
            <svg viewBox="0 0 260 150" width="100%" height="100%">
              {SALES_DATA.map((d, i) => {
                const barH = Math.max((d.sales / barMax) * chartH, 3);
                const x = 12 + i * spacing + (spacing - barW) / 2;
                const y = 130 - barH;
                return (
                  <g key={d.day}>
                    <rect x={x} y={y} width={barW} height={barH} fill={d.sales === barMax ? "#D94C7A" : "#EF6F8F"} rx="3" />
                    <text x={x + barW / 2} y="145" textAnchor="middle" fill="#8E7A6B" fontSize="7">{d.day}</text>
                  </g>
                );
              })}
              <line x1="8" y1="130" x2="252" y2="130" stroke="#F5ECEF" strokeWidth="1" />
            </svg>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Order Status</h3>
            <span className="view-all-link" style={{ cursor: "pointer" }}>View All</span>
          </div>
          <div className="recent-orders-list">
            {[
              ["Pending", 18, "#D4AF37"],
              ["Processing", 12, "#1890FF"],
              ["Shipped", 25, "#52C41A"],
              ["Delivered", 420, "#13C2C2"],
              ["Cancelled", 8, "#F5222D"],
            ].map(([label, n, color]) => (
              <div className="recent-order-item" key={label}>
                <div className="order-item-prod">
                  <div className="order-prod-thumb"><span style={{ color }}>●</span></div>
                  <div>
                    <h4>{label}</h4>
                  </div>
                </div>
                <span className="order-amt">{n}</span>
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
                <Stars count={rev.rating} />
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
            <span className="text-pink"><FaArrowUp /> 15.2% from last 7 days</span>
          </div>
          <div className="svg-chart-container bars-chart">
            <svg viewBox="0 0 250 120" width="100%" height="100%">
              {REVENUE_DATA.map((d, i) => {
                const barH = Math.max((d.v / maxRev) * 90, 3);
                const x = 14 + i * revSpacing + (revSpacing - barW) / 2;
                const y = 100 - barH;
                return (
                  <g key={d.m}>
                    <rect x={x} y={y} width={barW} height={barH} fill="#EF6F8F" rx="3" />
                    <text x={x + barW / 2} y="115" textAnchor="middle" fill="#8E7A6B" fontSize="6">{d.m}</text>
                  </g>
                );
              })}
              <line x1="10" y1="100" x2="240" y2="100" stroke="#F5ECEF" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductsSection = ({ products, onAddProduct, deleteProduct, toggleStatus }) => {
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
        <button className="admin-btn-secondary"><FaFilter /> Filter</button>
      </div>

      <div className="table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="7" style={{ textAlign: "center", padding: "30px", color: "#8E7A6B" }}>No products found.</td></tr>
            ) : (
              filtered.map((prod) => (
                <tr key={prod.id}>
                  <td>
                    <div className="tbl-product-cell">
                      <img src={prod.image} alt={prod.name} />
                      <strong>{prod.name}</strong>
                    </div>
                  </td>
                  <td>{prod.sku}</td>
                  <td>{prod.category}</td>
                  <td>₹{prod.price.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge-inline ${prod.stock <= 4 ? "cancelled" : "delivered"}`}>
                      {prod.stock <= 4 ? `${prod.stock} (Low)` : prod.stock}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status-badge-inline ${prod.status === "Active" ? "active" : "inactive"}`}
                      onClick={() => toggleStatus(prod.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {prod.status}
                    </span>
                  </td>
                  <td>
                    <button className="tbl-action-btn delete" onClick={() => deleteProduct(prod.id)} title="Delete"><FaTrash /></button>
                    <button className="tbl-action-btn check" onClick={() => toggleStatus(prod.id)} title="Toggle Status">
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

const AddProductSection = ({ addProduct, onBack }) => {
  const [form, setForm] = useState({
    name: "",
    category: "Dresses",
    price: "",
    stock: "",
    description: "",
    image: "",
  });
  const [mediaFiles, setMediaFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleFiles = (files) => {
    const list = Array.from(files || []);
    if (!list.length) return;
    const images = list.filter((f) => f.type.startsWith("image/"));
    if (!images.length) return;
    const urls = images.map((f) => URL.createObjectURL(f));
    setMediaFiles((prev) => [...prev, ...urls]);
    setForm((prev) => ({ ...prev, image: prev.image || urls[0] }));
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeMedia = (idx) => {
    URL.revokeObjectURL(mediaFiles[idx]);
    setMediaFiles((prev) => prev.filter((_, i) => i !== idx));
    setForm((prev) => {
      if (idx !== 0) return prev;
      const next = mediaFiles.find((_, i) => i !== idx);
      return { ...prev, image: next || "" };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    addProduct({
      id: Date.now(),
      name: form.name,
      sku: `FO-${String(Math.floor(Math.random() * 900) + 100)}`,
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock) || 0,
      sold: 0,
      views: 0,
      rating: 0,
      status: "Active",
      image: form.image || "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&q=80",
    });
    onBack();
  };

  return (
    <div className="admin-add-product-view fade-in">
      <div className="section-title-row">
        <div>
          <button className="back-nav-btn" onClick={onBack}><FaArrowLeft /> Back to Products</button>
          <h2>Add New Product</h2>
          <p className="subtitle">Fill in the details below to list a new item in your store.</p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="admin-btn-secondary" onClick={onBack}>Discard</button>
          <button className="admin-btn-primary" onClick={handleSubmit}><FaCheck /> Save Product</button>
        </div>
      </div>

      <div className="form-card">
        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-left-col">
            <div>
              <label style={{ fontFamily: "var(--body-font)", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 8, display: "block" }}>
                <FaInfoCircle style={{ marginRight: 6, color: "var(--primary-color)" }} /> Product Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Summer Floral Wrap Dress"
                value={form.name}
                onChange={set("name")}
                required
                style={{ width: "100%", padding: "12px 18px", borderRadius: 8, border: "1px solid var(--border-color)", fontFamily: "var(--body-font)", fontSize: 13, outline: "none", backgroundColor: "#FFFDFE" }}
              />
            </div>
            <div className="form-row-2">
              <div>
                <label style={{ fontFamily: "var(--body-font)", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 8, display: "block" }}>Category *</label>
                <select value={form.category} onChange={set("category")} style={{ width: "100%" }}>
                  <option>Dresses</option><option>Tops</option><option>Bottoms</option>
                  <option>Accessories</option><option>Necklace</option><option>Earrings</option>
                  <option>Rings</option><option>Bracelets</option>
                </select>
              </div>
              <div>
                <label style={{ fontFamily: "var(--body-font)", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 8, display: "block" }}>Regular Price (₹) *</label>
                <input type="number" placeholder="0.00" value={form.price} onChange={set("price")} required style={{ width: "100%", padding: "12px 18px", borderRadius: 8, border: "1px solid var(--border-color)", fontFamily: "var(--body-font)", fontSize: 13, outline: "none", backgroundColor: "#FFFDFE" }} />
              </div>
            </div>
            <div className="form-row-2">
              <div>
                <label style={{ fontFamily: "var(--body-font)", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 8, display: "block" }}>Stock Quantity *</label>
                <input type="number" placeholder="0" value={form.stock} onChange={set("stock")} style={{ width: "100%", padding: "12px 18px", borderRadius: 8, border: "1px solid var(--border-color)", fontFamily: "var(--body-font)", fontSize: 13, outline: "none", backgroundColor: "#FFFDFE" }} />
              </div>
              <div>
                <label style={{ fontFamily: "var(--body-font)", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 8, display: "block" }}>Image URL</label>
                <input type="text" placeholder="https://..." value={form.image} onChange={set("image")} style={{ width: "100%", padding: "12px 18px", borderRadius: 8, border: "1px solid var(--border-color)", fontFamily: "var(--body-font)", fontSize: 13, outline: "none", backgroundColor: "#FFFDFE" }} />
              </div>
            </div>
            <div>
              <label style={{ fontFamily: "var(--body-font)", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 8, display: "block" }}>
                <FaTruck style={{ marginRight: 6, color: "var(--primary-color)" }} /> Description
              </label>
              <textarea rows="4" placeholder="Detail the fabric, fit, and care instructions..." value={form.description} onChange={set("description")} />
            </div>
          </div>

          <div className="form-right-col">
            <label style={{ fontFamily: "var(--body-font)", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 8, display: "block" }}>
              <FaImage style={{ marginRight: 6, color: "var(--primary-color)" }} /> Product Media
            </label>
            <div
              className={`upload-box${dragOver ? " drag-over" : ""}`}
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileInputRef.current && fileInputRef.current.click();
                }
              }}
            >
              <FaUpload className="upload-icon" />
              <span>{mediaFiles.length ? `${mediaFiles.length} file${mediaFiles.length > 1 ? "s" : ""} selected` : "Click to upload or drag and drop"}</span>
              <p>SVG, PNG, JPG or GIF (max. 800x400px)</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={(e) => {
                handleFiles(e.target.files);
                e.target.value = "";
              }}
            />
            {mediaFiles.length > 0 && (
              <div className="media-preview-grid">
                {mediaFiles.map((url, idx) => (
                  <div className="media-preview-item" key={idx}>
                    <img src={url} alt={`media-${idx + 1}`} />
                    <button type="button" className="media-remove-btn" onClick={() => removeMedia(idx)} title="Remove image">
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {form.image && mediaFiles.length === 0 && (
              <img src={form.image} alt="Preview" style={{ width: "100%", borderRadius: 12, marginTop: 15, border: "1px solid var(--border-color)" }} />
            )}
            <label style={{ fontFamily: "var(--body-font)", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 8, display: "block" }}>
              <FaTags style={{ marginRight: 6, color: "var(--primary-color)" }} /> Product Status
            </label>
            <select value={form.status || "Active"} onChange={set("status")}>
              <option value="Active">Active (Visible)</option>
              <option value="Inactive">Draft (Hidden)</option>
            </select>
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

const InventorySection = ({ products }) => {
  const [search, setSearch] = useState("");
  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 4).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const stockClass = (p) => {
    if (p.stock === 0) return "cancelled";
    if (p.stock <= 4) return "pending";
    return "delivered";
  };
  const stockLabel = (p) => {
    if (p.stock === 0) return "0 (Out of Stock)";
    if (p.stock <= 4) return `${p.stock} (Low Stock)`;
    return `${p.stock} (In Stock)`;
  };

  return (
    <div className="admin-products-view fade-in">
      <div className="section-title-row">
        <div>
          <h2>Inventory Management</h2>
          <p className="subtitle">Manage your product stock levels and updates.</p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="admin-btn-secondary"><FaDownload /> Export</button>
          <button className="admin-btn-primary"><FaPlus /> Add Item</button>
        </div>
      </div>

      <div className="summary-cards-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        <div className="summary-card">
          <div className="card-top">
            <div>
              <span>Total Stock</span>
              <h3>{totalStock}</h3>
            </div>
            <div className="card-icon-circle"><FaBoxes /></div>
          </div>
          <div className="card-trend upward"><FaArrowUp /> 5% this week</div>
        </div>
        <div className="summary-card">
          <div className="card-top">
            <div>
              <span>Low Stock</span>
              <h3>{lowStock}</h3>
            </div>
            <div className="card-icon-circle"><FaExclamationTriangle /></div>
          </div>
          <div className="card-trend" style={{ color: "#D4AF37" }}>Items need attention</div>
        </div>
        <div className="summary-card">
          <div className="card-top">
            <div>
              <span>Out of Stock</span>
              <h3>{outOfStock}</h3>
            </div>
            <div className="card-icon-circle"><FaTimes /></div>
          </div>
          <div className="card-trend" style={{ color: "#F5222D" }}>Requires immediate action</div>
        </div>
      </div>

      <div className="table-controls-card">
        <div className="search-box-wrapper">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search inventory..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="admin-btn-secondary"><FaFilter /> Filter</button>
          <button className="admin-btn-secondary"><FaSort /> Sort</button>
        </div>
      </div>

      <div className="table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th><th>SKU</th><th>Category</th><th>Stock Level</th><th>Price</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: "center", padding: "30px", color: "#8E7A6B" }}>No inventory items found.</td></tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="tbl-product-cell">
                      <img src={p.image} alt={p.name} />
                      <strong>{p.name}</strong>
                    </div>
                  </td>
                  <td>{p.sku}</td>
                  <td>{p.category}</td>
                  <td><span className={`status-badge-inline ${stockClass(p)}`}>{stockLabel(p)}</span></td>
                  <td>₹{p.price.toLocaleString()}</td>
                  <td>
                    <button className="tbl-action-btn check" title="Update Stock"><FaSyncAlt /></button>
                    <button className="tbl-action-btn delete" title="More"><FaAngleDown /></button>
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

const OrdersSection = ({ orders }) => {
  const [tab, setTab] = useState("All Orders");
  const tabs = [
    { name: "All Orders", key: "All" },
    { name: "Pending", key: "Pending" },
    { name: "Processing", key: "Processing" },
    { name: "Shipped", key: "Shipped" },
    { name: "Delivered", key: "Delivered" },
    { name: "Cancelled", key: "Cancelled" },
  ];
  const filtered = tab === "All Orders" ? orders : orders.filter((o) => o.status === tab);

  return (
    <div className="admin-orders-view fade-in">
      <div className="section-title-row">
        <div>
          <h2>Order Management</h2>
          <p className="subtitle">Track and update the status of your orders.</p>
        </div>
        <div className="search-box-wrapper">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search orders..." />
        </div>
      </div>

      <div className="orders-filter-bar">
        <div className="filter-tabs">
          {tabs.map((t) => (
            <button
              key={t.name}
              className={`filter-tab ${tab === t.name ? "active" : ""}`}
              onClick={() => setTab(t.name)}
            >
              {t.name}
              {t.key !== "All" && <span style={{ marginLeft: 5, fontSize: 10 }}>{ORDER_COUNTS[t.key]}</span>}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 15, marginBottom: 25, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="admin-btn-secondary"><FaFilter /> Filter</button>
          <button className="admin-btn-secondary"><FaCalendarAlt /> Last 30 Days</button>
        </div>
        <button className="admin-btn-primary"><FaDownload /> Export CSV</button>
      </div>

      <div className="table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Order ID</th><th>Customer</th><th>Product</th><th>Date</th>
              <th>Amount</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="8" style={{ textAlign: "center", padding: "30px", color: "#8E7A6B" }}>No orders under "{tab}".</td></tr>
            ) : (
              filtered.map((o) => (
                <tr key={o.id}>
                  <td><input type="checkbox" /></td>
                  <td><strong>#{o.id}</strong></td>
                  <td>
                    <div className="tbl-product-cell">
                      <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&q=80" alt={o.customer} className="avatar" />
                      {o.customer}
                    </div>
                  </td>
                  <td>{o.product}</td>
                  <td>{o.date}</td>
                  <td><strong>₹{o.amount.toLocaleString()}</strong></td>
                  <td><span className={`status-badge-inline ${badgeClass(o.status)}`}>{o.status}</span></td>
                  <td>
                    <button className="tbl-action-btn check" title="View Details"><FaEye /></button>
                    <button className="tbl-action-btn delete" title="Print Invoice"><FaDownload /></button>
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

const EarningsSection = () => (
  <div className="admin-analytics-view fade-in">
    <div className="section-title-row">
      <div>
        <h2>Earnings Overview</h2>
        <p className="subtitle">Track your earnings, payouts and sales performance.</p>
      </div>
      <div className="date-picker-box"><FaCalendarAlt /><span>This Year</span></div>
    </div>

    <div className="analytics-metrics-grid">
      <div className="analytics-metric-card">
        <span>Today's Earnings</span>
        <h3>₹8,450</h3>
        <p className="text-pink"><FaArrowUp /> +12% today</p>
      </div>
      <div className="analytics-metric-card">
        <span>This Month</span>
        <h3>₹78,200</h3>
        <p className="text-pink"><FaArrowUp /> +5% from last month</p>
      </div>
      <div className="analytics-metric-card">
        <span>Total Earnings</span>
        <h3>₹3,48,950</h3>
        <p className="text-pink"><FaWallet /> Lifetime</p>
      </div>
      <div className="analytics-metric-card" style={{ borderLeft: "4px solid #D4AF37" }}>
        <span>Pending Payout</span>
        <h3>₹12,800</h3>
        <p><FaClock /> Settles in 3 days</p>
      </div>
    </div>

    <div className="analytics-charts-grid">
      <div className="analytics-chart-card">
        <h3>Monthly Revenue</h3>
        <div className="svg-chart-container-large">
          <svg viewBox="0 0 500 220" width="100%" height="100%">
            {REVENUE_DATA.map((d, i) => {
              const barH = (d.v / 100) * 150;
              const spacing = 480 / REVENUE_DATA.length;
              const x = 20 + i * spacing + spacing * 0.25;
              const y = 190 - barH;
              return (
                <g key={d.m}>
                  <rect x={x} y={y} width={spacing * 0.5} height={barH} fill={d.v === 85 ? "#D94C7A" : "#EF6F8F"} rx="4" />
                  <text x={x + spacing * 0.25} y="210" textAnchor="middle" fill="#8E7A6B" fontSize="10">{d.m}</text>
                </g>
              );
            })}
            <line x1="15" y1="190" x2="490" y2="190" stroke="#F5ECEF" strokeWidth="1" />
          </svg>
        </div>
      </div>

      <div className="analytics-chart-card">
        <h3>Sales Report</h3>
        <div className="donut-chart-wrapper" style={{ gap: 20 }}>
          <div className="donut-svg-container">
            <svg viewBox="0 0 150 150" width="150" height="150">
              <circle cx="75" cy="75" r="55" fill="none" stroke="#F5ECEF" strokeWidth="18" />
              <circle cx="75" cy="75" r="55" fill="none" stroke="#EF6F8F" strokeWidth="18" strokeDasharray="138 208" strokeDashoffset="0" transform="rotate(-90 75 75)" />
              <circle cx="75" cy="75" r="55" fill="none" stroke="#D94C7A" strokeWidth="18" strokeDasharray="69 277" strokeDashoffset="-138" transform="rotate(-90 75 75)" />
              <circle cx="75" cy="75" r="55" fill="none" stroke="#D4AF37" strokeWidth="18" strokeDasharray="52 294" strokeDashoffset="-207" transform="rotate(-90 75 75)" />
              <circle cx="75" cy="75" r="55" fill="none" stroke="#8E7A6B" strokeWidth="18" strokeDasharray="35 311" strokeDashoffset="-259" transform="rotate(-90 75 75)" />
            </svg>
            <div className="donut-center-lbl"><h5>1,250</h5><span>Items Sold</span></div>
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

    <div className="summary-cards-grid" style={{ marginTop: 30, gridTemplateColumns: "repeat(4, 1fr)" }}>
      {[
        ["Orders", "425"],
        ["Revenue", "₹3,48,950"],
        ["Avg Order Value", "₹820"],
        ["Return Rate", "2.1%"],
      ].map(([label, val]) => (
        <div className="summary-card" key={label}>
          <div className="card-top">
            <div>
              <span>{label}</span>
              <h3>{val}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ReviewsSection = ({ reviews, deleteReview }) => {
  const [filter, setFilter] = useState("All Reviews");
  const filtered =
    filter === "Pending"
      ? reviews.filter((r) => r.status === "Pending")
      : filter === "With Photos"
        ? reviews.slice(0, 2)
        : reviews;

  return (
    <div className="admin-reviews-view fade-in">
      <div className="section-title-row">
        <div>
          <h2>Customer Reviews</h2>
          <p className="subtitle">Monitor and respond to customer feedback.</p>
        </div>
      </div>

      <div className="list-card" style={{ marginBottom: 30 }}>
        <div style={{ display: "flex", gap: 40, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ textAlign: "center", minWidth: 140 }}>
            <h3 style={{ fontSize: 44, fontWeight: 700, color: "var(--primary-color)", marginBottom: 4 }}>4.8</h3>
            <Stars count={5} />
            <p className="subtitle" style={{ marginTop: 6 }}>Based on 425 orders</p>
          </div>
          <div style={{ flex: 1, minWidth: 260 }}>
            {RATING_BREAKDOWN.map((r) => (
              <div key={r.stars} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ width: 16, fontSize: 12 }}>{r.stars}</span>
                <FaStar className="star-active" style={{ fontSize: 12 }} />
                <div style={{ flex: 1, height: 8, borderRadius: 99, backgroundColor: "#F5ECEF", overflow: "hidden" }}>
                  <div style={{ height: "100%", backgroundColor: "var(--primary-color)", borderRadius: 99, width: `${r.width}%` }} />
                </div>
                <span style={{ width: 32, textAlign: "right", fontSize: 12, color: "var(--text-muted)" }}>{r.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 15, marginBottom: 25, flexWrap: "wrap" }}>
        <div className="filter-tabs">
          {["All Reviews", "Pending", "With Photos"].map((f) => (
            <button key={f} className={`filter-tab ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
        <button className="admin-btn-secondary"><FaSort /> Sort</button>
      </div>

      <div className="table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Customer</th><th>Product</th><th>Rating</th><th>Review</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: "center", padding: "30px", color: "#8E7A6B" }}>No reviews match this filter.</td></tr>
            ) : (
              filtered.map((rev) => (
                <tr key={rev.id}>
                  <td>
                    <div className="tbl-product-cell">
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&q=80" alt={rev.customer} className="avatar" />
                      {rev.customer}
                    </div>
                  </td>
                  <td>{rev.product}</td>
                  <td><Stars count={rev.rating} /></td>
                  <td className="review-text-cell">{rev.review}</td>
                  <td><span className={`status-badge-inline ${rev.status === "Approved" ? "active" : "pending"}`}>{rev.status}</span></td>
                  <td>
                    <button className="tbl-action-btn check" title="Reply"><FaReply /></button>
                    <button className="tbl-action-btn delete" onClick={() => deleteReview(rev.id)} title="Delete"><FaTrash /></button>
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

const ProfileSection = ({ profile, updateProfile }) => {
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
          <p className="subtitle">Manage your seller account and business details.</p>
        </div>
      </div>

      <div className="profile-dashboard-layout">
        <div className="profile-stats-column">
          <div className="profile-stat-card">
            <span className="card-title">Conversion Rate</span>
            <div className="card-value">4.8%</div>
            <div className="card-growth"><FaArrowUp /> +1.2% this month</div>
          </div>

          <div className="profile-stat-card">
            <span className="card-title">Store Rating</span>
            <div className="card-value">
              4.9 <span className="star-icon">★</span>
            </div>
            <div className="card-growth"><FaArrowUp /> +0.1 this month</div>
          </div>

          <div className="profile-stat-card">
            <span className="card-title">Repeat Customers</span>
            <div className="card-value">34%</div>
            <div className="card-growth card-growth-stable">Stable this month</div>
          </div>

          <div className="profile-stat-card">
            <span className="card-title">Products Sold</span>
            <div className="card-value">1,250</div>
            <div className="card-growth"><FaArrowUp /> +124 this month</div>
          </div>
        </div>

        <div className="form-card profile-settings-card">
          <form className="profile-form" onSubmit={handleSave}>
            <div className="avatar-upload-box">
              <img src={form.img} alt={form.name} className="avatar-large" />
              <div className="avatar-info-box">
                <h4>{form.storeName}</h4>
                <p>Update your profile photo via URL</p>
                <input
                  type="text"
                  className="url-input"
                  placeholder="Image URL"
                  value={form.img}
                  onChange={(e) => setForm({ ...form, img: e.target.value })}
                />
              </div>
            </div>

            <hr className="profile-divider" />

            <div className="profile-form-grid">
              <div>
                <label className="profile-form-label">Full Name</label>
                <div className="input-with-icon">
                  <FaUserAlt className="input-icon" />
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="profile-form-label">Email Address</label>
                <div className="input-with-icon">
                  <FaEnvelope className="input-icon" />
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="profile-form-label">Store Name</label>
                <div className="input-with-icon">
                  <FaStore className="input-icon" />
                  <input type="text" value={form.storeName} onChange={(e) => setForm({ ...form, storeName: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="profile-form-label">Contact Number</label>
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
    </div>
  );
};

const SettingsSection = ({ settings, updateSettings }) => {
  const [activeTab, setActiveTab] = useState("General");
  const [form, setForm] = useState({ ...settings });
  const [saved, setSaved] = useState(false);

  const tabs = [
    { name: "General", icon: <FaStore /> },
    { name: "Payment", icon: <FaCreditCard /> },
    { name: "Shipping", icon: <FaTruck /> },
    { name: "Email", icon: <FaEnvelope /> },
    { name: "Social Media", icon: <FaShareAlt /> },
    { name: "Store Policy", icon: <FaFileContract /> },
  ];

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
          {tabs.map((tab) => (
            <button
              key={tab.name}
              type="button"
              className={`settings-tab-btn ${activeTab === tab.name ? "active" : ""}`}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
        <div className="settings-form-container">
          <form onSubmit={(e) => e.preventDefault()}>
            {activeTab === "General" ? (
              <div className="settings-form-tab fade-in">
                <h3>General Settings</h3>
                <div className="settings-form-grid">
                  <div>
                    <label style={{ fontFamily: "var(--body-font)", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 8, display: "block" }}>Store Name</label>
                    <input type="text" value={form.storeName} onChange={(e) => setForm({ ...form, storeName: e.target.value })} style={{ width: "100%", padding: "12px 18px", borderRadius: 8, border: "1px solid var(--border-color)", fontFamily: "var(--body-font)", fontSize: 13, outline: "none", backgroundColor: "#FFFDFE" }} />
                  </div>
                  <div>
                    <label style={{ fontFamily: "var(--body-font)", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 8, display: "block" }}>Seller ID</label>
                    <input type="text" value="FO-98273-X" disabled style={{ width: "100%", padding: "12px 18px", borderRadius: 8, border: "1px solid var(--border-color)", fontFamily: "var(--body-font)", fontSize: 13, outline: "none", backgroundColor: "#FFF8FA", color: "var(--text-muted)" }} />
                  </div>
                  <div>
                    <label style={{ fontFamily: "var(--body-font)", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 8, display: "block" }}>Store Email</label>
                    <input type="email" value={form.storeEmail} onChange={(e) => setForm({ ...form, storeEmail: e.target.value })} style={{ width: "100%", padding: "12px 18px", borderRadius: 8, border: "1px solid var(--border-color)", fontFamily: "var(--body-font)", fontSize: 13, outline: "none", backgroundColor: "#FFFDFE" }} />
                  </div>
                  <div>
                    <label style={{ fontFamily: "var(--body-font)", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 8, display: "block" }}>Contact Number</label>
                    <input type="text" value={form.contactNumber} onChange={(e) => setForm({ ...form, contactNumber: e.target.value })} style={{ width: "100%", padding: "12px 18px", borderRadius: 8, border: "1px solid var(--border-color)", fontFamily: "var(--body-font)", fontSize: 13, outline: "none", backgroundColor: "#FFFDFE" }} />
                  </div>
                  <div>
                    <label style={{ fontFamily: "var(--body-font)", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 8, display: "block" }}>Store Logo Initials</label>
                    <div className="logo-preview-row">
                      <div className="logo-badge-mock">{form.storeLogo}</div>
                      <input type="text" value={form.storeLogo} onChange={(e) => setForm({ ...form, storeLogo: e.target.value })} maxLength={3} style={{ width: "100%", padding: "12px 18px", borderRadius: 8, border: "1px solid var(--border-color)", fontFamily: "var(--body-font)", fontSize: 13, outline: "none", backgroundColor: "#FFFDFE" }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontFamily: "var(--body-font)", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 8, display: "block" }}>Support Phone</label>
                    <input type="tel" value={form.contactNumber} onChange={(e) => setForm({ ...form, contactNumber: e.target.value })} style={{ width: "100%", padding: "12px 18px", borderRadius: 8, border: "1px solid var(--border-color)", fontFamily: "var(--body-font)", fontSize: 13, outline: "none", backgroundColor: "#FFFDFE" }} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="settings-form-tab fade-in">
                <h3>{activeTab} Settings</h3>
                <p className="text-muted py-4 text-center" style={{ fontSize: 14 }}>
                  Settings configurations for '{activeTab}' are active and set to standard merchant sandbox profiles.
                </p>
              </div>
            )}
            <div className="settings-action-row">
              {saved && <span className="save-success-msg">Settings saved successfully!</span>}
              <button type="button" className="admin-btn-primary" onClick={handleSave}><FaSave /> Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const SellerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth > 992);
  const [activeSection, setActiveSection] = useState("dashboard");

  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [settings, setSettings] = useState({
    storeName: "Fashion Oasis",
    storeLogo: "FO",
    storeEmail: "seller@fashionoasis.store",
    contactNumber: "+91 98765 43210",
  });
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@fashionoasis.store",
    storeName: "Fashion Oasis",
    phone: "+91 98765 43210",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80",
  });

  const sidebarLinks = [
    { name: "Dashboard", key: "dashboard", icon: <FaChartPie /> },
    { name: "Products", key: "products", icon: <FaBox /> },
    { name: "Add Product", key: "add-product", icon: <FaPlus /> },
    { name: "Inventory", key: "inventory", icon: <FaBoxes /> },
    { name: "Orders", key: "orders", icon: <FaShoppingCart /> },
    { name: "Earnings", key: "earnings", icon: <FaRupeeSign /> },
    { name: "Reviews", key: "reviews", icon: <FaStar /> },
    { name: "Profile", key: "profile", icon: <FaUserCircle /> },
    { name: "Settings", key: "settings", icon: <FaCog /> },
  ];

  const addProduct = (p) => setProducts([p, ...products]);
  const deleteProduct = (id) => setProducts(products.filter((p) => p.id !== id));
  const toggleStatus = (id) =>
    setProducts(products.map((p) => (p.id === id ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" } : p)));
  const deleteReview = (id) => setReviews(reviews.filter((r) => r.id !== id));

  const renderSection = () => {
    switch (activeSection) {
      case "products":
        return (
          <ProductsSection
            products={products}
            onAddProduct={() => setActiveSection("add-product")}
            deleteProduct={deleteProduct}
            toggleStatus={toggleStatus}
          />
        );
      case "add-product":
        return <AddProductSection addProduct={addProduct} onBack={() => setActiveSection("products")} />;
      case "inventory":
        return <InventorySection products={products} />;
      case "orders":
        return <OrdersSection orders={orders} />;
      case "earnings":
        return <EarningsSection />;
      case "reviews":
        return <ReviewsSection reviews={reviews} deleteReview={deleteReview} />;
      case "profile":
        return <ProfileSection profile={profile} updateProfile={(p) => setProfile((prev) => ({ ...prev, ...p }))} />;
      case "settings":
        return <SettingsSection settings={settings} updateSettings={setSettings} />;
      default:
        return (
          <OverviewSection
            products={products}
            orders={orders}
            onAddProduct={() => setActiveSection("add-product")}
          />
        );
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
            <img src={logo} alt="Fashion Oasis Logo" className="admin-header-logo" />
            <div>
              <p>Seller Central</p>
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
          <div className="profile-badge-link" style={{ cursor: "pointer" }} onClick={() => setActiveSection("profile")}>
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
                  onClick={() => {
                    setActiveSection(link.key);
                    setSidebarOpen(false);
                  }}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="sidebar-footer">
            <button className="sidebar-link logout-btn">
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
        💎 Seller Dashboard — Fashion Oasis theme — Elegant, Soft &amp; Luxurious ❤
      </footer>
    </div>
  );
};

export default SellerDashboard;
