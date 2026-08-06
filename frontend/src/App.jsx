import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ShopProvider } from "./context/ShopContext";

import AOS from "aos";
import "aos/dist/aos.css";

import ScrollToTop from "./components/ScrollToTop";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Home from "./pages/Home";
import About from "./pages/About/About";
import Shop from "./pages/Shop/Shop";
import Contact from "./pages/Contact/Contact";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist/Wishlist";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import ThankYou from "./pages/ThankYou/ThankYou";
import TrackOrder from "./pages/TrackOrder/TrackOrder";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardProfile from "./pages/Dashboard/Profile";
import DashboardOrders from "./pages/Dashboard/Orders";
import DashboardWishlist from "./pages/Dashboard/Wishlist";
import DashboardReviews from "./pages/Dashboard/Reviews";
import DashboardSettings from "./pages/Dashboard/AccountSetting";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminLogin from "./pages/AdminAuth/AdminLogin";
import AdminRegister from "./pages/AdminAuth/AdminRegister";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

import SellerDashboard from "./pages/Seller/SellerDashboard";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import SellerLogin from "./pages/SellerAuth/SellerLogin";
import SellerRegister from "./pages/SellerAuth/SellerRegister";
import ProtectedSellerRoute from "./components/ProtectedSellerRoute/ProtectedSellerRoute";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <ShopProvider>
      <Router>
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/profile" element={<DashboardProfile />} />
          <Route path="/dashboard/orders" element={<DashboardOrders />} />
          <Route path="/dashboard/wishlist" element={<DashboardWishlist />} />
          <Route path="/dashboard/reviews" element={<DashboardReviews />} />
          <Route path="/dashboard/settings" element={<DashboardSettings />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/seller" element={<Navigate to="/seller/dashboard" replace />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/seller/login" element={<SellerLogin />} />
          <Route path="/seller/register" element={<SellerRegister />} />
          <Route
            path="/seller/dashboard"
            element={
              <ProtectedSellerRoute>
                <SellerDashboard />
              </ProtectedSellerRoute>
            }
          />

        </Routes>

      </Router>
    </ShopProvider>
  );
}

export default App;
