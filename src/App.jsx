import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ShopProvider } from "./context/ShopContext";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist/Wishlist";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Payment from "./pages/Payment/Payment";
import ThankYou from "./pages/ThankYou/ThankYou";
import TrackOrder from "./pages/TrackOrder/TrackOrder";
import AdminLayout from "./pages/Admin/AdminLayout";

function App() {
  return (
    <ShopProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </Router>
    </ShopProvider>
  );
}

export default App;
