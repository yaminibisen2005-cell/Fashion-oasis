import React, { useState } from "react";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";

const ProductApprovalsSection = ({ pendingProducts, handleApproveProduct, handleRejectProduct }) => {
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const openFeedbackModal = (id) => {
    setSelectedProductId(id);
    setFeedbackMsg("");
    setFeedbackModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setFeedbackModalOpen(false);
    setSelectedProductId(null);
    setFeedbackMsg("");
  };

  const submitRejection = () => {
    if (!feedbackMsg.trim()) {
      alert("Please provide rejection feedback.");
      return;
    }
    handleRejectProduct(selectedProductId, feedbackMsg);
    closeFeedbackModal();
  };

  return (
    <div className="admin-product-approvals-view fade-in">
      <div className="section-title-row" style={{ display: 'flex', flexDirection: 'column', marginBottom: '25px' }}>
        <h2>Product Approval Queue</h2>
        <p className="subtitle" style={{ color: 'var(--text-muted)', fontSize: '13px', margin: 0 }}>
          Review and approve catalog item listings uploaded by marketplace sellers.
        </p>
      </div>

      <div className="admin-card" style={{ backgroundColor: 'var(--white)', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)', overflow: 'hidden' }}>
        {pendingProducts.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <FaInfoCircle style={{ fontSize: '32px', marginBottom: '10px', color: 'var(--primary-color)' }} />
            <p>No products currently awaiting approval.</p>
          </div>
        ) : (
          <div className="admin-table-responsive" style={{ overflowX: 'auto' }}>
            <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#FFF8FA', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '15px 20px', fontWeight: '700', fontSize: '13px', color: 'var(--text-dark)' }}>Product Info</th>
                  <th style={{ padding: '15px 20px', fontWeight: '700', fontSize: '13px', color: 'var(--text-dark)' }}>Seller Name</th>
                  <th style={{ padding: '15px 20px', fontWeight: '700', fontSize: '13px', color: 'var(--text-dark)' }}>Category</th>
                  <th style={{ padding: '15px 20px', fontWeight: '700', fontSize: '13px', color: 'var(--text-dark)' }}>Price</th>
                  <th style={{ padding: '15px 20px', fontWeight: '700', fontSize: '13px', color: 'var(--text-dark)', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingProducts.map((product) => (
                  <tr key={product._id || product.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '15px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--border-color)' }}
                          />
                        ) : (
                          <div style={{ width: '48px', height: '48px', borderRadius: '8px', backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: 'var(--text-muted)' }}>
                            No Image
                          </div>
                        )}
                        <div>
                          <strong style={{ display: 'block', color: 'var(--text-dark)' }}>{product.name}</strong>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>SKU: {product.sku || 'N/A'}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '15px 20px', color: 'var(--text-muted)', fontSize: '13px' }}>
                      {product.sellerName || "Independent Seller"}
                    </td>
                    <td style={{ padding: '15px 20px', color: 'var(--text-muted)', fontSize: '13px' }}>
                      {product.category}
                    </td>
                    <td style={{ padding: '15px 20px', color: 'var(--text-dark)', fontWeight: '600', fontSize: '13px' }}>
                      ₹{product.price.toLocaleString()}
                    </td>
                    <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '10px' }}>
                        <button
                          type="button"
                          onClick={() => handleApproveProduct(product._id || product.id)}
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
                          onClick={() => openFeedbackModal(product._id || product.id)}
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

      {/* Rejection/Feedback Modal */}
      {feedbackModalOpen && (
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
            <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: '700', color: 'var(--text-dark)' }}>Reject Product Listing</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '15px' }}>
              Provide feedback to the seller on why this product catalog listing cannot be approved.
            </p>
            <textarea
              value={feedbackMsg}
              onChange={(e) => setFeedbackMsg(e.target.value)}
              rows={4}
              placeholder="e.g. Image resolution is too low / Inaccurate product title"
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
                onClick={closeFeedbackModal}
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
                Send Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductApprovalsSection;
