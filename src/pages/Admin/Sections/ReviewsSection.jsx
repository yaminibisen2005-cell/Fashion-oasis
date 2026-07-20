import React from "react";
import { FaStar, FaTrash, FaCheck } from "react-icons/fa";

const ReviewsSection = ({ reviews, deleteReview, toggleReviewStatus }) => {
  return (
    <div className="admin-reviews-view">
      <div className="section-title-row">
        <div>
          <h2>Reviews</h2>
          <p className="subtitle">Audit and moderate product reviews left by clients.</p>
        </div>
      </div>

      <div className="table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  No reviews found.
                </td>
              </tr>
            ) : (
              reviews.map((rev, idx) => (
                <tr key={idx}>
                  <td><strong>{rev.customer}</strong></td>
                  <td>{rev.product}</td>
                  <td>
                    <div className="reviews-stars-row">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < rev.rating ? "star-active" : "star-inactive"}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="review-text-cell">{rev.review}</td>
                  <td>
                    <span className={`status-badge-inline ${rev.status === "Approved" ? "active" : "inactive"}`}>
                      {rev.status}
                    </span>
                  </td>
                  <td>
                    <div className="reviews-actions-cell">
                      {rev.status !== "Approved" && (
                        <button
                          className="tbl-action-btn check"
                          onClick={() => toggleReviewStatus(idx)}
                          title="Approve Review"
                        >
                          <FaCheck />
                        </button>
                      )}
                      <button
                        className="tbl-action-btn delete"
                        onClick={() => deleteReview(idx)}
                        title="Delete Review"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewsSection;
