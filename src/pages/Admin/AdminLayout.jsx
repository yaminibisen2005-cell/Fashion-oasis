import React, { useState } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
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
  const [products, setProducts] = useState([
    { id: 1, name: "Floral Diamond Necklace", category: "Necklace", price: 240000, stock: 25, status: "Active", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&q=80" },
    { id: 2, name: "Gold Plated Earrings", category: "Earrings", price: 135000, stock: 40, status: "Active", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&q=80" },
    { id: 3, name: "Pearl Drop Earrings", category: "Earrings", price: 127500, stock: 35, status: "Active", image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=200&q=80" },
    { id: 4, name: "Classic Gold Ring", category: "Rings", price: 86000, stock: 20, status: "Inactive", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&q=80" },
  ]);

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

  const [profile, setProfile] = useState({
    name: "Admin",
    email: "admin@fashionoasis.com",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80",
  });

  // --- Handlers ---
  const addProduct = (newP) => setProducts([newP, ...products]);
  const deleteProduct = (id) => setProducts(products.filter((p) => p.id !== id));
  const toggleProductStatus = (id) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" } : p
      )
    );
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
            <Link to="/" className="sidebar-link logout-btn">
              <FaSignOutAlt />
              <span>Logout</span>
            </Link>
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
