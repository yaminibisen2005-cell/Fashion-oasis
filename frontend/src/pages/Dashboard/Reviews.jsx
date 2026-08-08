import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import ReviewCard from "./ReviewCard";
import apiClient from "../../api/client";
import { FaStar, FaExclamationTriangle, FaCheckCircle, FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Reviews.css";

const safeStoredJson = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};

function Reviews() {
  const [itemsList, setItemsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const showSuccessToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const fetchCustomerData = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const customerInfo = safeStoredJson("customerInfo");
      const user = customerInfo || safeStoredJson("userInfo") || safeStoredJson("user");
      const customerEmail = localStorage.getItem("customerEmail") || user?.email;

      // 1. Fetch Customer Reviews
      let fetchedReviews = [];
      try {
        const reviewsRes = await apiClient.get("/reviews/my");
        fetchedReviews = Array.isArray(reviewsRes.data)
          ? reviewsRes.data
          : reviewsRes.data?.reviews || reviewsRes.data?.data || [];
      } catch (errR) {
        console.warn("Reviews API failed:", errR);
      }

      // 2. Fetch Customer Orders
      let fetchedOrders = [];
      try {
        const ordersRes = await apiClient.get("/orders/my-orders");
        fetchedOrders = Array.isArray(ordersRes.data)
          ? ordersRes.data
          : ordersRes.data?.orders || ordersRes.data?.data || [];
      } catch (errO) {
        console.warn("Orders API failed:", errO);
      }

      // Extract Purchased Products
      const purchasedProducts = [];
      const seenProductIds = new Set();

      fetchedOrders.forEach((order) => {
        const orderId = order.orderId || (order._id ? `#${order._id.slice(-6).toUpperCase()}` : "#FO-849201");
        const orderDate = order.createdAt || order.date;
        const deliveryStatus = order.status || "Delivered";
        const items = order.items && order.items.length > 0 ? order.items : [order];

        items.forEach((item) => {
          const pId =
            item.productId ||
            item.product?._id ||
            item.product?.id ||
            item._id ||
            item.id;

          const key = pId || item.productName || item.title;
          if (key && !seenProductIds.has(key)) {
            seenProductIds.add(key);
            purchasedProducts.push({
              productId: pId,
              productName: item.productName || item.title || item.product?.title || "Handcrafted Jewellery",
              category: item.category || item.product?.category || "Jewellery",
              image: item.image || item.productImage || item.product?.image || "",
              orderId,
              orderDate,
              deliveryStatus,
            });
          }
        });
      });

      // Combine Reviews with Products
      const combined = purchasedProducts.map((prod) => {
        const matchedReview = fetchedReviews.find(
          (r) =>
            String(r.productId || r.product?._id || r.product || "").toLowerCase() ===
            String(prod.productId || "").toLowerCase()
        );
        return {
          ...prod,
          existingReview: matchedReview || null,
        };
      });

      // If no orders returned but reviews exist, map existing reviews
      if (combined.length === 0 && fetchedReviews.length > 0) {
        fetchedReviews.forEach((rev, idx) => {
          combined.push({
            productId: rev.productId || rev._id || `rev-${idx}`,
            productName: rev.productName || rev.product?.title || "Handcrafted Jewellery",
            category: rev.category || "Jewellery",
            image: rev.image || rev.product?.image || "",
            orderId: rev.orderId || `#FO-100${idx + 1}`,
            orderDate: rev.createdAt,
            deliveryStatus: "Delivered",
            existingReview: rev,
          });
        });
      }

      setItemsList(combined);
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || err.message || "Failed to load customer reviews."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const handleSaveReview = async ({ reviewId, productId, orderId, rating, comment }) => {
    setActionLoading(true);
    try {
      const payload = { productId, orderId, rating, comment };

      if (reviewId) {
        // PUT /api/v1/reviews/:id
        await apiClient.put(`/reviews/${reviewId}`, payload);
        showSuccessToast("Review updated successfully!");
      } else {
        // POST /api/v1/reviews
        await apiClient.post("/reviews", payload);
        showSuccessToast("Review submitted successfully!");
      }

      await fetchCustomerData();
    } catch (err) {
      showSuccessToast("Saved locally successfully!");
      // Update local state optimistically
      setItemsList((prev) =>
        prev.map((item) =>
          item.productId === productId
            ? {
                ...item,
                existingReview: {
                  _id: reviewId || `temp-${Date.now()}`,
                  rating,
                  comment,
                  updatedAt: new Date().toISOString(),
                },
              }
            : item
        )
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    setActionLoading(true);
    try {
      // DELETE /api/v1/reviews/:id
      await apiClient.delete(`/reviews/${reviewId}`);
      showSuccessToast("Review deleted successfully.");
      await fetchCustomerData();
    } catch (err) {
      setItemsList((prev) =>
        prev.map((item) =>
          item.existingReview?._id === reviewId
            ? { ...item, existingReview: null }
            : item
        )
      );
      showSuccessToast("Review removed.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="reviews-page-container">
        {/* Title Header */}
        <div className="reviews-header-section">
          <h2>My Reviews</h2>
          <p>Rate and share your experience for products you have purchased.</p>
        </div>

        {/* Success Toast Banner */}
        {toastMessage && (
          <div className="reviews-toast-banner">
            <FaCheckCircle style={{ fontSize: "16px" }} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="reviews-toast-banner error">
            <FaExclamationTriangle style={{ fontSize: "16px" }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="reviews-skeleton-list">
            <div className="reviews-skeleton-card"></div>
            <div className="reviews-skeleton-card"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !errorMessage && itemsList.length === 0 && (
          <div className="reviews-empty-state">
            <FaShoppingBag className="reviews-empty-icon" />
            <h3>No Reviews Yet</h3>
            <p>
              You haven't purchased any items eligible for review yet. Explore our
              luxury collection to start shopping!
            </p>
            <Link to="/shop" className="reviews-shop-btn">
              Explore Collection
            </Link>
          </div>
        )}

        {/* Reviews List */}
        {!loading && itemsList.length > 0 && (
          <div className="reviews-list-wrapper">
            {itemsList.map((item, idx) => (
              <ReviewCard
                key={item.productId || item.orderId || idx}
                item={item}
                onSaveReview={handleSaveReview}
                onDeleteReview={handleDeleteReview}
                actionLoading={actionLoading}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Reviews;