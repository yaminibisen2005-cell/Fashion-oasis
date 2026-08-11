import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";
import { FaSpinner, FaPaperPlane, FaTimes } from "react-icons/fa";

const ReviewForm = ({
  initialRating = 0,
  initialComment = "",
  onSubmit,
  onCancel,
  loading = false,
  isEditing = false,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState(initialComment);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    setRating(initialRating);
    setComment(initialComment);
  }, [initialRating, initialComment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    if (!rating || rating < 1) {
      setValidationError("Please select a star rating (1-5 stars).");
      return;
    }

    if (!comment || comment.trim() === "") {
      setValidationError("Please write your review thoughts before submitting.");
      return;
    }

    onSubmit({ rating, comment: comment.trim() });
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="review-form-field">
        <label className="review-form-label">
          Your Rating <span style={{ color: "#EF6F8F" }}>*</span>
        </label>
        <div style={{ margin: "6px 0 14px" }}>
          <StarRating rating={rating} setRating={setRating} readOnly={loading} size={26} />
        </div>
      </div>

      <div className="review-form-field">
        <label className="review-form-label">
          Your Review <span style={{ color: "#EF6F8F" }}>*</span>
        </label>
        <textarea
          className="review-textarea"
          rows={4}
          placeholder="Share your experience with this jewellery piece (craftsmanship, quality, fitting, packaging)..."
          value={comment}
          disabled={loading}
          onChange={(e) => {
            setComment(e.target.value);
            if (validationError) setValidationError("");
          }}
          maxLength={500}
        />
        <div className="review-textarea-footer">
          <span style={{ fontSize: "12px", color: "#999" }}>
            {comment.length}/500 characters
          </span>
        </div>
      </div>

      {validationError && (
        <div className="review-validation-alert">
          {validationError}
        </div>
      )}

      <div className="review-form-actions">
        <button
          type="submit"
          className="review-submit-btn"
          disabled={loading}
        >
          {loading ? (
            <>
              <FaSpinner className="spin-icon" /> Submitting...
            </>
          ) : (
            <>
              <FaPaperPlane style={{ marginRight: "6px" }} />
              {isEditing ? "Update Review" : "Submit Review"}
            </>
          )}
        </button>

        {isEditing && onCancel && (
          <button
            type="button"
            className="review-cancel-btn"
            disabled={loading}
            onClick={onCancel}
          >
            <FaTimes style={{ marginRight: "4px" }} /> Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ReviewForm;
