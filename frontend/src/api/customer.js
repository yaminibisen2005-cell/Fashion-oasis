import apiClient from "./client";

// auth
export const customerRegister = (payload) => apiClient.post("/customer/register", payload).then((r) => r.data);
export const customerLogin = (payload) => apiClient.post("/customer/login", payload).then((r) => r.data);
export const googleAuth = (payload) => apiClient.post("/customer/google", payload).then((r) => r.data);
export const forgotPassword = (payload) => apiClient.post("/customer/forgot-password", payload).then((r) => r.data);
export const resetPassword = (token, payload) => apiClient.put(`/customer/reset-password/${token}`, payload).then((r) => r.data);

// profile & dashboard
export const getProfile = () => apiClient.get("/customer/profile").then((r) => r.data);
export const getCustomerDashboardStats = () => apiClient.get("/customer/dashboard/stats").then((r) => r.data);
export const updateProfile = (payload) => apiClient.put("/customer/profile", payload).then((r) => r.data);
export const uploadAvatar = (payload) => apiClient.post("/customer/avatar", payload, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data);
export const updatePassword = (payload) => apiClient.put("/customer/password", payload).then((r) => r.data);
export const deleteAccount = (payload) => apiClient.delete("/customer/account", { data: payload }).then((r) => r.data);

// wishlist
export const getWishlist = () => apiClient.get("/wishlist").then((r) => r.data);
export const toggleWishlist = (payload) => apiClient.post("/wishlist/toggle", payload).then((r) => r.data);

// orders
export const checkout = (payload) => apiClient.post("/orders/checkout", payload).then((r) => r.data);
export const getMyOrders = () => apiClient.get("/orders/my-orders").then((r) => r.data);
export const getOrderById = (id) => apiClient.get(`/orders/${id}`).then((r) => r.data);

// cart
export const getCart = () => apiClient.get("/customer/cart").then((r) => r.data);
export const saveCart = (payload) => apiClient.post("/customer/cart", payload).then((r) => r.data);