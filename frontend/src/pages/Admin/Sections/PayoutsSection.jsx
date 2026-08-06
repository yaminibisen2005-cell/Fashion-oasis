import React from "react";
import { FaMoneyBillWave, FaHistory, FaCheckCircle, FaInfoCircle } from "react-icons/fa";

const PayoutsSection = ({ withdrawalRequests, payoutHistory, handlePayRequest }) => {
  const pendingRequests = withdrawalRequests.filter(req => req.status === "Pending");

  return (
    <div className="admin-payouts-view fade-in">
      <div className="section-title-row" style={{ display: 'flex', flexDirection: 'column', marginBottom: '25px' }}>
        <h2>Payouts & Earnings Log</h2>
        <p className="subtitle" style={{ color: 'var(--text-muted)', fontSize: '13px', margin: 0 }}>
          Manage withdrawals and track seller payouts history.
        </p>
      </div>

      {/* Summary Row */}
      <div className="summary-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Pending Payouts Queue</span>
          <h3 style={{ fontSize: '24px', margin: '5px 0 0 0', fontWeight: '700', color: 'var(--text-dark)' }}>
            {pendingRequests.length} Requests
          </h3>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Total Pending Amount</span>
          <h3 style={{ fontSize: '24px', margin: '5px 0 0 0', fontWeight: '700', color: 'var(--primary-color)' }}>
            ₹{pendingRequests.reduce((sum, req) => sum + req.amount, 0).toLocaleString()}
          </h3>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Total Paid History</span>
          <h3 style={{ fontSize: '24px', margin: '5px 0 0 0', fontWeight: '700', color: '#2E7D32' }}>
            ₹{payoutHistory.reduce((sum, req) => sum + req.amount, 0).toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Active Payout Requests */}
      <div className="admin-card" style={{ backgroundColor: 'var(--white)', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)', overflow: 'hidden', marginBottom: '35px' }}>
        <div style={{ backgroundColor: '#FFF8FA', padding: '15px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaMoneyBillWave style={{ color: 'var(--primary-color)' }} />
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-dark)', margin: 0 }}>Withdrawal Requests</h3>
        </div>
        {pendingRequests.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <FaInfoCircle style={{ fontSize: '32px', marginBottom: '10px', color: 'var(--primary-color)' }} />
            <p>No pending withdrawal requests found.</p>
          </div>
        ) : (
          <div className="admin-table-responsive" style={{ overflowX: 'auto' }}>
            <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '15px 20px', fontWeight: '700', fontSize: '13px', color: 'var(--text-dark)' }}>Seller</th>
                  <th style={{ padding: '15px 20px', fontWeight: '700', fontSize: '13px', color: 'var(--text-dark)' }}>Payout Bank Details</th>
                  <th style={{ padding: '15px 20px', fontWeight: '700', fontSize: '13px', color: 'var(--text-dark)' }}>Requested Amount</th>
                  <th style={{ padding: '15px 20px', fontWeight: '700', fontSize: '13px', color: 'var(--text-dark)' }}>Requested Date</th>
                  <th style={{ padding: '15px 20px', fontWeight: '700', fontSize: '13px', color: 'var(--text-dark)', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.map((req) => (
                  <tr key={req.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '15px 20px' }}>
                      <strong style={{ display: 'block', color: 'var(--text-dark)' }}>{req.sellerName}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Wallet Bal: ₹{req.walletBalance.toLocaleString()}</span>
                    </td>
                    <td style={{ padding: '15px 20px', fontSize: '12px', color: 'var(--text-muted)' }}>
                      <div>Bank: {req.bankDetails.bankName}</div>
                      <div>A/C No: {req.bankDetails.accountNo}</div>
                      <div>IFSC: {req.bankDetails.ifsc}</div>
                    </td>
                    <td style={{ padding: '15px 20px', color: 'var(--text-dark)', fontWeight: '600', fontSize: '13px' }}>
                      ₹{req.amount.toLocaleString()}
                    </td>
                    <td style={{ padding: '15px 20px', color: 'var(--text-muted)', fontSize: '13px' }}>{req.requestedDate}</td>
                    <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                      <button
                        type="button"
                        onClick={() => handlePayRequest(req.id)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: 'none',
                          backgroundColor: 'var(--primary-color)',
                          color: '#fff',
                          cursor: 'pointer',
                          fontWeight: '600',
                          fontSize: '12px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        Pay Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Transaction History Log */}
      <div className="admin-card" style={{ backgroundColor: 'var(--white)', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)', overflow: 'hidden' }}>
        <div style={{ backgroundColor: '#FFF8FA', padding: '15px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaHistory style={{ color: 'var(--primary-color)' }} />
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-dark)', margin: 0 }}>Transaction History</h3>
        </div>
        {payoutHistory.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <FaInfoCircle style={{ fontSize: '32px', marginBottom: '10px', color: 'var(--text-muted)' }} />
            <p>No transaction history logged yet.</p>
          </div>
        ) : (
          <div className="admin-table-responsive" style={{ overflowX: 'auto' }}>
            <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '15px 20px', fontWeight: '700', fontSize: '13px', color: 'var(--text-dark)' }}>Transaction ID</th>
                  <th style={{ padding: '15px 20px', fontWeight: '700', fontSize: '13px', color: 'var(--text-dark)' }}>Recipient Store</th>
                  <th style={{ padding: '15px 20px', fontWeight: '700', fontSize: '13px', color: 'var(--text-dark)' }}>Paid Amount</th>
                  <th style={{ padding: '15px 20px', fontWeight: '700', fontSize: '13px', color: 'var(--text-dark)' }}>Payout Date</th>
                  <th style={{ padding: '15px 20px', fontWeight: '700', fontSize: '13px', color: 'var(--text-dark)' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {payoutHistory.map((txn) => (
                  <tr key={txn.id || txn.txnId} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '15px 20px', fontFamily: 'monospace', fontSize: '12px' }}>{txn.txnId || `TXN${100000 + txn.id}`}</td>
                    <td style={{ padding: '15px 20px', color: 'var(--text-dark)', fontSize: '13px' }}>{txn.sellerName}</td>
                    <td style={{ padding: '15px 20px', color: 'var(--text-dark)', fontWeight: '600', fontSize: '13px' }}>
                      ₹{txn.amount.toLocaleString()}
                    </td>
                    <td style={{ padding: '15px 20px', color: 'var(--text-muted)', fontSize: '13px' }}>{txn.paidDate || txn.requestedDate}</td>
                    <td style={{ padding: '15px 20px' }}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: '600',
                        backgroundColor: '#E8F5E9',
                        color: '#2E7D32',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <FaCheckCircle /> Paid
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayoutsSection;
