import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaTimes, FaSignInAlt } from "react-icons/fa";
import "./AuthRequiredModal.css";

const AuthRequiredModal = ({
  isOpen,
  onClose,
  redirectPath = "/checkout",
  message = "Please login to continue your purchase.",
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLoginClick = () => {
    onClose();
    navigate("/login", { state: { from: { pathname: redirectPath } } });
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          className="auth-modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <FaTimes />
        </button>

        <div className="auth-modal-header">
          <div className="auth-modal-icon-badge">
            <FaLock />
          </div>
          <h3>Authentication Required</h3>
          <p>{message}</p>
        </div>

        <div className="auth-modal-actions">
          <button
            type="button"
            className="auth-modal-login-btn"
            onClick={handleLoginClick}
          >
            <FaSignInAlt style={{ marginRight: "6px" }} /> Login
          </button>
          <button
            type="button"
            className="auth-modal-cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthRequiredModal;
