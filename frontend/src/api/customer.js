 import apiClient from "./client";

// auth
export const customerRegister = (payload) => apiClient.post("/customer/register", payload).then((r) => r.data);
export const customerLogin = (payload) => apiClient.post("/customer/login", payload).then((r) => r.data);
export const forgotPassword = (payload) => apiClient.post("/customer/forgot-password", payload).then((r) => r.data);
export const resetPassword = (token, payload) => apiClient.put(`/customer/reset-password/${token}`, payload).then((r) => r.data);

// profile
export const getProfile = () => apiClient.get("/customer/profile").then((r) => r.data);
export const updateProfile = (payload) => apiClient.put("/customer/profile", payload).then((r) => r.data);
export const updatePassword = (payload) => apiClient.put("/customer/password", payload).then((r) => r.data);
export const deleteAccount = (payload) => apiClient.delete("/customer/account", { data: payload }).then((r) => r.data);

// wishlist (Uses the token attached by the interceptor automatically)
export const getWishlist = () => apiClient.get("/wishlist").then((r) => r.data);
export const toggleWishlist = (payload) => apiClient.post("/wishlist/toggle", payload).then((r) => r.data);

// orders
export const checkout = (payload) => apiClient.post("/orders/checkout", payload).then((r) => r.data);