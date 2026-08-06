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
  FaHandshake,
  FaCheckDouble,
  FaWallet,
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
import SellersSection from "./Sections/SellersSection";
import ProductApprovalsSection from "./Sections/ProductApprovalsSection";
import PayoutsSection from "./Sections/PayoutsSection";

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

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("storeSettings");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      storeName: "Fashion Oasis",
      storeLogo: "", // Base64 representation of custom logo
      storeEmail: "fashionoasis082@gmail.com",
      contactNumber: "+91 7739479666",
      cardEnabled: true,
      upiEnabled: true,
      netbankingEnabled: true,
      codEnabled: true,
      socialInstagram: "https://instagram.com/fashionoasis",
      socialFacebook: "https://facebook.com/fashionoasis",
      socialPinterest: "https://pinterest.com/fashionoasis",
      socialYoutube: "https://youtube.com/fashionoasis",
      policyType: "text",
      policyText: "Welcome to Fashion Oasis. Returns are accepted within 30 days...",
      policyFileName: "",
      policyFileData: "",
      sellerCommissionGlobal: 10,
      sellerCommissionNecklace: 12,
      sellerCommissionEarrings: 10,
      sellerCommissionRings: 12,
      sellerCommissionBracelets: 8,
      sellerDocGstin: true,
      sellerDocPan: true,
      sellerDocLicense: false,
      sellerAutoApprove: false,
      sellerAllowCoupons: true,
      sellerCouponSponsor: "seller",
      sellerMinPayout: 5000,
      sellerPayoutStripe: true,
      sellerPayoutBank: true,
      sellerPayoutPaypal: false,
    };
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

  // --- Seller management states ---
  const [sellers, setSellers] = useState([
    { id: 1, storeName: "Aura Jewels", contactPerson: "Rohan Mehra", email: "aura@jewels.com", logoInitials: "AJ", totalSales: 154000, rating: 4.8, status: "Active" },
    { id: 2, storeName: "Silver Elegance", contactPerson: "Simran Kaur", email: "silver@elegance.com", logoInitials: "SE", totalSales: 98000, rating: 4.6, status: "Active" },
    { id: 3, storeName: "Glow & Co", contactPerson: "Karan Johar", email: "glow@co.com", logoInitials: "GC", totalSales: 21000, rating: 4.2, status: "Suspended" },
  ]);

  const [pendingSellers, setPendingSellers] = useState([
    { id: 101, storeName: "Ornate Studio", contactPerson: "Meera Nair", email: "meera@ornate.com", appliedDate: "02 Aug 2026", docs: { gstin: "27AAAAA1111A1Z1", pan: "ABCDE1234F" } },
    { id: 102, storeName: "Vedic Craft", contactPerson: "Rahul Bose", email: "rahul@vedic.com", appliedDate: "05 Aug 2026", docs: { gstin: "27BBBBB2222B2Z2", pan: "XYZWH9876P" } },
  ]);

  const [pendingProducts, setPendingProducts] = useState([
    { id: 201, name: "Emerald Kundan Choker", sku: "KDN-EME-01", category: "Necklaces", price: 8500, sellerName: "Aura Jewels", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=120&q=80" },
    { id: 202, name: "Silver Filigree Hoops", sku: "FIL-SLV-02", category: "Earrings", price: 1800, sellerName: "Silver Elegance", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=120&q=80" },
  ]);

  const [withdrawalRequests, setWithdrawalRequests] = useState([
    { id: 301, sellerName: "Aura Jewels", walletBalance: 45000, amount: 15000, requestedDate: "04 Aug 2026", status: "Pending", bankDetails: { bankName: "ICICI Bank", accountNo: "1234567890", ifsc: "ICIC0001234" } },
    { id: 302, sellerName: "Silver Elegance", walletBalance: 28000, amount: 20000, requestedDate: "05 Aug 2026", status: "Pending", bankDetails: { bankName: "HDFC Bank", accountNo: "9876543210", ifsc: "HDFC0005678" } },
  ]);

  const [payoutHistory, setPayoutHistory] = useState([
    { id: 401, txnId: "TXN9832048", sellerName: "Glow & Co", amount: 12000, paidDate: "28 July 2026", status: "Paid" }
  ]);

  const handleApproveSeller = (id) => {
    const approved = pendingSellers.find(s => s.id === id);
    if (approved) {
      setSellers([...sellers, {
        id: approved.id,
        storeName: approved.storeName,
        contactPerson: approved.contactPerson,
        email: approved.email,
        logoInitials: approved.storeName.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase(),
        totalSales: 0,
        rating: 5.0,
        status: "Active"
      }]);
      setPendingSellers(pendingSellers.filter(s => s.id !== id));
      alert(`Seller application for "${approved.storeName}" approved successfully!`);
    }
  };

  const handleRejectSeller = (id, reason) => {
    const rejected = pendingSellers.find(s => s.id === id);
    if (rejected) {
      setPendingSellers(pendingSellers.filter(s => s.id !== id));
      alert(`Seller "${rejected.storeName}" application rejected. Reason: ${reason}`);
    }
  };

  const handleToggleSellerStatus = (id) => {
    setSellers(sellers.map(s => {
      if (s.id === id) {
        const newStatus = s.status === "Active" ? "Suspended" : "Active";
        alert(`Seller "${s.storeName}" has been ${newStatus.toLowerCase()}.`);
        return { ...s, status: newStatus };
      }
      return s;
    }));
  };

  const handleApproveProduct = (id) => {
    const approved = pendingProducts.find(p => p.id === id);
    if (approved) {
      const newProductItem = {
        _id: `MOCK_${approved.id}`,
        name: approved.name,
        category: approved.category,
        price: approved.price,
        oldPrice: Math.round(approved.price * 1.3),
        images: [approved.image],
        description: `Premium quality ${approved.name} uploaded by ${approved.sellerName}.`,
        seller: approved.sellerName,
        status: "Active"
      };
      
      setProducts([newProductItem, ...products]);
      setPendingProducts(pendingProducts.filter(p => p.id !== id));
      alert(`Product "${approved.name}" approved and listed live!`);
    }
  };

  const handleRejectProduct = (id, feedback) => {
    const rejected = pendingProducts.find(p => p.id === id);
    if (rejected) {
      setPendingProducts(pendingProducts.filter(p => p.id !== id));
      alert(`Product "${rejected.name}" rejected. Feedback: "${feedback}"`);
    }
  };

  const handlePayRequest = (id) => {
    const request = withdrawalRequests.find(r => r.id === id);
    if (request) {
      const today = new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
      setPayoutHistory([{
        id: payoutHistory.length + 1,
        txnId: `TXN${Math.floor(1000000 + Math.random() * 9000000)}`,
        sellerName: request.sellerName,
        amount: request.amount,
        paidDate: today,
        status: "Paid"
      }, ...payoutHistory]);
      setWithdrawalRequests(withdrawalRequests.filter(r => r.id !== id));
      alert(`Payout of ₹${request.amount.toLocaleString()} to ${request.sellerName} marked as paid successfully.`);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  // --- Handlers ---
  const addProduct = async (newP) => {
    try {
      const data = await createProduct(newP);
      if (data.success) {
        fetchProducts(pagination.currentPage);
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

  const updateSettings = (newS) => {
    setSettings(newS);
    localStorage.setItem("storeSettings", JSON.stringify(newS));
  };
  const updateProfile = (newP) => setProfile((prev) => ({ ...prev, ...newP }));

  const sidebarLinks = [
    { name: "Dashboard", path: "dashboard", icon: <FaChartPie /> },
    { name: "Products", path: "products", icon: <FaBox /> },
    { name: "Categories", path: "categories", icon: <FaTags /> },
    { name: "Orders", path: "orders", icon: <FaShoppingCart /> },
    { name: "Customers", path: "customers", icon: <FaUsers /> },
    { name: "Sellers", path: "sellers", icon: <FaHandshake /> },
    { name: "Product Approvals", path: "product-approvals", icon: <FaCheckDouble /> },
    { name: "Payouts", path: "payouts", icon: <FaWallet /> },
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
            <img src={settings.storeLogo || logo} alt="Fashion Oasis Logo" className="admin-header-logo" />
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
              path="sellers"
              element={
                <SellersSection
                  sellers={sellers}
                  pendingSellers={pendingSellers}
                  handleApproveSeller={handleApproveSeller}
                  handleRejectSeller={handleRejectSeller}
                  handleToggleSellerStatus={handleToggleSellerStatus}
                />
              }
            />
            <Route
              path="product-approvals"
              element={
                <ProductApprovalsSection
                  pendingProducts={pendingProducts}
                  handleApproveProduct={handleApproveProduct}
                  handleRejectProduct={handleRejectProduct}
                />
              }
            />
            <Route
              path="payouts"
              element={
                <PayoutsSection
                  withdrawalRequests={withdrawalRequests}
                  payoutHistory={payoutHistory}
                  handlePayRequest={handlePayRequest}
                />
              }
            />
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
        💎 This admin panel is designed with the {settings.storeName || "Fashion Oasis"} theme – Elegant, Soft & Luxurious ❤
      </footer>
    </div>
  );
};

export default AdminLayout;
