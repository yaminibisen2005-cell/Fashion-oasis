import React, { useState, useRef, useEffect } from "react";
import { fetchSellerDashboardData, fetchSellerProducts, createSellerProduct, deleteSellerProduct, toggleSellerProductStatus, updateSellerProductStock, fetchSellerOrders, updateSellerOrderStatus, fetchSellerEarnings, loginSeller, fetchSellerReviews, deleteSellerReview, toggleSellerReviewStatus, getSellerProfile, updateSellerProfile } from "../../api/seller.js";
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
  FaBoxOpen,
  FaUsers,
} from "react-icons/fa";

import "../Admin/AdminLayout.css";
import "./SellerLayout.css";
import logo from "../../assets/logo.png";



const Stars = ({ count }) => (
  <div className="reviews-stars-row">
    {[...Array(5)].map((_, i) => (
      <FaStar key={i} className={i < count ? "star-active" : "star-inactive"} />
    ))}
  </div>
);

const badgeClass = (status) => status.toLowerCase().replace(/\s+/g, "-");

const OverviewSection = ({ onAddProduct, reviews = [] }) => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSellerDashboardData()
      .then(({ stats, recentOrders, topProducts, salesAnalytics }) => {
        if (stats.success) setStats(stats.data);
        if (recentOrders.success) setRecentOrders(recentOrders.data);
        if (topProducts.success) setTopSelling(topProducts.data);
        if (salesAnalytics.success) setSalesData(salesAnalytics.data.series || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="admin-dashboard-view" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300 }}>
        <p style={{ color: "#8E7A6B", fontSize: 16 }}>Loading overview data...</p>
      </div>
    );
  }

  const chartH = 130;
  const barMax = salesData.length > 0 ? Math.max(...salesData.map((d) => d.sales), 1) : 1;
  const spacing = salesData.length > 0 ? 240 / salesData.length : 30;
  const barW = Math.min(spacing * 0.5, 16);

  const totalRevenue = stats?.totalRevenue || 0;

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
              <h3>₹{Number(totalRevenue).toLocaleString()}</h3>
            </div>
            <div className="card-icon-circle"><FaWallet /></div>
          </div>
          <div className="card-trend upward"><FaArrowUp /> {stats?.revenueTrend || 0}% <span className="trend-lbl">vs last month</span></div>
        </div>

        <div className="summary-card">
          <div className="card-top">
            <div>
              <span>Total Orders</span>
              <h3>{stats?.totalOrders || 0}</h3>
            </div>
            <div className="card-icon-circle"><FaShoppingBag /></div>
          </div>
          <div className="card-trend upward"><FaArrowUp /> {stats?.ordersTrend || 0}% <span className="trend-lbl">today</span></div>
        </div>

        <div className="summary-card">
          <div className="card-top">
            <div>
              <span>Active Listings</span>
              <h3>{stats?.totalProducts || 0}</h3>
            </div>
            <div className="card-icon-circle"><FaBoxOpen /></div>
          </div>
          <div className="card-trend upward"><FaArrowUp /> {stats?.productsTrend || 0}% <span className="trend-lbl">new</span></div>
        </div>

        <div className="summary-card">
          <div className="card-top">
            <div>
              <span>Total Customers</span>
              <h3>{stats?.totalCustomers || 0}</h3>
            </div>
            <div className="card-icon-circle"><FaUsers /></div>
          </div>
          <div className="card-trend upward"><FaArrowUp /> {stats?.customersTrend || 0}% <span className="trend-lbl">growth</span></div>
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
              {salesData.length > 0 ? salesData.map((d, i) => {
                const barH = Math.max((d.sales / barMax) * chartH, 3);
                const x = 12 + i * spacing + (spacing - barW) / 2;
                const y = 130 - barH;
                const dayLabel = d.date.replace(/[a-z]/g, "").trim().slice(0, 3);
                return (
                  <g key={i}>
                    <rect x={x} y={y} width={barW} height={barH} fill={d.sales === barMax ? "#D94C7A" : "#EF6F8F"} rx="3" />
                    <text x={x + barW / 2} y="145" textAnchor="middle" fill="#8E7A6B" fontSize="7">{dayLabel}</text>
                  </g>
                );
              }) : <text x="130" y="75" textAnchor="middle" fill="#8E7A6B" fontSize="10">No data</text>}
              <line x1="8" y1="130" x2="252" y2="130" stroke="#F5ECEF" strokeWidth="1" />
            </svg>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Recent Orders</h3>
            <span className="view-all-link" style={{ cursor: "pointer" }}>View All</span>
          </div>
          <div className="recent-orders-list">
            {recentOrders.length > 0 ? recentOrders.map((o) => (
              <div className="recent-order-item" key={o._id}>
                <div className="order-item-prod">
                  <div className="order-prod-thumb"><span style={{ color: "#1890FF" }}>●</span></div>
                  <div>
                    <h4>#{o.orderId}</h4>
                  </div>
                </div>
                <span className={`status-badge-inline ${o.status.toLowerCase()}`}>{o.status}</span>
                <span className="order-amt">₹{Number(o.totalAmount).toLocaleString()}</span>
              </div>
            )) : <p style={{ fontSize: 13, color: '#8E7A6B', textAlign: 'center', marginTop: 20 }}>No orders yet.</p>}
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
            {topSelling.length > 0 ? topSelling.map((prod, idx) => (
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
            )) : <p style={{ fontSize: 13, color: '#8E7A6B', textAlign: 'center', padding: '20px 0' }}>No products yet.</p>}
          </div>
        </div>

        <div className="list-card">
          <div className="list-card-header">
            <h3>Recent Reviews</h3>
            <span className="view-all-link" style={{ cursor: "pointer" }}>View All</span>
          </div>
          <div className="dashboard-list">
            {reviews && reviews.length > 0 ? (
              reviews.slice(0, 3).map((r) => (
                <div className="list-item" key={r._id || r.id}>
                  <div className="item-left">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&q=80" alt={r.customer} className="avatar" />
                    <div>
                      <h4>{r.customer}</h4>
                      <p>{r.product}</p>
                    </div>
                  </div>
                  <div>
                    <Stars count={r.rating} />
                  </div>
                </div>
              ))
            ) : (
              <p style={{ fontSize: 13, color: '#8E7A6B', textAlign: 'center', padding: '20px 0' }}>No reviews yet.</p>
            )}
          </div>
        </div>

        <div className="list-card">
          <div className="list-card-header">
            <h3>Earnings Overview</h3>
            <span className="chart-range">Last 7 Days ▾</span>
          </div>
          <div className="revenue-summary">
            <h4>₹{Number(totalRevenue).toLocaleString()}</h4>
            <span className="text-pink"><FaArrowUp /> {stats?.revenueTrend || 0}% from last 7 days</span>
          </div>
          <div className="svg-chart-container bars-chart">
            <svg viewBox="0 0 250 120" width="100%" height="100%">
              {salesData.length > 0 ? salesData.map((d, i) => {
                const barH = Math.max((d.sales / barMax) * 90, 3);
                const x = 14 + i * spacing + (spacing - barW) / 2;
                const y = 100 - barH;
                const dayLabel = d.date.replace(/[a-z]/g, "").trim().slice(0, 3);
                return (
                  <g key={i}>
                    <rect x={x} y={y} width={barW} height={barH} fill="#EF6F8F" rx="3" />
                    <text x={x + barW / 2} y="115" textAnchor="middle" fill="#8E7A6B" fontSize="6">{dayLabel}</text>
                  </g>
                );
              }) : <text x="125" y="60" textAnchor="middle" fill="#8E7A6B" fontSize="10">No data</text>}
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

