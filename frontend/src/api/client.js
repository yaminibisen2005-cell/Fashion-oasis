import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
});

apiClient.interceptors.request.use(
  (config) => {
    let token = null;

    if (config.url && config.url.includes("/admin")) {
      token = localStorage.getItem("adminToken") || localStorage.getItem("token");
    } else if (config.url && config.url.includes("/seller")) {
      token = localStorage.getItem("sellerToken") || localStorage.getItem("token");
    } else {
      token =
        localStorage.getItem("token") ||
        localStorage.getItem("customerToken") ||
        localStorage.getItem("authToken") ||
        localStorage.getItem("adminToken") ||
        localStorage.getItem("jwt");
    }

    if (token && token !== "null" && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;