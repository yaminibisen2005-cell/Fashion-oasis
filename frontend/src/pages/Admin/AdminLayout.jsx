import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaChartPie,
  FaBox,
  FaTags,
  FaShoppingCart,
  FaUsers,
  FaStar,
  FaPercentage,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaUserAlt,
} from "react-icons/fa";

// Sections imports
import DashboardSection from "./Sections/DashboardSection";
import ProductsSection from "./Sections/ProductsSection";
import AddProductSection from "./Sections/AddProductSection";
import CategoriesSection from "./Sections/CategoriesSection";
import OrdersSection from "./Sections/OrdersSection";
import CustomersSection from "./Sections/CustomersSection";
import ReviewsSection from "./Sections/ReviewsSection";
import CouponsSection from "./Sections/CouponsSection";
import AnalyticsSection from "./Sections/AnalyticsSection";
import SettingsSection from "./Sections/SettingsSection";
import ProfileSection from "./Sections/ProfileSection";

import "./AdminLayout.css";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // --- central states to enable dynamic flow ---
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, total: 0 });

  useEffect(() => {
    fetchProducts(pagination.currentPage);
  }, [pagination.currentPage]);

  const fetchProducts = async (page = 1, limit = 10) => {
    try {
      setLoadingProducts(true);
      const token = localStorage.getItem("adminToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get(`http://localhost:5000/api/v1/admin/products?page=${page}&limit=${limit}`, config);
      if (res.data.success) {
        setProducts(res.data.data);
        if (res.data.pagination) setPagination(res.data.pagination);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const [categories, setCategories] = useState([
    { name: "Necklace", productsCount: 68, status: "Active" },
    { name: "Earrings", productsCount: 85, status: "Active" },
    { name: "Rings", productsCount: 45, status: "Active" },
    { name: "Bracelets", productsCount: 32, status: "Inactive" },
    { name: "Accessories", productsCount: 20, status: "Active" },
  ]);

  const [orders, setOrders] = useState([
    { id: "1025", customer: "Priya Sharma", date: "18 May, 2024", amount: 12450, status: "Pending" },
    { id: "1024", customer: "Ananya Verma", date: "18 May, 2024", amount: 8750, status: "Processing" },
    { id: "1023", customer: "Neha Kapoor", date: "17 May, 2024", amount: 15800, status: "Shipped" },
    { id: "1022", customer: "Ritika Singh", date: "17 May, 2024", amount: 6250, status: "Delivered" },
  ]);

  const [customers, setCustomers] = useState([
    { name: "Priya Sharma", email: "priya@gmail.com", orders: 8, spent: 15890, status: "Active", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80" },
    { name: "Ananya Verma", email: "ananya@gmail.com", orders: 5, spent: 8750, status: "Active", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80" },
    { name: "Neha Kapoor", email: "neha@gmail.com", orders: 7, spent: 12450, status: "Active", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80" },
    { name: "Ritika Singh", email: "ritika@gmail.com", orders: 3, spent: 6250, status: "Active", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&q=80" },
  ]);

  const [reviews, setReviews] = useState([
    { customer: "Priya Sharma", product: "Floral Diamond Necklace", rating: 5, review: "Beautiful design!", status: "Approved" },
    { customer: "Ananya Verma", product: "Gold Plated Earrings", rating: 5, review: "Very elegant!", status: "Approved" },
    { customer: "Neha Kapoor", product: "Pearl Drop Earrings", rating: 4, review: "Loved it!", status: "Approved" },
    { customer: "Ritika Singh", product: "Classic Gold Ring", rating: 5, review: "Perfect fit", status: "Approved" },
  ]);

  const [coupons, setCoupons] = useState([
    { code: "OASIS10", discount: "10% OFF", minOrder: "₹999", expiryDate: "31 May 2024", status: "Active" },
    { code: "OASIS20", discount: "20% OFF", minOrder: "₹1999", expiryDate: "30 Jun 2024", status: "Active" },
    { code: "WELCOME5", discount: "5% OFF", minOrder: "₹499", expiryDate: "31 May 2024", status: "Inactive" },
    { code: "FREESHIP", discount: "Free Shipping", minOrder: "₹1499", expiryDate: "30 Jun 2024", status: "Active" },
  ]);

  const [settings, setSettings] = useState({
    storeName: "Fashion Oasis",
    storeLogo: "FO",
    storeEmail: "info@fashionoasis.com",
    contactNumber: "+91 98765 43210",
  });

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("adminUser");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { name: parsed.name || "Admin", email: parsed.email || "admin@fashionoasis.com", img: parsed.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80" };
      } catch (e) {}
    }
    return {
      name: "Admin",
      email: "admin@fashionoasis.com",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80",
    };
  });

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  // --- Handlers ---
  const addProduct = async (newP) => {
    try {
      const token = localStorage.getItem("adminToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.post("http://localhost:5000/api/v1/admin/products", newP, config);
      if (res.data.success) {
        // Simple optimistic update, but refreshing is safer for paginated data
        await fetchProducts(1); // Fetch the first page to show newly added if sorted by newest
        return true;
      }
    } catch (err) {
      console.error("Error adding product:", err);
      return false;
    }
  };

  const deleteProduct = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this product?");
    if (!isConfirmed) return;

    try {
      const token = localStorage.getItem("adminToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.delete(`http://localhost:5000/api/v1/admin/products/${id}`, config);
      if (res.data.success) setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const toggleProductStatus = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.patch(`http://localhost:5000/api/v1/admin/products/${id}/status`, {}, config);
      if (res.data.success) {
        setProducts(
          products.map((p) =>
            p._id === id ? { ...p, status: res.data.data.status } : p
          )
        );
      }
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  const addCategory = (newC) => setCategories([newC, ...categories]);
  const deleteCategory = (name) => setCategories(categories.filter((c) => c.name !== name));
  const toggleCategoryStatus = (name) => {
    setCategories(
      categories.map((c) =>
        c.name === name ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" } : c
      )
    );
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const toggleCustomerStatus = (name) => {
    setCustomers(
      customers.map((cust) =>
        cust.name === name
          ? { ...cust, status: cust.status === "Active" ? "Inactive" : "Active" }
          : cust
      )
    );
  };

  const deleteReview = (idx) => setReviews(reviews.filter((_, i) => i !== idx));
  const toggleReviewStatus = (idx) => {
    setReviews(
      reviews.map((rev, i) => (i === idx ? { ...rev, status: "Approved" } : rev))
    );
  };

  const addCoupon = (newCp) => setCoupons([newCp, ...coupons]);
  const deleteCoupon = (code) => setCoupons(coupons.filter((cp) => cp.code !== code));
  const toggleCouponStatus = (code) => {
    setCoupons(
      coupons.map((cp) =>
        cp.code === code ? { ...cp, status: cp.status === "Active" ? "Inactive" : "Active" } : cp
      )
    );
  };

  const updateSettings = (newS) => setSettings(newS);
  const updateProfile = (newP) => setProfile((prev) => ({ ...prev, ...newP }));

  const sidebarLinks = [
    { name: "Dashboard", path: "dashboard", icon: <FaChartPie /> },
    { name: "Products", path: "products", icon: <FaBox /> },
    { name: "Categories", path: "categories", icon: <FaTags /> },
    { name: "Orders", path: "orders", icon: <FaShoppingCart /> },
    { name: "Customers", path: "customers", icon: <FaUsers /> },
    { name: "Reviews", path: "reviews", icon: <FaStar /> },
    { name: "Coupons", path: "coupons", icon: <FaPercentage /> },
    { name: "Analytics", path: "analytics", icon: <FaChartLine /> },
    { name: "Settings", path: "settings", icon: <FaCog /> },
  ];

  // Helper to determine if link is active
  const isActive = (path) => {
    const currentSubpath = location.pathname.split("/")[2] || "dashboard";
    return currentSubpath === path;
  };

  return (
    <div className="admin-layout-container">
      {/* Top Header */}
      <header className="admin-header">
        <div className="header-left">
          <button className="mobile-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className="header-logo-group">
            <span className="logo-initial">{settings.storeLogo || "FO"}</span>
            <div>
              <h3>{settings.storeName || "FASHION OASIS"}</h3>
              <p>Timeless Elegance</p>
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
            <span className="badge-dot">3</span>
          </div>
          <div className="alert-badge-wrapper">
            <FaEnvelope />
            <span className="badge-dot">5</span>
          </div>
          
          <Link to="/admin/profile" className="profile-badge-link" style={{ textDecoration: "none" }}>
            <img src={profile.img} alt={profile.name} className="profile-thumb" />
            <div className="profile-meta">
              <h4>{profile.name}</h4>
              <p>Super Admin ▾</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="admin-body">
        {/* Sidebar */}
        <aside className={`admin-sidebar ${sidebarOpen ? "active" : ""}`}>
          <ul className="sidebar-links-list">
            {sidebarLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={`/admin/${link.path}`}
                  className={`sidebar-link ${isActive(link.path) ? "active" : ""}`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="sidebar-footer">
            <button onClick={handleLogout} className="sidebar-link logout-btn" style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer', textAlign: 'left' }}>
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="admin-main-content">
          <Routes>
            <Route
              path="/"
              element={
                <DashboardSection products={products} orders={orders} customers={customers} />
              }
            />
            <Route
              path="dashboard"
              element={
                <DashboardSection products={products} orders={orders} customers={customers} />
              }
            />
            <Route
              path="products"
              element={
                <ProductsSection
                  products={products}
                  deleteProduct={deleteProduct}
                  toggleProductStatus={toggleProductStatus}
                  pagination={pagination}
                  setPage={(page) => setPagination(prev => ({ ...prev, currentPage: page }))}
                />
              }
            />
            <Route
              path="add-product"
              element={
                <AddProductSection addProduct={addProduct} categories={categories} />
              }
            />
            <Route
              path="categories"
              element={
                <CategoriesSection
                  categories={categories}
                  addCategory={addCategory}
                  deleteCategory={deleteCategory}
                  toggleCategoryStatus={toggleCategoryStatus}
                />
              }
            />
            <Route
              path="orders"
              element={<OrdersSection orders={orders} updateOrderStatus={updateOrderStatus} />}
            />
            <Route
              path="customers"
              element={
                <CustomersSection
                  customers={customers}
                  toggleCustomerStatus={toggleCustomerStatus}
                />
              }
            />
            <Route
              path="reviews"
              element={
                <ReviewsSection
                  reviews={reviews}
                  deleteReview={deleteReview}
                  toggleReviewStatus={toggleReviewStatus}
                />
              }
            />
            <Route
              path="coupons"
              element={
                <CouponsSection
                  coupons={coupons}
                  addCoupon={addCoupon}
                  deleteCoupon={deleteCoupon}
                  toggleCouponStatus={toggleCouponStatus}
                />
              }
            />
            <Route path="analytics" element={<AnalyticsSection />} />
            <Route
              path="settings"
              element={<SettingsSection settings={settings} updateSettings={updateSettings} />}
            />
            <Route
              path="profile"
              element={<ProfileSection profile={profile} updateProfile={updateProfile} />}
            />
          </Routes>
        </main>
      </div>

      <footer className="admin-footer-sub text-center py-3">
        💎 This admin panel is designed with the Fashion Oasis theme – Elegant, Soft & Luxurious ❤
      </footer>
    </div>
  );
};

export default AdminLayout;
