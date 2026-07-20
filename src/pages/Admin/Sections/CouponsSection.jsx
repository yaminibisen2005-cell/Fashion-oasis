import React, { useState } from "react";
import { FaPlus, FaTrash, FaTimes } from "react-icons/fa";

const CouponsSection = ({ coupons, addCoupon, deleteCoupon, toggleCouponStatus }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    minOrder: "",
    expiryDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.code || !formData.discount) return;

    const newCoupon = {
      code: formData.code.trim().toUpperCase(),
      discount: formData.discount,
      minOrder: formData.minOrder ? `₹${formData.minOrder}` : "None",
      expiryDate: formData.expiryDate || "None",
      status: "Active",
    };

    addCoupon(newCoupon);
    setFormData({ code: "", discount: "", minOrder: "", expiryDate: "" });
    setShowModal(false);
  };

  return (
    <div className="admin-coupons-view">
      <div className="section-title-row">
        <div>
          <h2>Coupons</h2>
          <p className="subtitle">Configure discounts and promotions for your shop.</p>
        </div>
        <button className="admin-btn-primary" onClick={() => setShowModal(true)}>
          <FaPlus /> Add Coupon
        </button>
      </div>

      <div className="table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Coupon Code</th>
              <th>Discount</th>
              <th>Min. Order</th>
              <th>Expiry Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, idx) => (
              <tr key={idx}>
                <td><strong>{coupon.code}</strong></td>
                <td>{coupon.discount}</td>
                <td>{coupon.minOrder}</td>
                <td>{coupon.expiryDate}</td>
                <td>
                  <span
                    className={`status-badge-inline ${
                      coupon.status === "Active" ? "active" : "inactive"
                    }`}
                    onClick={() => toggleCouponStatus(coupon.code)}
                    style={{ cursor: "pointer" }}
                    title="Click to toggle status"
                  >
                    {coupon.status}
                  </span>
                </td>
                <td>
                  <button
                    className="tbl-action-btn delete"
                    onClick={() => deleteCoupon(coupon.code)}
                    title="Delete Coupon"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Coupon Modal */}
      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box fade-in">
            <div className="modal-header">
              <h3>Add New Coupon</h3>
              <button className="close-modal-btn" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="modal-form">
              <div className="form-group">
                <label>Coupon Code <span className="text-danger">*</span></label>
                <input
                  type="text"
                  name="code"
                  placeholder="e.g. JEWELRY20"
                  value={formData.code}
                  onChange={handleChange}
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label>Discount (e.g. 10% OFF, ₹500 OFF) <span className="text-danger">*</span></label>
                <input
                  type="text"
                  name="discount"
                  placeholder="e.g. 10% OFF"
                  value={formData.discount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Min. Order Value (₹)</label>
                  <input
                    type="number"
                    name="minOrder"
                    placeholder="e.g. 999"
                    value={formData.minOrder}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="e.g. 30 Jun 2024"
                    value={formData.expiryDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="admin-btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  Add Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponsSection;
