import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { FaTimes, FaMapMarkerAlt, FaExclamationCircle } from "react-icons/fa";
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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const customerInfo = safeStoredJson("customerInfo");
        const user = customerInfo || safeStoredJson("userInfo") || safeStoredJson("user");
        const customerEmail = localStorage.getItem("customerEmail") || user?.email;

        if (!customerEmail) {
          setErrorMessage("Please log in to view your orders.");
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:5000/api/v1/orders?email=${encodeURIComponent(customerEmail)}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch orders");
        }

        // Handle array response structure safely
        const ordersList = Array.isArray(data) ? data : data.orders || data.data || [];
        setOrders(ordersList);
      } catch (err) {
        setErrorMessage(err.message || "Could not load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="order-right">

                <span
                  className={`status ${orderStatus.toLowerCase()}`}
                >
                  {orderStatus}
                </span>

                <button
                  type="button"
                  disabled={!primaryProductId}
                  title={!primaryProductId ? "Product information unavailable." : "View Details"}
                  style={!primaryProductId ? { opacity: 0.6, cursor: "not-allowed" } : {}}
                  onClick={() => handleViewProduct(primaryProd, item)}
                >
                  View Details
                </button>

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
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

export default Orders;
