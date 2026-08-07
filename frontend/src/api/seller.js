import apiClient from "./client";

const sellerHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("sellerToken")}` },
});

export const loginSeller = (email, password) =>
  apiClient.post("/auth/seller/login", { email, password });

export const registerSeller = (data) =>
  apiClient.post("/auth/seller/register", data);

export const getSellerProfile = () =>
  apiClient.get("/auth/seller/me", sellerHeaders());

export const updateSellerProfile = (data) =>
  apiClient.put("/auth/seller/me", data, sellerHeaders());

export const fetchSellerDashboardData = () => {
  const seller = sellerHeaders();
  return Promise.all([
    apiClient.get("/seller/dashboard/stats", seller),
    apiClient.get("/seller/dashboard/recent-orders?limit=4", seller),
    apiClient.get("/seller/dashboard/top-products?limit=4", seller),
    apiClient.get("/seller/dashboard/top-customers?limit=4", seller),
    apiClient.get("/seller/dashboard/sales-analytics?range=7days", seller),
  ]).then(([stats, recentOrders, topProducts, topCustomers, salesAnalytics]) => ({
    stats: stats.data,
    recentOrders: recentOrders.data,
    topProducts: topProducts.data,
    topCustomers: topCustomers.data,
    salesAnalytics: salesAnalytics.data,
  }));
};

export const fetchSellerProducts = () => apiClient.get("/seller/products", sellerHeaders());
export const createSellerProduct = (data) => apiClient.post("/seller/products", data, sellerHeaders());
export const deleteSellerProduct = (id) => apiClient.delete(`/seller/products/${id}`, sellerHeaders());
export const toggleSellerProductStatus = (id) => apiClient.patch(`/seller/products/${id}/status`, {}, sellerHeaders());
export const updateSellerProductStock = (id, stock) => apiClient.patch(`/seller/products/${id}/stock`, { stock }, sellerHeaders());

export const fetchSellerOrders = () => apiClient.get("/seller/orders", sellerHeaders());
export const updateSellerOrderStatus = (id, status) => apiClient.patch(`/seller/orders/${id}/status`, { status }, sellerHeaders());
export const fetchSellerEarnings = () => apiClient.get('/seller/dashboard/earnings', sellerHeaders());

export const fetchSellerReviews = () => apiClient.get("/seller/reviews", sellerHeaders());
export const toggleSellerReviewStatus = (id) => apiClient.patch(`/seller/reviews/${id}/status`, {}, sellerHeaders());
export const deleteSellerReview = (id) => apiClient.delete(`/seller/reviews/${id}`, sellerHeaders());
