import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const isCustomerAuthenticated = () => {
  try {
    const email = localStorage.getItem("customerEmail");
    const token =
      localStorage.getItem("customerToken") ||
      localStorage.getItem("token");
    return Boolean(token && token !== "null" && token !== "undefined" && (email || localStorage.getItem("customerInfo")));
  } catch (error) {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const authenticated = isCustomerAuthenticated();

  if (!authenticated) {
    // Redirect to login, storing current page location in state so user returns after logging in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
