import apiClient from "./client";

const sellerHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
});

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
