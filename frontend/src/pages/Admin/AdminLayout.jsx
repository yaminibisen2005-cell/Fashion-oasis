import React, { useState, useEffect } from "react";
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

import {
  fetchProducts as getProducts,
  createProduct,
  deleteProduct as removeProduct,
  toggleProductStatus as setProductStatus,
  fetchCategories as getCategories,
  createCategory,
  deleteCategory as removeCategory,
  toggleCategoryStatus as setCategoryStatus,
  fetchOrders as getOrders,
  updateOrderStatus as setOrderStatus,
  fetchCustomers as getCustomers,
  toggleCustomerStatus as setCustomerStatus,
  fetchReviews as getReviews,
  toggleReviewStatus as setReviewStatus,
  deleteReview as removeReview,
  fetchCoupons as getCoupons,
  createCoupon as addCouponAPI,
  deleteCoupon as removeCoupon,
  toggleCouponStatus as setCouponStatus,
} from "../../api/admin";

import "./AdminLayout.css";
import logo from "../../assets/logo.png";
const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) navigate("/admin/login");
  }, []);

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
      const data = await getProducts(page, limit);
      if (data.success) {
        setProducts(data.data);
        if (data.pagination) setPagination(data.pagination);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      if (data.success) setCategories(data.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrdersList();
  }, []);

  const fetchOrdersList = async (page = 1, limit = 10) => {
    try {
      const data = await getOrders(page, limit);
      if (data.success) {
        const mappedOrders = data.data.map(o => ({
          id: o._id,
          orderId: o.orderId,
          customer: o.customerName || o.customerEmail || "Guest",
          date: new Date(o.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
          amount: o.totalAmount,
          status: o.status
        }));
        setOrders(mappedOrders);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomersList();
  }, []);

  const fetchCustomersList = async (page = 1, limit = 10) => {
    try {
      const data = await getCustomers(page, limit);
      if (data.success) {
        const mappedCustomers = data.data.map(c => ({
          id: c._id,
          name: `${c.firstName} ${c.lastName}`.trim() || 'No Name',
          email: c.email,
          orders: c.ordersCount,
          spent: c.spent,
          status: c.status,
          img: c.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80"
        }));
        setCustomers(mappedCustomers);
      }
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviewsList();
  }, []);

  const fetchReviewsList = async () => {
    try {
      const data = await getReviews();
      if (data.success) {
        setReviews(data.data);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetchCouponsList();
  }, []);

  const fetchCouponsList = async () => {
    try {
      const data = await getCoupons();
      if (data.success) {
        setCoupons(data.data);
      }
    } catch (err) {
      console.error("Error fetching coupons:", err);
    }
  };

  const [settings, setSettings] = useState({
    storeName: "Fashion Oasis",
    storeLogo: "FO",
    storeEmail: "fashionoasis082@gmail.com",
    contactNumber: "+91 7739479666",
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
      const data = await removeProduct(id);
      if (data.success) setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const toggleProductStatus = async (id) => {
    try {
      const data = await setProductStatus(id);
      if (data.success) {
        setProducts(
          products.map((p) =>
            p._id === id ? { ...p, status: data.data.status } : p
          )
        );
      }
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  const addCategory = async (newC) => {
    try {
      const data = await createCategory(newC.name);
      if (data.success) {
        setCategories([data.data, ...categories]);
        return true;
      }
    } catch (err) {
      console.error("Error adding category:", err);
      return false;
    }
  };

  const deleteCategory = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this category?");
    if (!isConfirmed) return;

    try {
      const data = await removeCategory(id);
      if (data.success) setCategories(categories.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  const toggleCategoryStatus = async (id) => {
    try {
      const data = await setCategoryStatus(id);
      if (data.success) {
        setCategories(
          categories.map((c) =>
            c._id === id ? { ...c, status: data.data.status } : c
          )
        );
      }
    } catch (err) {
      console.error("Error toggling category status:", err);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const data = await setOrderStatus(orderId, newStatus);
      if (data.success) {
        setOrders(
          orders.map((o) => (o.id === orderId ? { ...o, status: data.data.status } : o))
        );
      }
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  const toggleCustomerStatus = async (id) => {
    try {
      const data = await setCustomerStatus(id);
      if (data.success) {
        setCustomers(
          customers.map((cust) =>
            cust.id === id ? { ...cust, status: data.data.status } : cust
          )
        );
      }
    } catch (err) {
      console.error("Error toggling customer status:", err);
    }
  };

  const deleteReview = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this review?");
    if (!isConfirmed) return;

    try {
      const data = await removeReview(id);
      if (data.success) {
        setReviews(reviews.filter((r) => r._id !== id));
      }
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };
  
  const toggleReviewStatus = async (id) => {
    try {
      const data = await setReviewStatus(id);
      if (data.success) {
        setReviews(
          reviews.map((rev) => (rev._id === id ? { ...rev, status: data.data.status } : rev))
        );
      }
    } catch (err) {
      console.error("Error toggling review status:", err);
    }
  };

  const addCoupon = async (newCp) => {
    try {
      const data = await addCouponAPI(newCp);
      if (data.success) {
        setCoupons([data.data, ...coupons]);
        return true;
      }
    } catch (err) {
      console.error("Error adding coupon:", err);
      return false;
    }
  };
  
  const deleteCoupon = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this coupon?");
    if (!isConfirmed) return;

    try {
      const data = await removeCoupon(id);
      if (data.success) {
        setCoupons(coupons.filter((cp) => cp._id !== id));
      }
    } catch (err) {
      console.error("Error deleting coupon:", err);
    }
  };
  
  const toggleCouponStatus = async (id) => {
    try {
      const data = await setCouponStatus(id);
      if (data.success) {
        setCoupons(
          coupons.map((cp) =>
            cp._id === id ? { ...cp, status: data.data.status } : cp
          )
        );
      }
    } catch (err) {
      console.error("Error toggling coupon status:", err);
    }
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
