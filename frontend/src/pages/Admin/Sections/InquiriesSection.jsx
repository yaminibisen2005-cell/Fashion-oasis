import React, { useState, useEffect } from "react";
import { FaEnvelopeOpen, FaEnvelope, FaTrash, FaSearch, FaCheckCircle, FaUser, FaPhoneAlt } from "react-icons/fa";
import apiClient from "../../../api/client";
import { showConfirm } from "../../../utils/alerts";

const InquiriesSection = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [unreadCount, setUnreadCount] = useState(0);

  const getAdminHeaders = () => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
    return { headers: token ? { Authorization: `Bearer ${token}` } : {} };
  };

  const loadInquiries = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (statusFilter !== "All") params.append("status", statusFilter);

      const res = await apiClient.get(`/inquiry/admin?${params.toString()}`, getAdminHeaders());
      if (res.data?.success) {
        setInquiries(res.data.data || []);
        setUnreadCount(res.data.unreadCount || 0);
      }
    } catch (err) {
      console.error("Failed to load inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, [search, statusFilter]);

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      let nextStatus = "Read";
      if (currentStatus === "Unread") nextStatus = "Read";
      else if (currentStatus === "Read") nextStatus = "Resolved";
      else nextStatus = "Unread";

      const res = await apiClient.patch(`/inquiry/${id}/status`, { status: nextStatus }, getAdminHeaders());
      if (res.data?.success) {
        setInquiries(inquiries.map((item) => (item._id === id ? { ...item, status: nextStatus } : item)));
        loadInquiries();
      }
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = await showConfirm("Delete Inquiry", "Are you sure you want to delete this contact inquiry?", "Delete");
    if (!isConfirmed) return;
    try {
      const res = await apiClient.delete(`/inquiry/${id}`, getAdminHeaders());
      if (res.data?.success) {
        setInquiries(inquiries.filter((item) => item._id !== id));
        loadInquiries();
      }
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
    }
  };

  return (
    <div className="inquiries-section">
      <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <h2 style={{ fontSize: "24px", color: "var(--heading-color)" }}>
            Contact Inquiries {unreadCount > 0 && <span style={{ background: "#EF6F8F", color: "#fff", padding: "2px 10px", borderRadius: "12px", fontSize: "14px", marginLeft: "10px" }}>{unreadCount} Unread</span>}
          </h2>
          <p style={{ color: "#666", fontSize: "14px" }}>View and manage customer messages and inquiry requests from the Contact page.</p>
        </div>

        {/* Search & Filter */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ position: "relative", width: "240px" }}>
            <FaSearch style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#888", fontSize: "13px" }} />
            <input
              type="text"
              placeholder="Search name, email, subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%", padding: "8px 12px 8px 34px", borderRadius: "8px", border: "1px solid var(--border-color)", fontSize: "13px" }}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--border-color)", fontSize: "13px" }}
          >
            <option value="All">All Inquiries</option>
            <option value="Unread">Unread</option>
            <option value="Read">Read</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div>Loading contact inquiries...</div>
      ) : (
        <div className="table-responsive" style={{ background: "#fff", borderRadius: "12px", border: "1px solid var(--border-color)", overflow: "hidden" }}>
          <table className="admin-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--table-header-bg)", textTransform: "uppercase", fontSize: "12px", letterSpacing: "0.5px" }}>
                <th style={{ padding: "14px 16px", textAlign: "left" }}>Customer Info</th>
                <th style={{ padding: "14px 16px", textAlign: "left" }}>Subject & Message</th>
                <th style={{ padding: "14px 16px", textAlign: "left" }}>Submitted Date</th>
                <th style={{ padding: "14px 16px", textAlign: "left" }}>Status</th>
                <th style={{ padding: "14px 16px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "30px", color: "#888" }}>
                    No contact inquiries found matching your filters.
                  </td>
                </tr>
              ) : (
                inquiries.map((item) => (
                  <tr key={item._id} style={{ borderBottom: "1px solid var(--border-color)", background: item.status === "Unread" ? "rgba(239, 111, 143, 0.03)" : "transparent" }}>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ fontWeight: "600", color: "#111", display: "flex", alignItems: "center", gap: "6px" }}>
                        <FaUser style={{ color: "#EF6F8F", fontSize: "12px" }} /> {item.name}
                      </div>
                      <div style={{ fontSize: "12px", color: "#555", marginTop: "2px" }}>
                        <a href={`mailto:${item.email}`} style={{ color: "#1890ff", textDecoration: "none" }}>{item.email}</a>
                      </div>
                      <div style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}>
                        <FaPhoneAlt style={{ fontSize: "10px", marginRight: "4px" }} /> {item.phone}
                      </div>
                    </td>

                    <td style={{ padding: "14px 16px", maxWidth: "300px" }}>
                      <div style={{ fontWeight: "600", color: "#222", fontSize: "14px" }}>{item.subject}</div>
                      <div style={{ fontSize: "13px", color: "#555", marginTop: "4px", lineHeight: "1.4", whiteSpace: "pre-wrap" }}>{item.message}</div>
                    </td>

                    <td style={{ padding: "14px 16px", color: "#666", fontSize: "13px" }}>
                      {new Date(item.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </td>

                    <td style={{ padding: "14px 16px" }}>
                      <span
                        onClick={() => handleToggleStatus(item._id, item.status)}
                        style={{
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "600",
                          cursor: "pointer",
                          background:
                            item.status === "Unread"
                              ? "rgba(239, 111, 143, 0.15)"
                              : item.status === "Read"
                              ? "rgba(24, 144, 255, 0.15)"
                              : "rgba(82, 196, 26, 0.15)",
                          color:
                            item.status === "Unread"
                              ? "#EF6F8F"
                              : item.status === "Read"
                              ? "#1890ff"
                              : "#52c41a",
                        }}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td style={{ padding: "14px 16px", textAlign: "right" }}>
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                        <button
                          onClick={() => handleToggleStatus(item._id, item.status)}
                          style={{ background: "none", border: "none", cursor: "pointer", color: "#1890ff", fontSize: "15px" }}
                          title={`Mark as ${item.status === "Unread" ? "Read" : "Unread"}`}
                        >
                          {item.status === "Unread" ? <FaEnvelope /> : <FaEnvelopeOpen />}
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          style={{ background: "none", border: "none", cursor: "pointer", color: "#ff4d4f", fontSize: "15px" }}
                          title="Delete Inquiry"
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
    </div>
  );
};

export default InquiriesSection;
