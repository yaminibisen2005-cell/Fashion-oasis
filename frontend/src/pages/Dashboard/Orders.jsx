import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { FaTimes, FaMapMarkerAlt, FaExclamationCircle } from "react-icons/fa";
import { getMyOrders, cancelOrder } from "../../api/customer";
import { notifySuccess, notifyError } from "../../utils/alerts";
import "./Orders.css";

const safeStoredJson = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Cancellation States
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [cancelReason, setCancelReason] = useState("Changed my mind");
  const [otherReasonText, setOtherReasonText] = useState("");
  const [cancelling, setCancelling] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getMyOrders();
      const ordersList = Array.isArray(data) ? data : data.orders || data.data || [];
      setOrders(ordersList);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || err.message || "Could not load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelClick = (order) => {
    setOrderToCancel(order);
    setCancelReason("Changed my mind");
    setOtherReasonText("");
    setCancelModalOpen(true);
  };

  const handleCancelSubmit = async () => {
    if (!orderToCancel) return;
    setCancelling(true);
    try {
      const reasonText = cancelReason === "Other" ? otherReasonText : cancelReason;
      const res = await cancelOrder(orderToCancel.orderId || orderToCancel._id, { reason: reasonText });
      if (res.success) {
        notifySuccess("Order cancelled successfully.");
        setCancelModalOpen(false);
        setOrderToCancel(null);
        setSelectedOrder(null);
        await fetchOrders();
      } else {
        notifyError(res.message || "Failed to cancel order.");
      }
    } catch (err) {
      notifyError(err.response?.data?.message || err.message || "Failed to cancel order.");
    } finally {
      setCancelling(false);
    }
  };

  const handleDownloadInvoice = (order) => {
    if (order.status === "Cancelled") {
      notifyError("Invoice is unavailable for cancelled orders.");
      return;
    }
    notifySuccess("Invoice download started...");
    const printableWindow = window.open("", "_blank");
    if (printableWindow) {
      const itemsHtml = (order.items || []).map(item => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.productName || "Product"}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity || 1}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${(item.price || 0).toLocaleString()}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${((item.price || 0) * (item.quantity || 1)).toLocaleString()}</td>
        </tr>
      `).join("");

      printableWindow.document.write(`
        <html>
          <head>
            <title>Invoice - ${order.orderId}</title>
            <style>
              body { font-family: 'Poppins', sans-serif; padding: 40px; color: #333; }
              .header { display: flex; justify-content: space-between; border-bottom: 2px solid #F7E3E7; padding-bottom: 20px; margin-bottom: 30px; }
              .details { display: flex; justify-content: space-between; margin-bottom: 30px; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
              th { background: #FFF8FA; padding: 10px; text-align: left; }
              .total { text-align: right; font-size: 18px; color: #EF6F8F; font-weight: bold; }
            </style>
          </head>
          <body onload="window.print()">
            <div class="header">
              <div>
                <h1 style="color: #EF6F8F; margin: 0;">FASHION OASIS</h1>
                <p style="margin: 5px 0 0 0; color: #888;">Timeless Elegance</p>
              </div>
              <div style="text-align: right;">
                <h2 style="margin: 0;">INVOICE</h2>
                <p style="margin: 5px 0 0 0;">ID: <strong>${order.orderId}</strong></p>
                <p style="margin: 2px 0 0 0;">Date: ${order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "Recent"}</p>
              </div>
            </div>
            <div class="details">
              <div>
                <strong>Sold By:</strong>
                <p style="margin: 5px 0 0 0;">Fashion Oasis Ltd.</p>
                <p style="margin: 2px 0 0 0;">support@fashionoasis.com</p>
              </div>
              <div style="text-align: right;">
                <strong>Deliver To:</strong>
                <p style="margin: 5px 0 0 0;">${order.shippingAddress?.fullName || order.customerName}</p>
                <p style="margin: 2px 0 0 0;">${order.shippingAddress?.address || "Main Street"}</p>
                <p style="margin: 2px 0 0 0;">${order.shippingAddress?.city}, ${order.shippingAddress?.state} - ${order.shippingAddress?.pincode}</p>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th style="text-align: center;">Qty</th>
                  <th style="text-align: right;">Price</th>
                  <th style="text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
            <div style="text-align: right; margin-top: 30px;">
              <span style="font-size: 15px; color: #666;">Grand Total:</span>
              <div class="total">₹${(order.totalAmount || 0).toLocaleString()}</div>
            </div>
            <div style="text-align: center; margin-top: 50px; border-top: 1px solid #eee; padding-top: 20px; font-size: 12px; color: #999;">
              Thank you for shopping with Fashion Oasis!
            </div>
          </body>
        </html>
      `);
      printableWindow.document.close();
    }
  };

  const defaultPlaceholder = "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&q=80";

  // Safely extract backend product ID or slug from an item or order object
  const getProductId = (prod, item) => {
    if (!prod && !item) return null;
    const pId =
      prod?.productId ||
      prod?.product?._id ||
      prod?.product?.id ||
      prod?._id ||
      prod?.id ||
      prod?.slug ||
      item?.productId ||
      item?.product?._id ||
      item?.product?.id;

    return pId ? String(pId).trim() : null;
  };

  const handleViewProduct = (prod, item) => {
    const pId = getProductId(prod, item);

    if (!pId) {
      console.warn("Product ID is not available in backend order response for item:", prod || item);
      setToastMessage("This product is no longer available or product information is missing.");
      setTimeout(() => setToastMessage(""), 4000);
      return;
    }

    navigate(`/product/${pId}`);
  };

  return (
    <DashboardLayout>
      <div className="orders-page">

        <div className="orders-title">
          <h2>My Orders</h2>
          <p>Track and manage all your purchases.</p>
        </div>

        {/* Toast Alert Banner */}
        {toastMessage && (
          <div
            style={{
              background: "#FFF1F0",
              border: "1px solid #FFA39E",
              borderRadius: "12px",
              padding: "14px 20px",
              color: "#D9363E",
              fontSize: "14px",
              fontWeight: 500,
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <FaExclamationCircle /> {toastMessage}
          </div>
        )}

        {loading && <p style={{ textAlign: "center", padding: "30px", color: "#666" }}>Loading your orders...</p>}
        {errorMessage && <p style={{ color: "#d84a5a", textAlign: "center", padding: "20px" }}>{errorMessage}</p>}

        {!loading && !errorMessage && orders.length === 0 && (
          <p style={{ textAlign: "center", padding: "40px", color: "#777" }}>You have not placed any orders yet.</p>
        )}

        {!loading && orders.map((item, index) => {
          const orderId = item.orderId || (item._id ? `#${item._id.slice(-6).toUpperCase()}` : `#FO100${index + 1}`);
          const totalAmountFormatted = item.totalAmount ? item.totalAmount.toLocaleString() : "0";
          const orderDate = item.createdAt
            ? new Date(item.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
            : "Recent";
          const orderStatus = item.status || "Confirmed";
          const orderItems = item.items && item.items.length > 0 ? item.items : [
            {
              productId: item.productId || item._id,
              productName: item.productName || item.product || "Jewellery Item",
              quantity: item.quantity || 1,
              price: item.totalAmount || 0,
              image: item.image || item.productImage || ""
            }
          ];

          const primaryProd = orderItems[0];
          const primaryProductId = getProductId(primaryProd, item);

          return (
            <div className="order-card" key={item._id || item.orderId || index}>

              <div className="order-left-wrapper" style={{ flex: 1, minWidth: 0 }}>
                {orderItems.map((prod, pIdx) => {
                  const rawImg = prod.image || prod.img || prod.productImage || prod.product?.image;
                  const prodImg = rawImg && rawImg.trim() !== "" ? rawImg : defaultPlaceholder;
                  const prodId = getProductId(prod, item);

                  return (
                    <div
                      className="order-left"
                      key={pIdx}
                      style={pIdx > 0 ? { marginTop: "14px", paddingTop: "14px", borderTop: "1px dashed #f6dce2" } : {}}
                    >
                      <img
                        src={prodImg}
                        alt={prod.productName || "Product"}
                        style={{ cursor: prodId ? "pointer" : "default" }}
                        onClick={() => handleViewProduct(prod, item)}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = defaultPlaceholder;
                        }}
                      />

                      <div className="order-info">
                        <h4
                          style={{ cursor: prodId ? "pointer" : "default" }}
                          onClick={() => handleViewProduct(prod, item)}
                          title={prodId ? "Click to view product details" : "Product information unavailable."}
                        >
                          {prod.productName || "Jewellery Item"}
                        </h4>
                        <p className="order-material">
                          Qty: {prod.quantity || 1} • ₹{(prod.price || 0).toLocaleString()} per unit
                        </p>
                        {pIdx === 0 && (
                          <>
                            <p>Order ID: {orderId}</p>
                            <p>Date: {orderDate}</p>
                            <h3>₹{totalAmountFormatted}</h3>
                            {orderStatus.toLowerCase() === "cancelled" && (
                              <div style={{ marginTop: "8px", padding: "8px 12px", background: "#fff5f5", borderLeft: "4px solid #e74c3c", borderRadius: "4px" }}>
                                <p style={{ margin: 0, color: "#e74c3c", fontWeight: "600", fontSize: "12px" }}>
                                  Cancelled on: {item.cancellationDate ? new Date(item.cancellationDate).toLocaleString("en-GB") : "Recent"}
                                </p>
                                {item.cancellationReason && (
                                  <p style={{ margin: "2px 0 0 0", color: "#555", fontSize: "11px", fontStyle: "italic" }}>
                                    Reason: {item.cancellationReason}
                                  </p>
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="order-right" style={{ flexDirection: "column", gap: "8px", alignItems: "stretch" }}>

                <span
                  className={`status ${orderStatus.toLowerCase()}`}
                  style={{ width: "100%", textAlign: "center" }}
                >
                  {orderStatus}
                </span>

                <button
                  type="button"
                  style={{ width: "100%" }}
                  disabled={!primaryProductId}
                  title={!primaryProductId ? "Product information unavailable." : "View Product"}
                  onClick={() => handleViewProduct(primaryProd, item)}
                >
                  View Product
                </button>

                <button
                  type="button"
                  style={{ width: "100%" }}
                  onClick={() => setSelectedOrder(item)}
                >
                  Order Details
                </button>

                <button
                  type="button"
                  style={{ width: "100%" }}
                  disabled={orderStatus.toLowerCase() === "cancelled"}
                  title={orderStatus.toLowerCase() === "cancelled" ? "Cancelled orders cannot be tracked" : "Track Order"}
                  onClick={() => navigate(`/track-order?orderId=${item.orderId || item._id}`)}
                >
                  Track Order
                </button>

                {['pending', 'processing', 'confirmed'].includes(orderStatus.toLowerCase()) && (
                  <button
                    type="button"
                    className="btn-yes-cancel"
                    style={{ width: "100%", backgroundColor: "#e74c3c", borderColor: "#e74c3c", color: "white", padding: "8px 12px" }}
                    onClick={() => handleCancelClick(item)}
                  >
                    Cancel Order
                  </button>
                )}

              </div>

            </div>
          );
        })}

        {/* ORDER DETAILS MODAL */}
        {selectedOrder && (
          <div className="order-modal-overlay" onClick={() => setSelectedOrder(null)}>
            <div className="order-modal-card" onClick={(e) => e.stopPropagation()}>
              <button
                className="order-modal-close"
                onClick={() => setSelectedOrder(null)}
                aria-label="Close modal"
              >
                <FaTimes />
              </button>

              <div className="order-modal-header">
                <h3>Order Details</h3>
                <p>Order ID: {selectedOrder.orderId || (selectedOrder._id ? `#${selectedOrder._id.slice(-6).toUpperCase()}` : "N/A")}</p>
              </div>

              <div className="order-modal-grid">
                <div className="order-modal-meta-item">
                  <label>Order Date</label>
                  <span>
                    {selectedOrder.createdAt
                      ? new Date(selectedOrder.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </span>
                </div>

                <div className="order-modal-meta-item">
                  <label>Status</label>
                  <span className={`status ${(selectedOrder.status || "Pending").toLowerCase()}`}>
                    {selectedOrder.status || "Pending"}
                  </span>
                </div>

                <div className="order-modal-meta-item">
                  <label>Payment Method</label>
                  <span>{(selectedOrder.paymentMethod || "COD").toUpperCase()}</span>
                </div>

                <div className="order-modal-meta-item">
                  <label>Customer Email</label>
                  <span>{selectedOrder.customerEmail || "N/A"}</span>
                </div>
              </div>

              {selectedOrder.shippingAddress && (
                <div className="order-modal-address">
                  <h5><FaMapMarkerAlt /> Shipping Address</h5>
                  <p><strong>{selectedOrder.shippingAddress.fullName}</strong></p>
                  <p>{selectedOrder.shippingAddress.address} {selectedOrder.shippingAddress.addressLine2 || ""}</p>
                  <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}</p>
                  <p>Phone: {selectedOrder.shippingAddress.phoneNumber || selectedOrder.shippingAddress.phone}</p>
                </div>
              )}

              <h4 className="order-modal-items-title">Items Ordered</h4>
              <div className="order-modal-items-list">
                {(selectedOrder.items && selectedOrder.items.length > 0 ? selectedOrder.items : [
                  {
                    productId: selectedOrder.productId || selectedOrder._id,
                    productName: selectedOrder.productName || "Jewellery Item",
                    quantity: selectedOrder.quantity || 1,
                    price: selectedOrder.totalAmount || 0,
                    image: selectedOrder.image || ""
                  }
                ]).map((prodItem, idx) => {
                  const rawImg = prodItem.image || prodItem.img || prodItem.productImage || prodItem.product?.image;
                  const itemImg = rawImg && rawImg.trim() !== "" ? rawImg : defaultPlaceholder;
                  const prodId = getProductId(prodItem, selectedOrder);

                  return (
                    <div className="order-modal-item" key={idx}>
                      <img
                        src={itemImg}
                        alt={prodItem.productName || "Product"}
                        style={{ cursor: prodId ? "pointer" : "default" }}
                        onClick={() => handleViewProduct(prodItem, selectedOrder)}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = defaultPlaceholder;
                        }}
                      />
                      <div className="order-modal-item-details">
                        <h5
                          style={{ cursor: prodId ? "pointer" : "default" }}
                          onClick={() => handleViewProduct(prodItem, selectedOrder)}
                        >
                          {prodItem.productName || "Jewellery Item"}
                        </h5>
                        <p>Qty: {prodItem.quantity || 1} &times; ₹{(prodItem.price || 0).toLocaleString()}</p>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                        <div className="order-modal-item-price">
                          ₹{((prodItem.price || 0) * (prodItem.quantity || 1)).toLocaleString()}
                        </div>
                        <button
                          type="button"
                          className="view-details-btn"
                          style={{ padding: "5px 12px", fontSize: "12px", borderRadius: "8px" }}
                          disabled={!prodId}
                          title={!prodId ? "Product information unavailable." : "View Product Details"}
                          onClick={() => handleViewProduct(prodItem, selectedOrder)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="order-modal-summary">
                <span>Total Amount Paid:</span>
                <h3>₹{(selectedOrder.totalAmount || 0).toLocaleString()}</h3>
              </div>

              {selectedOrder.status === "Cancelled" && (
                <div style={{ background: "#ffe6e6", padding: "12px", borderRadius: "12px", border: "1px solid #ffd1d8", marginTop: "20px", marginBottom: "10px" }}>
                  <strong style={{ color: "#e74c3c", display: "block", fontSize: "14px" }}>Cancellation Details</strong>
                  <span style={{ display: "block", color: "#333", fontSize: "13px", marginTop: "4px" }}>
                    Cancelled on: {selectedOrder.cancellationDate ? new Date(selectedOrder.cancellationDate).toLocaleString("en-GB") : "Recent"}
                  </span>
                  {selectedOrder.cancellationReason && (
                    <span style={{ display: "block", fontSize: "13px", marginTop: "4px", color: "#555", fontStyle: "italic" }}>
                      Reason: {selectedOrder.cancellationReason}
                    </span>
                  )}
                </div>
              )}

              <div style={{ display: "flex", gap: "12px", marginTop: "20px", marginBottom: "10px" }}>
                {selectedOrder.status === "Cancelled" ? (
                  <button
                    disabled
                    style={{ flex: 1, padding: "12px", backgroundColor: "#f2f2f2", color: "#888", borderRadius: "8px", border: "1px solid #ccc", cursor: "not-allowed", fontWeight: "600", fontSize: "13px" }}
                  >
                    Invoice Unavailable
                  </button>
                ) : (
                  <button
                    style={{ flex: 1, padding: "12px", backgroundColor: "transparent", color: "#ea6b8d", borderRadius: "8px", border: "1px solid #ea6b8d", cursor: "pointer", fontWeight: "600", fontSize: "13px" }}
                    onClick={() => handleDownloadInvoice(selectedOrder)}
                  >
                    Download Invoice
                  </button>
                )}

                {['pending', 'processing', 'confirmed'].includes((selectedOrder.status || "Pending").toLowerCase()) && (
                  <button
                    type="button"
                    style={{ flex: 1, padding: "12px", backgroundColor: "#e74c3c", color: "white", borderRadius: "8px", border: "none", fontWeight: "600", cursor: "pointer", fontSize: "13px" }}
                    onClick={() => handleCancelClick(selectedOrder)}
                  >
                    Cancel Order
                  </button>
                )}
              </div>

            </div>
          </div>
        )}

        {/* CUSTOM ORDER CANCELLATION MODAL */}
        {cancelModalOpen && (
          <div className="cancel-modal-overlay" onClick={() => setCancelModalOpen(false)}>
            <div className="cancel-modal-card" onClick={(e) => e.stopPropagation()}>
              <h3>Cancel Order</h3>
              <p>Are you sure you want to cancel this order? This action cannot be undone.</p>

              <div className="reason-select-wrapper">
                <label htmlFor="cancel-reason">Please choose a reason for cancellation:</label>
                <select
                  id="cancel-reason"
                  className="reason-select"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                >
                  <option value="Changed my mind">Changed my mind</option>
                  <option value="Ordered by mistake">Ordered by mistake</option>
                  <option value="Found better price">Found better price</option>
                  <option value="Delivery taking too long">Delivery taking too long</option>
                  <option value="Other">Other</option>
                </select>

                {cancelReason === "Other" && (
                  <input
                    type="text"
                    className="other-reason-input"
                    placeholder="Enter your reason here..."
                    value={otherReasonText}
                    onChange={(e) => setOtherReasonText(e.target.value)}
                  />
                )}
              </div>

              <div className="cancel-modal-actions">
                <button
                  type="button"
                  className="btn-no-cancel"
                  onClick={() => setCancelModalOpen(false)}
                  disabled={cancelling}
                >
                  No, Keep Order
                </button>
                <button
                  type="button"
                  className="btn-yes-cancel"
                  onClick={handleCancelSubmit}
                  disabled={cancelling}
                >
                  {cancelling ? "Cancelling..." : "Yes, Cancel Order"}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

export default Orders;
