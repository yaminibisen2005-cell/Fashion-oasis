import React from "react";

const CustomersSection = ({ customers, toggleCustomerStatus }) => {
  return (
    <div className="admin-customers-view">
      <div className="section-title-row">
        <div>
          <h2>Customers</h2>
          <p className="subtitle">View and audit your user accounts.</p>
        </div>
      </div>

      <div className="table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Orders</th>
              <th>Spent</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust, idx) => (
              <tr key={idx}>
                <td>
                  <div className="tbl-product-cell">
                    <img src={cust.img} alt={cust.name} className="avatar" />
                    <strong>{cust.name}</strong>
                  </div>
                </td>
                <td>{cust.email}</td>
                <td>{cust.orders}</td>
                <td className="text-pink"><strong>₹{cust.spent.toLocaleString()}</strong></td>
                <td>
                  <span
                    className={`status-badge-inline ${
                      cust.status === "Active" ? "active" : "inactive"
                    }`}
                    onClick={() => toggleCustomerStatus(cust.name)}
                    style={{ cursor: "pointer" }}
                    title="Click to toggle status"
                  >
                    {cust.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersSection;
