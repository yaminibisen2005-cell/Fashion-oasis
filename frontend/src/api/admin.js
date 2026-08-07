import apiClient from "./client";

const adminHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
});

// auth
export const adminLogin = (payload) => apiClient.post("/auth/admin/login", payload).then((r) => r.data);
export const adminRegister = (payload) => apiClient.post("/auth/admin/register", payload).then((r) => r.data);

// products
export const fetchProducts = (page, limit) => apiClient.get(`/admin/products?page=${page}&limit=${limit}`, adminHeaders()).then((r) => r.data);
export const createProduct = (product) => apiClient.post("/admin/products", product, adminHeaders()).then((r) => r.data);
export const deleteProduct = (id) => apiClient.delete(`/admin/products/${id}`, adminHeaders()).then((r) => r.data);
export const toggleProductStatus = (id) => apiClient.patch(`/admin/products/${id}/status`, {}, adminHeaders()).then((r) => r.data);

// categories
export const fetchCategories = () => apiClient.get("/admin/categories", adminHeaders()).then((r) => r.data);
export const createCategory = (name) => apiClient.post("/admin/categories", { name }, adminHeaders()).then((r) => r.data);
export const deleteCategory = (id) => apiClient.delete(`/admin/categories/${id}`, adminHeaders()).then((r) => r.data);
export const toggleCategoryStatus = (id) => apiClient.patch(`/admin/categories/${id}/status`, {}, adminHeaders()).then((r) => r.data);

// orders
export const fetchOrders = (page, limit = 10) => apiClient.get(`/admin/orders?page=${page}&limit=${limit}`, adminHeaders()).then((r) => r.data);
export const updateOrderStatus = (id, status) => apiClient.patch(`/admin/orders/${id}/status`, { status }, adminHeaders()).then((r) => r.data);

// customers
export const fetchCustomers = (page, limit = 10) => apiClient.get(`/admin/customers?page=${page}&limit=${limit}`, adminHeaders()).then((r) => r.data);
export const toggleCustomerStatus = (id) => apiClient.patch(`/admin/customers/${id}/status`, {}, adminHeaders()).then((r) => r.data);

// reviews
export const fetchReviews = () => apiClient.get("/admin/reviews", adminHeaders()).then((r) => r.data);
export const toggleReviewStatus = (id) => apiClient.patch(`/admin/reviews/${id}`, {}, adminHeaders()).then((r) => r.data);
export const deleteReview = (id) => apiClient.delete(`/admin/reviews/${id}`, adminHeaders()).then((r) => r.data);

// coupons
export const fetchCoupons = () => apiClient.get("/admin/coupons", adminHeaders()).then((r) => r.data);
export const createCoupon = (coupon) => apiClient.post("/admin/coupons", coupon, adminHeaders()).then((r) => r.data);
export const toggleCouponStatus = (id) => apiClient.patch(`/admin/coupons/${id}`, {}, adminHeaders()).then((r) => r.data);
export const deleteCoupon = (id) => apiClient.delete(`/admin/coupons/${id}`, adminHeaders()).then((r) => r.data);

// dashboard
export const fetchDashboardData = () => {
  const admin = adminHeaders();
  return Promise.all([
    apiClient.get("/admin/dashboard/stats", admin),
    apiClient.get("/admin/dashboard/recent-orders?limit=4", admin),
    apiClient.get("/admin/dashboard/top-products?limit=4", admin),
    apiClient.get("/admin/dashboard/top-customers?limit=4", admin),
    apiClient.get("/admin/dashboard/sales-analytics?range=7days", admin),
  ]).then(([stats, recentOrders, topProducts, topCustomers, salesAnalytics]) => ({
    stats: stats.data,
    recentOrders: recentOrders.data,
    topProducts: topProducts.data,
    topCustomers: topCustomers.data,
    salesAnalytics: salesAnalytics.data,
  }));
};

// seller management
export const fetchSellers = () => apiClient.get('/admin/sellers', adminHeaders()).then(r => r.data);
export const fetchPendingSellers = () => apiClient.get('/admin/sellers/pending', adminHeaders()).then(r => r.data);
export const approveSeller = (id) => apiClient.patch(`/admin/sellers/${id}/approve`, {}, adminHeaders()).then(r => r.data);
export const rejectSeller = (id, payload) => apiClient.delete(`/admin/sellers/${id}`, { ...adminHeaders(), data: payload }).then(r => r.data);
export const toggleSellerStatus = (id) => apiClient.patch(`/admin/sellers/${id}/status`, {}, adminHeaders()).then(r => r.data);

// analytics
export const fetchAnalytics = (days = 30) => {
  return apiClient.get(`/admin/analytics?days=${days}`, adminHeaders()).then((r) => r.data.data);
};
