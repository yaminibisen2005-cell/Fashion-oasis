import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaEdit, FaToggleOn, FaToggleOff, FaTag, FaCalendarAlt } from "react-icons/fa";
import { fetchOffersAdmin, createOfferAPI, updateOfferAPI, deleteOfferAPI, toggleOfferStatusAPI } from "../../../api/admin";
import { showConfirm } from "../../../utils/alerts";

const OffersSection = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount: "",
    image: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    status: "Active",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const loadOffers = async () => {
    try {
      setLoading(true);
      const res = await fetchOffersAdmin();
      if (res.success) {
        setOffers(res.data || []);
      }
    } catch (err) {
      console.error("Failed to load offers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOffers();
  }, []);

  const openAddModal = () => {
    setEditingOffer(null);
    setFormData({
      title: "",
      description: "",
      discount: "",
      image: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      status: "Active",
    });
    setErrorMsg("");
    setShowModal(true);
  };

  const openEditModal = (offer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title || "",
      description: offer.description || "",
      discount: offer.discount || "",
      image: offer.image || "",
      startDate: offer.startDate ? new Date(offer.startDate).toISOString().split("T")[0] : "",
      endDate: offer.endDate ? new Date(offer.endDate).toISOString().split("T")[0] : "",
      status: offer.status || "Active",
    });
    setErrorMsg("");
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setErrorMsg("Offer Title is required");
      return;
    }
    if (!formData.discount.trim()) {
      setErrorMsg("Discount value (e.g. 30% OFF) is required");
      return;
    }

    try {
      if (editingOffer) {
        const res = await updateOfferAPI(editingOffer._id, formData);
        if (res.success) {
          setShowModal(false);
          loadOffers();
        }
      } else {
        const res = await createOfferAPI(formData);
        if (res.success) {
          setShowModal(false);
          loadOffers();
        }
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || err.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = await showConfirm("Delete Offer", "Are you sure you want to delete this special offer?", "Delete");
    if (!isConfirmed) return;
    try {
      const res = await deleteOfferAPI(id);
      if (res.success) {
        setOffers(offers.filter((o) => o._id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const res = await toggleOfferStatusAPI(id);
      if (res.success && res.data) {
        setOffers(offers.map((o) => (o._id === id ? { ...o, status: res.data.status } : o)));
      }
    } catch (err) {
      console.error("Toggle status failed:", err);
    }
  };

  return (
    <div className="offers-section">
      <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "24px", color: "var(--heading-color)" }}>Special Offers Management</h2>
          <p style={{ color: "#666", fontSize: "14px" }}>Manage customer special offers, sales banners, and discount campaigns.</p>
        </div>
        <button className="admin-btn-primary" onClick={openAddModal} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px" }}>
          <FaPlus /> Add Special Offer
        </button>
      </div>

      {loading ? (
        <div>Loading offers...</div>
      ) : (
        <div className="table-responsive" style={{ background: "#fff", borderRadius: "12px", border: "1px solid var(--border-color)", overflow: "hidden" }}>
          <table className="admin-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--table-header-bg)", textTransform: "uppercase", fontSize: "12px", letterSpacing: "0.5px" }}>
                <th style={{ padding: "14px 16px", textAlign: "left" }}>Title</th>
                <th style={{ padding: "14px 16px", textAlign: "left" }}>Discount</th>
                <th style={{ padding: "14px 16px", textAlign: "left" }}>Description</th>
                <th style={{ padding: "14px 16px", textAlign: "left" }}>Valid Until</th>
                <th style={{ padding: "14px 16px", textAlign: "left" }}>Status</th>
                <th style={{ padding: "14px 16px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "30px", color: "#888" }}>
                    No special offers found. Click "Add Special Offer" to create one.
                  </td>
                </tr>
              ) : (
                offers.map((offer) => (
                  <tr key={offer._id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "14px 16px", fontWeight: "600", color: "#111" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <FaTag style={{ color: "#D4A04B" }} /> {offer.title}
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", color: "#EF6F8F", fontWeight: "700" }}>{offer.discount}</td>
                    <td style={{ padding: "14px 16px", color: "#555" }}>{offer.description || "—"}</td>
                    <td style={{ padding: "14px 16px", color: "#666", fontSize: "13px" }}>
                      {offer.endDate ? new Date(offer.endDate).toLocaleDateString("en-IN") : "No Expiry"}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        className={`status-badge ${offer.status === "Active" ? "status-active" : "status-inactive"}`}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "600",
                          background: offer.status === "Active" ? "rgba(82, 196, 26, 0.1)" : "rgba(255, 77, 79, 0.1)",
                          color: offer.status === "Active" ? "#52c41a" : "#ff4d4f",
                        }}
                      >
                        {offer.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", textAlign: "right" }}>
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                        <button
                          onClick={() => handleToggleStatus(offer._id)}
                          style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: offer.status === "Active" ? "#52c41a" : "#888" }}
                          title="Toggle Status"
                        >
                          {offer.status === "Active" ? <FaToggleOn /> : <FaToggleOff />}
                        </button>
                        <button
                          onClick={() => openEditModal(offer)}
                          style={{ background: "none", border: "none", cursor: "pointer", color: "#1890ff", fontSize: "15px" }}
                          title="Edit Offer"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(offer._id)}
                          style={{ background: "none", border: "none", cursor: "pointer", color: "#ff4d4f", fontSize: "15px" }}
                          title="Delete Offer"
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
      )}

      {/* Modal Form */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", padding: "28px", borderRadius: "16px", width: "100%", maxWidth: "500px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: "20px" }}>{editingOffer ? "Edit Special Offer" : "Add New Special Offer"}</h3>

            {errorMsg && <div style={{ background: "#fff2f0", border: "1px solid #ffccc7", color: "#ff4d4f", padding: "8px 12px", borderRadius: "6px", marginBottom: "14px", fontSize: "13px" }}>{errorMsg}</div>}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "4px" }}>Offer Title *</label>
                <input
                  type="text"
                  placeholder="e.g. 30% OFF on Selected Jewellery"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "4px" }}>Discount Value / Label *</label>
                <input
                  type="text"
                  placeholder="e.g. 30% OFF or Flat ₹500 OFF"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "4px" }}>Description</label>
                <input
                  type="text"
                  placeholder="e.g. Festival Sale - Limited Time Offer"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "4px" }}>Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "4px" }}>End Date (Expiry)</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "4px" }}>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: "10px 18px", borderRadius: "8px", border: "1px solid #ccc", background: "#f5f5f5", cursor: "pointer" }}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary" style={{ padding: "10px 20px" }}>
                  {editingOffer ? "Save Changes" : "Create Offer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OffersSection;
