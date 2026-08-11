import React, { useState } from "react";
import { FaUserCheck, FaUserSlash, FaTimes, FaCheck, FaInfoCircle } from "react-icons/fa";
import { notifyWarning } from "../../../utils/alerts";

const SellersSection = ({ sellers, pendingSellers, handleApproveSeller, handleRejectSeller, handleToggleSellerStatus }) => {
  const [activeSubTab, setActiveSubTab] = useState("directory");
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [selectedSellerId, setSelectedSellerId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const openRejectionModal = (id) => {
    setSelectedSellerId(id);
    setRejectReason("");
    setRejectionModalOpen(true);
  };

  const closeRejectionModal = () => {
    setRejectionModalOpen(false);
    setSelectedSellerId(null);
    setRejectReason("");
  };

  const submitRejection = () => {
    if (!rejectReason.trim()) {
      notifyWarning("Please provide a reason for rejection.");
      return;
    }
    handleRejectSeller(selectedSellerId, rejectReason);
    closeRejectionModal();
  };

  return (
    <div className="admin-sellers-view fade-in">
      <div className="section-title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h2>Seller Management</h2>
          <p className="subtitle" style={{ color: 'var(--text-muted)', fontSize: '13px', margin: 0 }}>
            Approve, manage and monitor your marketplace sellers.
          </p>
        </div>
        <div className="sub-tabs-container" style={{ display: 'flex', gap: '10px', backgroundColor: '#FFF2F5', padding: '6px', borderRadius: '8px' }}>
          <button
            type="button"
            onClick={() => setActiveSubTab("directory")}
            className={`admin-tab-btn ${activeSubTab === "directory" ? "active" : ""}`}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              background: activeSubTab === "directory" ? 'var(--primary-color)' : 'transparent',
              color: activeSubTab === "directory" ? '#fff' : 'var(--primary-color)',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '13px',
              transition: 'all 0.3s'
            }}
          >
            Seller Directory ({sellers.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab("pending")}
            className={`admin-tab-btn ${activeSubTab === "pending" ? "active" : ""}`}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              background: activeSubTab === "pending" ? 'var(--primary-color)' : 'transparent',
              color: activeSubTab === "pending" ? '#fff' : 'var(--primary-color)',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '13px',
              transition: 'all 0.3s'
            }}
          >
            Pending Verifications ({pendingSellers.length})
          </button>
        </div>
      </div>

      <div className="admin-card" style={{ backgroundColor: 'var(--white)', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)', overflow: 'hidden' }}>
        {activeSubTab === "directory" ? (
          <div>
            {sellers.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <FaInfoCircle style={{ fontSize: '32px', marginBottom: '10px', color: 'var(--primary-color)' }} />
                <p>No sellers registered yet.</p>
              </div>
            ) : (
              <div className="admin-table-responsive" style={{ overflowX: 'auto' }}>
                <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#FFF8FA', borderBottom: '1px solid var(--border-color)' }}>
                      <th style={{ padding: '15px 20px', fontWeight: '700', fontSize: '13px', color: 'var(--text-dark)' }}>Store Details</th>
                      <th style={{ padding: '15px 20px', fontWeight: '700', fontSize: '13px', color: 'var(--text-dark)' }}>Contact Person</th>
                      <th style={{ padding: '15px 20px', fontWeight: '700', fontSize: '13px', color: 'var(--text-dark)' }}>Total Sales</th>
                      <th style={{ padding: '15px 20px', fontWeight: '700', fontSize: '13px', color: 'var(--text-dark)' }}>Rating</th>
                      <th style={{ padding: '15px 20px', fontWeight: '700', fontSize: '13px', color: 'var(--text-dark)' }}>Status</th>
                      <th style={{ padding: '15px 20px', fontWeight: '700', fontSize: '13px', color: 'var(--text-dark)', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellers.map((seller, index) => (
                      <tr key={seller._id || seller.id || index} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }}>
                        <td style={{ padding: '15px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#FFF2F5', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                              {seller.logoInitials}
                            </div>
                            <div>
                              <strong style={{ display: 'block', color: 'var(--text-dark)' }}>{seller.storeName}</strong>
                              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{seller.email}</span>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '15px 20px', color: 'var(--text-muted)', fontSize: '13px' }}>{seller.contactPerson}</td>
                        <td style={{ padding: '15px 20px', color: 'var(--text-dark)', fontWeight: '600', fontSize: '13px' }}>₹{(seller.totalSales ?? 0).toLocaleString()}</td>
                        <td style={{ padding: '15px 20px' }}>
                          <span style={{ backgroundColor: '#FFFDF9', color: '#D4AF37', border: '1px solid #FFF5D6', padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
                            ★ {seller.rating}
                          </span>
                        </td>
                        <td style={{ padding: '15px 20px' }}>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '600',
                            backgroundColor: seller.status === "Active" ? '#E8F5E9' : '#FFEBEE',
                            color: seller.status === "Active" ? '#2E7D32' : '#C62828'
                          }}>
                            {seller.status}
                          </span>
                        </td>
                        <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                          <button
                            type="button"
                            onClick={() => handleToggleSellerStatus(seller._id || seller.id)}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '6px',
                              border: 'none',
                              backgroundColor: seller.status === "Active" ? '#FFF0F2' : '#E8F5E9',
                              color: seller.status === "Active" ? '#E74C3C' : '#2E7D32',
                              cursor: 'pointer',
                              fontWeight: '600',
                              fontSize: '12px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            {seller.status === "Active" ? (
                              <>
                                <FaUserSlash /> Suspend
                              </>
                            ) : (
                              <>
                                <FaUserCheck /> Activate
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div>
            {pendingSellers.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <FaUserCheck style={{ fontSize: '32px', marginBottom: '10px', color: 'var(--primary-color)' }} />
                <p>No pending verification requests.</p>
              </div>
            ) : (
              <div className="admin-table-responsive" style={{ overflowX: 'auto' }}>
                <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#FFF8FA', borderBottom: '1px solid var(--border-color)' }}>
                      <th style={{ padding: '15px 20px', fontWeight: '700', fontSize: '13px', color: 'var(--text-dark)' }}>Store Details</th>
                      <th style={{ padding: '15px 20px', fontWeight: '700', fontSize: '13px', color: 'var(--text-dark)' }}>Business Documents</th>
                      <th style={{ padding: '15px 20px', fontWeight: '700', fontSize: '13px', color: 'var(--text-dark)' }}>Applied Date</th>
                      <th style={{ padding: '15px 20px', fontWeight: '700', fontSize: '13px', color: 'var(--text-dark)', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingSellers.map((seller, index) => (
                      <tr key={seller._id || seller.id || index} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '15px 20px' }}>
                          <div>
                            <strong style={{ display: 'block', color: 'var(--text-dark)' }}>{seller.storeName}</strong>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Email: {seller.email}</span>
                          </div>
                        </td>
                        <td style={{ padding: '15px 20px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
                            <div>📄 GSTIN: <code style={{ backgroundColor: '#F5F5F5', padding: '2px 4px', borderRadius: '4px' }}>{seller.docs?.gstin || seller.gstNumber || 'N/A'}</code></div>
                            <div>📄 PAN: <code style={{ backgroundColor: '#F5F5F5', padding: '2px 4px', borderRadius: '4px' }}>{seller.docs?.pan || 'N/A'}</code></div>
                          </div>
                        </td>
                        <td style={{ padding: '15px 20px', color: 'var(--text-muted)', fontSize: '13px' }}>{seller.appliedDate}</td>
                        <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '10px' }}>
                            <button
                              type="button"
                              onClick={() => handleApproveSeller(seller._id || seller.id)}
                              style={{
                                padding: '6px 12px',
                                borderRadius: '6px',
                                border: 'none',
                                backgroundColor: '#E8F5E9',
                                color: '#2E7D32',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <FaCheck /> Approve
                            </button>
                            <button
                              type="button"
                              onClick={() => openRejectionModal(seller._id || seller.id)}
                              style={{
                                padding: '6px 12px',
                                borderRadius: '6px',
                                border: 'none',
                                backgroundColor: '#FFEBEE',
                                color: '#C62828',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <FaTimes /> Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Rejection Modal */}
      {rejectionModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(3px)'
        }}>
          <div className="admin-modal-box fade-in" style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            width: '450px',
            padding: '25px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: '700', color: 'var(--text-dark)' }}>Reject Application</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '15px' }}>
              Please specify the reason for rejecting this seller's verification application.
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
              placeholder="e.g. GSTIN verification failed / Invalid documents uploaded"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontSize: '13px',
                outline: 'none',
                resize: 'none',
                marginBottom: '20px'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                type="button"
                onClick={closeRejectionModal}
                className="admin-btn-secondary"
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '13px'
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submitRejection}
                className="admin-btn-primary"
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: 'var(--primary-color)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '13px'
                }}
              >
                Submit Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellersSection;
