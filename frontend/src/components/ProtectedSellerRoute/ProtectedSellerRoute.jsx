import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedSellerRoute = ({ children }) => {
  const sellerSession = localStorage.getItem("sellerSession");

  if (!sellerSession) {
    return <Navigate to="/seller/login" replace />;
  }

  try {
    const session = JSON.parse(sellerSession);
    
    if (!session.isLoggedIn) {
      return <Navigate to="/seller/login" replace />;
    }

    // Check if seller status is approved
    if (session.status !== "approved") {
      return <Navigate to="/seller/login" replace />;
    }
  } catch (error) {
    return <Navigate to="/seller/login" replace />;
  }

  return children;
};

export default ProtectedSellerRoute;