const InventorySection = ({ products, updateStock, onAddProduct }) => {
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

  const handleExport = () => {
    const headers = ["ID,Name,SKU,Category,Price,Stock,Status"];
    const rows = products.map(p => `${p.id},"${p.name}",${p.sku},${p.category},${p.price},${p.stock},${p.status}`);
    const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "inventory_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="admin-products-view fade-in">
      <div className="section-title-row">
        <div>
          <h2>Inventory Management</h2>
          <p className="subtitle">Manage your product stock levels and updates.</p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="admin-btn-secondary" onClick={handleExport}><FaDownload /> Export</button>
          <button className="admin-btn-primary" onClick={onAddProduct}><FaPlus /> Add Item</button>
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
                    <button className="tbl-action-btn check" title="Update Stock" onClick={() => {
                      const newStock = prompt(`Enter new stock level for ${p.name}:`, p.stock);
                      if (newStock !== null && !isNaN(newStock) && newStock.trim() !== '') {
                        updateStock(p.id, Number(newStock));
                      }
                    }}><FaSyncAlt /></button>
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

const OrdersSection = ({ orders, updateOrderStatus }) => {
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
              {t.key !== "All" && <span style={{ marginLeft: 5, fontSize: 10 }}>{orders.filter(o => o.status === t.key).length}</span>}
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
                  <td><span className={`status-badge-inline ${o.status.toLowerCase()}`}>{o.status}</span></td>
                  <td>
                    <button className="tbl-action-btn check" title="Update Status" onClick={() => {
                      const newStatus = prompt("Enter new status (Pending, Processing, Shipped, Delivered, Cancelled):", o.status);
                      if (newStatus && ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].includes(newStatus)) {
                        updateOrderStatus(o.id, newStatus);
                      }
                    }}><FaSyncAlt /></button>
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

const EarningsSection = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSellerEarnings()
      .then(res => {
        if (res.data?.success) setData(res.data.data);
        else setError('Failed to load earnings data.');
      })
      .catch(() => setError('Unable to reach server. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="admin-analytics-view" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
      <p style={{ color: '#8E7A6B', fontSize: 16 }}>Loading earnings data...</p>
    </div>
  );

  if (error) return (
    <div className="admin-analytics-view" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
      <p style={{ color: '#D94C7A', fontSize: 15 }}>{error}</p>
    </div>
  );

  const {
    todayEarnings = 0, todayOrders = 0, monthEarnings = 0, monthTrend = 0,
    lifetimeEarnings = 0, pendingPayout = 0, totalOrders = 0,
    avgOrderValue = 0, monthlyData = [], topProducts = []
  } = data || {};

  const chartH = 160;
  const barMax = Math.max(...monthlyData.map(d => d.revenue), 1);
  const barW = 22;
  const chartW = 500;
  const spacing = chartW / monthlyData.length;

  const totalTopRevenue = topProducts.reduce((s, p) => s + p.revenue, 0) || 1;
  const DONUT_COLORS = ['#EF6F8F', '#D94C7A', '#D4AF37', '#8E7A6B', '#a78bfa'];

  const circumference = 2 * Math.PI * 55;
  let donutOffset = 0;
  const donutSegments = topProducts.map((p, i) => {
    const pct = p.revenue / totalTopRevenue;
    const dash = pct * circumference;
    const seg = { pct, dash, offset: donutOffset, color: DONUT_COLORS[i % DONUT_COLORS.length] };
    donutOffset += dash;
    return seg;
  });

  return (
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
          <h3>₹{Number(todayEarnings).toLocaleString()}</h3>
          <p className="text-pink"><FaShoppingBag /> {todayOrders} orders today</p>
        </div>
        <div className="analytics-metric-card">
          <span>This Month</span>
          <h3>₹{Number(monthEarnings).toLocaleString()}</h3>
          <p className="text-pink">
            {monthTrend >= 0 ? <FaArrowUp /> : '↓'} {Math.abs(monthTrend)}% from last month
          </p>
        </div>
        <div className="analytics-metric-card">
          <span>Total Earnings</span>
          <h3>₹{Number(lifetimeEarnings).toLocaleString()}</h3>
          <p className="text-pink"><FaWallet /> Lifetime</p>
        </div>
        <div className="analytics-metric-card" style={{ borderLeft: '4px solid #D4AF37' }}>
          <span>Pending Payout</span>
          <h3>₹{Number(pendingPayout).toLocaleString()}</h3>
          <p><FaClock /> Pending orders</p>
        </div>
      </div>

      <div className="analytics-charts-grid">
        <div className="analytics-chart-card">
          <h3>Monthly Revenue</h3>
          <div className="svg-chart-container-large">
            <svg viewBox={`0 0 ${chartW} 220`} width="100%" height="100%">
              {monthlyData.map((d, i) => {
                const barH = Math.max((d.revenue / barMax) * chartH, d.revenue > 0 ? 4 : 0);
                const x = i * spacing + (spacing - barW) / 2;
                const y = 185 - barH;
                return (
                  <g key={i}>
                    <rect x={x} y={y} width={barW} height={barH}
                      fill={d.revenue === barMax && barMax > 0 ? '#D94C7A' : '#EF6F8F'} rx="4">
                      <title>₹{Number(d.revenue).toLocaleString()} ({d.orders} orders)</title>
                    </rect>
                    <text x={x + barW / 2} y="205" textAnchor="middle" fill="#8E7A6B" fontSize="9">{d.month}</text>
                  </g>
                );
              })}
              <line x1="0" y1="190" x2={chartW} y2="190" stroke="#F5ECEF" strokeWidth="1" />
            </svg>
          </div>
        </div>

        <div className="analytics-chart-card">
          <h3>Top Products by Revenue</h3>
          {topProducts.length === 0 ? (
            <p style={{ color: '#8E7A6B', fontSize: 13, textAlign: 'center', padding: '40px 0' }}>No product revenue data yet.</p>
          ) : (
            <div className="donut-chart-wrapper" style={{ gap: 20 }}>
              <div className="donut-svg-container">
                <svg viewBox="0 0 150 150" width="150" height="150">
                  <circle cx="75" cy="75" r="55" fill="none" stroke="#F5ECEF" strokeWidth="18" />
                  {donutSegments.map((seg, i) => (
                    <circle key={i} cx="75" cy="75" r="55" fill="none"
                      stroke={seg.color} strokeWidth="18"
                      strokeDasharray={`${seg.dash} ${circumference - seg.dash}`}
                      strokeDashoffset={-(seg.offset - circumference / 4)}
                      transform="rotate(-90 75 75)" />
                  ))}
                </svg>
                <div className="donut-center-lbl">
                  <h5>{topProducts.reduce((s, p) => s + p.sold, 0)}</h5>
                  <span>Items Sold</span>
                </div>
              </div>
              <div className="donut-legend">
                {topProducts.map((p, i) => (
                  <div className="legend-item" key={i}>
                    <span className="legend-dot" style={{ backgroundColor: DONUT_COLORS[i % DONUT_COLORS.length] }} />
                    <span title={p.name}>{p.name.length > 18 ? p.name.slice(0, 18) + '…' : p.name}</span>
                    <strong>{p.percentage}%</strong>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="summary-cards-grid" style={{ marginTop: 30, gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          ['Total Orders', totalOrders],
          ['Total Revenue', `₹${Number(lifetimeEarnings).toLocaleString()}`],
          ['Avg Order Value', `₹${Number(avgOrderValue).toLocaleString()}`],
          ['This Month', `₹${Number(monthEarnings).toLocaleString()}`],
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
};

const ReviewsSection = ({ reviews, deleteReview, toggleReviewStatus }) => {
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
            <h3 style={{ fontSize: 44, fontWeight: 700, color: "var(--primary-color)", marginBottom: 4 }}>
              {reviews.length > 0 ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1) : "0.0"}
            </h3>
            <Stars count={Math.round(reviews.length > 0 ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length) : 0)} />
            <p className="subtitle" style={{ marginTop: 6 }}>Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
          </div>
          <div style={{ flex: 1, minWidth: 260 }}>
            {[]}
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
                    <button className="tbl-action-btn check" onClick={() => toggleReviewStatus(rev.id)} title="Toggle Status">
                      {rev.status === "Approved" ? <FaTimes /> : <FaCheck />}
                    </button>
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
                  <input type="email" value={form.email} disabled style={{ backgroundColor: '#f5f5f5', color: '#999', cursor: 'not-allowed' }} />
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
  const [error, setError] = useState("");

  useEffect(() => {
    setForm({ ...settings });
  }, [settings]);

  const tabs = [
    { name: "General", icon: <FaStore /> },
    { name: "Payment", icon: <FaCreditCard /> },
    { name: "Shipping", icon: <FaTruck /> },
    { name: "Email", icon: <FaEnvelope /> },
    { name: "Social Media", icon: <FaShareAlt /> },
    { name: "Store Policy", icon: <FaFileContract /> },
  ];

  const handleSave = async () => {
    setError("");
    try {
      await updateSettings(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update settings");
    }
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
              {error && <span className="save-error-msg" style={{ color: "#D94C7A", marginRight: 15 }}>{error}</span>}
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
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("sellerToken"));
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [settings, setSettings] = useState({
    storeName: "Fashion Oasis",
    storeLogo: "FO",
    storeEmail: "seller@fashionoasis.store",
    contactNumber: "+91 98765 43210",
  });
  const [profile, setProfile] = useState({
    name: "Seller",
    email: "",
    storeName: "Fashion Oasis",
    phone: "",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const res = await loginSeller(loginForm.email, loginForm.password);
      if (res.data?.success) {
        localStorage.setItem('sellerToken', res.data.data.token);
        const u = res.data.data.user;
        setProfile(prev => ({ ...prev, name: u.name || 'Seller', email: u.email || '' }));
        setIsAuthenticated(true);
      }
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sellerToken');
    setIsAuthenticated(false);
    setLoginForm({ email: '', password: '' });
  };

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

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchSellerProducts().then((res) => {
      const formatted = res.data.data.map(p => ({ ...p, id: p._id }));
      setProducts(formatted);
    }).catch(console.error);

    fetchSellerOrders().then((res) => {
      const formatted = res.data.data.map(o => ({
        id: o._id,
        orderId: o.orderId || o._id.substring(0, 8),
        customer: o.customer?.name || o.customerEmail || 'Guest',
        product: o.items?.[0]?.productName + (o.items?.length > 1 ? ` (+${o.items.length - 1} more)` : ''),
        date: new Date(o.createdAt).toLocaleDateString(),
        amount: o.totalAmount,
        status: o.status
      }));
      setOrders(formatted);
    }).catch(console.error);

    fetchSellerReviews().then((res) => {
      if (res.data?.success) {
        setReviews(res.data.data.map(r => ({ ...r, id: r._id })));
      }
    }).catch(console.error);

    getSellerProfile().then((res) => {
      if (res.data?.success) {
        const u = res.data.data;
        setProfile(prev => ({ 
          ...prev, 
          name: u.name || 'Seller', 
          email: u.email || '', 
          storeName: u.storeName || 'Fashion Oasis',
          phone: u.phone || '',
          img: u.avatar || prev.img
        }));
        setSettings({
          storeName: u.storeName || "Fashion Oasis",
          storeLogo: u.storeLogo || "FO",
          storeEmail: u.storeEmail || "seller@fashionoasis.store",
          contactNumber: u.phone || "+91 98765 43210",
        });
      }
    }).catch(console.error);
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #FFECF5 0%, #FFF5F8 100%)' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: '48px 40px', boxShadow: '0 8px 32px rgba(217,76,122,0.12)', width: '100%', maxWidth: 400 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ fontFamily: 'var(--heading-font, serif)', color: '#D94C7A', fontSize: 28, marginBottom: 8 }}>Seller Login</h2>
            <p style={{ color: '#8E7A6B', fontSize: 14 }}>Sign in to your Fashion Oasis seller account</p>
          </div>
          {loginError && <div style={{ background: '#FEE2E2', color: '#D94C7A', padding: '10px 14px', borderRadius: 8, marginBottom: 20, fontSize: 13 }}>{loginError}</div>}
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#4A3728', marginBottom: 6 }}>Email</label>
              <input type="email" required value={loginForm.email}
                onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))}
                placeholder="seller@example.com"
                style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #F5ECEF', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#4A3728', marginBottom: 6 }}>Password</label>
              <input type="password" required value={loginForm.password}
                onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))}
                placeholder="••••••••"
                style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #F5ECEF', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <button type="submit" disabled={loginLoading}
              style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #D94C7A, #EF6F8F)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: loginLoading ? 'not-allowed' : 'pointer', opacity: loginLoading ? 0.7 : 1 }}>
              {loginLoading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }



  const addProduct = async (p) => {
    try {
      const res = await createSellerProduct(p);
      const newProd = { ...res.data.data, id: res.data.data._id };
      setProducts([newProd, ...products]);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteSellerProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (id) => {
    try {
      await toggleSellerProductStatus(id);
      setProducts(products.map((p) => (p.id === id ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" } : p)));
    } catch (err) {
      console.error(err);
    }
  };

  const updateStock = async (id, stock) => {
    try {
      await updateSellerProductStock(id, stock);
      setProducts(products.map((p) => (p.id === id ? { ...p, stock } : p)));
    } catch (err) {
      console.error(err);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await updateSellerOrderStatus(id, status);
      setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      await deleteSellerReview(id);
      setReviews(reviews.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleReviewStatus = async (id) => {
    try {
      await toggleSellerReviewStatus(id);
      setReviews(reviews.map((r) => (r.id === id ? { ...r, status: r.status === "Approved" ? "Pending" : "Approved" } : r)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProfile = async (p) => {
    try {
      const res = await updateSellerProfile({
        name: p.name,
        email: p.email,
        storeName: p.storeName,
        phone: p.phone,
        img: p.img
      });
      if (res.data?.success) {
        const u = res.data.data;
        setProfile(prev => ({ 
          ...prev, 
          name: u.name || 'Seller', 
          email: u.email || '', 
          storeName: u.storeName || 'Fashion Oasis',
          phone: u.phone || '',
          img: u.avatar || prev.img
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateSettings = async (s) => {
    try {
      const res = await updateSellerProfile({
        storeName: s.storeName,
        storeLogo: s.storeLogo,
        storeEmail: s.storeEmail,
        phone: s.contactNumber
      });
      if (res.data?.success) {
        const u = res.data.data;
        setSettings({
          storeName: u.storeName || "Fashion Oasis",
          storeLogo: u.storeLogo || "FO",
          storeEmail: u.storeEmail || "seller@fashionoasis.store",
          contactNumber: u.phone || "+91 98765 43210",
        });
        setProfile(prev => ({
          ...prev,
          storeName: u.storeName || 'Fashion Oasis',
          phone: u.phone || ''
        }));
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

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
        return <InventorySection products={products} updateStock={updateStock} onAddProduct={() => setActiveSection("add-product")} />;
      case "orders":
        return <OrdersSection orders={orders} updateOrderStatus={updateOrderStatus} />;
      case "earnings":
        return <EarningsSection />;
      case "reviews":
        return <ReviewsSection reviews={reviews} deleteReview={handleDeleteReview} toggleReviewStatus={handleToggleReviewStatus} />;
      case "profile":
        return <ProfileSection profile={profile} updateProfile={handleUpdateProfile} />;
      case "settings":
        return <SettingsSection settings={settings} updateSettings={handleUpdateSettings} />;
      default:
        return (
          <OverviewSection onAddProduct={() => setActiveSection("add-product")} reviews={reviews} />
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
            <button className="sidebar-link logout-btn" onClick={handleLogout}>
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
