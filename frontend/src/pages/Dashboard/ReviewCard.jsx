import React, { useState } from "react";
import StarRating from "./StarRating";
import ReviewForm from "./ReviewForm";
import { FaEdit, FaTrashAlt, FaCheckCircle, FaCalendarAlt, FaHashtag, FaTag } from "react-icons/fa";

const defaultPlaceholder =
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&q=80";

const ReviewCard = ({
  item,
  onSaveReview,
  onDeleteReview,
  actionLoading = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const existingReview = item.existingReview;
  const hasReview = Boolean(existingReview && (existingReview.rating || existingReview.comment));

  const prodImg =
    item.image ||
    item.productImage ||
    item.img ||
    item.product?.image ||
    defaultPlaceholder;

  const prodName =
    item.productName ||
    item.name ||
    item.title ||
    item.product?.name ||
    item.product?.title ||
    "Handcrafted Jewellery";

  const category =
    item.category ||
    item.productCategory ||
    item.product?.category ||
    "Jewellery";

  const orderId =
    item.orderId ||
    (item._id ? `#${item._id.slice(-6).toUpperCase()}` : "#FO-849201");

  const purchaseDate = item.orderDate || item.createdAt
    ? new Date(item.orderDate || item.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Recent Purchase";

  const deliveryStatus = item.deliveryStatus || item.status || "Delivered";

  const handleSubmitReview = async (formData) => {
    await onSaveReview({
      reviewId: existingReview?._id || existingReview?.id,
      productId: item.productId || item.id || item._id,
      orderId: item.orderId || item._id,
      rating: formData.rating,
      comment: formData.comment,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (existingReview?._id || existingReview?.id) {
      if (window.confirm("Are you sure you want to delete this review?")) {
        onDeleteReview(existingReview._id || existingReview.id);
      }
    }
  };

  return (
    <div className="review-card-item">
      {/* Product Image & Information Header */}
      <div className="review-card-left">
        <img
          src={prodImg}
          alt={prodName}
          className="review-product-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultPlaceholder;
          }}
        />
        <div className="review-product-meta">
          <div className="review-category-badge">
            <FaTag style={{ fontSize: "11px", marginRight: "4px" }} />
            {category}
          </div>
          <h3 className="review-product-title">{prodName}</h3>

          <div className="review-meta-row">
            <span>
              <FaHashtag style={{ fontSize: "11px", color: "#EF6F8F" }} /> Order ID: <strong>{orderId}</strong>
            </span>
            <span>
              <FaCalendarAlt style={{ fontSize: "11px", color: "#EF6F8F" }} /> Purchased: <strong>{purchaseDate}</strong>
            </span>
            <span className={`review-status-tag ${deliveryStatus.toLowerCase().replace(/\s+/g, "-")}`}>
              <FaCheckCircle style={{ fontSize: "11px" }} /> {deliveryStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Review Section: Show Existing Review or Review Form */}
      <div className="review-card-right">
        {hasReview && !isEditing ? (
          <div className="existing-review-display">
            <div className="existing-review-header">
              <div>
                <span className="existing-review-label">Your Submitted Review</span>
                <div style={{ marginTop: "4px" }}>
                  <StarRating rating={existingReview.rating} readOnly={true} size={20} />
                </div>
              </div>
              <div className="existing-review-actions">
                <button
                  type="button"
                  className="review-edit-btn"
                  onClick={() => setIsEditing(true)}
                  disabled={actionLoading}
                >
                  <FaEdit style={{ marginRight: "5px" }} /> Edit Review
                </button>
                <button
                  type="button"
                  className="review-delete-btn"
                  onClick={handleDelete}
                  disabled={actionLoading}
                >
                  <FaTrashAlt style={{ marginRight: "5px" }} /> Delete Review
                </button>
              </div>
            </div>

            <p className="existing-review-comment">"{existingReview.comment}"</p>
            {existingReview.updatedAt && (
              <span className="review-updated-date">
                Updated on{" "}
                {new Date(existingReview.updatedAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
        ) : (
          <div className="review-form-wrapper">
            <h4 className="review-form-title">
              {hasReview ? "Edit Your Review" : "Write a Customer Review"}
            </h4>
            <ReviewForm
              initialRating={existingReview?.rating || 0}
              initialComment={existingReview?.comment || ""}
              onSubmit={handleSubmitReview}
              onCancel={() => setIsEditing(false)}
              loading={actionLoading}
              isEditing={hasReview}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
