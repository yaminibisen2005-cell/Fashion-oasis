import React, { useState } from "react";
import { FaFilter, FaAngleDown } from "react-icons/fa";

const OrdersSection = ({ orders, updateOrderStatus }) => {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  const filteredOrders = activeTab === "All"
    ? orders
    : orders.filter((o) => o.status.toLowerCase() === activeTab.toLowerCase());

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="admin-orders-view">
      <div className="section-title-row">
        <div>
          <h2>Orders</h2>
          <p className="subtitle">Track and process client purchases.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="orders-filter-bar">
        <div className="filter-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`filter-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Process Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  No orders found under '{activeTab}'.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td><strong>#{order.id}</strong></td>
                  <td>{order.customer}</td>
                  <td>{order.date}</td>
                  <td><strong>₹{order.amount.toLocaleString()}</strong></td>
                  <td>
                    <span className={`status-badge-inline ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div className="status-select-wrapper">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <FaAngleDown className="select-icon" />
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

export default OrdersSection;
