import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {
  FaTruck,
  FaBoxOpen,
  FaClipboardCheck,
  FaRegCalendarCheck,
  FaCheck,
  FaSearch,
  FaExclamationTriangle,
  FaShoppingBag,
} from "react-icons/fa";

import apiClient from "../../api/client";
import "./TrackOrder.css";

const defaultPlaceholder =
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&q=80";

const safeStoredJson = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};

const getBackendOrderId = (order) => {
  if (!order) return "";
  return order.orderId || order._id || order.id || "";
};

const calculateTimelineSteps = (status, dateStr) => {
  const normalizedStatus = (status || "").toLowerCase().trim();
  const isCancelled = normalizedStatus === "cancelled";

  const orderDate = dateStr
    ? new Date(dateStr).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Recent";

  if (isCancelled) {
    return {
      progress: "0%",
      statusMessage: "This order has been cancelled.",
      steps: [
        {
          title: "Order Placed",
          date: orderDate,
          icon: <FaClipboardCheck />,
          active: false,
          completed: false,
        },
        {
          title: "Cancelled",
          date: "Order Cancelled",
          icon: <FaExclamationTriangle />,
          active: true,
          completed: false,
        },
      ],
    };
  }

  const isDelivered = normalizedStatus === "delivered";
  const isOutForDelivery =
    normalizedStatus === "out for delivery" || isDelivered;

  const isShipped =
    normalizedStatus === "shipped" || isOutForDelivery;

  const isConfirmed =
    normalizedStatus === "confirmed" ||
    normalizedStatus === "processing" ||
    isShipped;

  let progress = "20%";
  let statusMessage =
    "Your order has been placed and is waiting for seller confirmation.";

  if (isDelivered) {
    progress = "100%";
    statusMessage = "Your order has been successfully delivered!";
  } else if (isOutForDelivery) {
    progress = "80%";
    statusMessage =
      "Your order is out for delivery and will reach you soon.";
  } else if (isShipped) {
    progress = "60%";
    statusMessage =
      "Your package has been shipped and is on its way.";
  } else if (isConfirmed) {
    progress = "40%";
    statusMessage =
      "Your order has been confirmed and is being packed.";
  }

  return {
    progress,
    statusMessage,
    steps: [
      {
        title: "Order Placed",
        date: orderDate,
        icon: <FaClipboardCheck />,
        active: !isConfirmed,
        completed: isConfirmed,
      },
      {
        title: "Confirmed",
        date: isConfirmed ? "Confirmed" : "Pending",
        icon: <FaRegCalendarCheck />,
        active: isConfirmed && !isShipped,
        completed: isShipped,
      },
      {
        title: "Shipped",
        date: isShipped ? "In Transit" : "Pending",
        icon: <FaBoxOpen />,
        active: isShipped && !isOutForDelivery,
        completed: isOutForDelivery,
      },
      {
        title: "Out for Delivery",
        date: isOutForDelivery ? "Expected Today" : "Pending",
        icon: <FaTruck />,
        active: isOutForDelivery && !isDelivered,
        completed: isDelivered,
      },
      {
        title: "Delivered",
        date: isDelivered ? "Delivered" : "Pending",
        icon: <FaCheck />,
        active: isDelivered,
        completed: isDelivered,
      },
    ],
  };
};

const TrackOrder = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const queryOrderId =
    searchParams.get("orderId") || location.state?.orderId;

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchCustomerOrders = async () => {
  setLoading(true);
  setErrorMessage("");

  try {
    const customerInfo = safeStoredJson("customerInfo");
    const user =
      customerInfo ||
      safeStoredJson("userInfo") ||
      safeStoredJson("user");

    const customerEmail =
      localStorage.getItem("customerEmail") || user?.email;

    let fetchedOrders = [];

    // Primary API
    try {
      const res = await apiClient.get("/orders/my-orders");

      fetchedOrders = Array.isArray(res.data)
        ? res.data
        : res.data?.orders || res.data?.data || [];
    } catch (err) {
      console.warn("Primary Orders API Failed:", err);
    }

    // Fallback API
    if (fetchedOrders.length === 0 && customerEmail) {
      try {
        const API_URL = import.meta.env.VITE_API_URL;

        const res2 = await fetch(
          `${API_URL}/api/v1/orders?email=${encodeURIComponent(
            customerEmail
          )}`
        );

        const data2 = await res2.json();

        if (res2.ok) {
          fetchedOrders = Array.isArray(data2)
            ? data2
            : data2.orders || data2.data || [];
        }
      } catch (err) {
        console.warn("Fallback Orders API Failed:", err);
      }
    }

    // LocalStorage fallback
    if (fetchedOrders.length === 0) {
      const localOrders =
        safeStoredJson("orders") ||
        safeStoredJson("customerOrders") ||
        [];

      if (Array.isArray(localOrders)) {
        fetchedOrders = localOrders;
      }
    }

    setOrders(fetchedOrders);

    if (fetchedOrders.length > 0) {
      const matchedOrder = queryOrderId
        ? fetchedOrders.find(
            (o) =>
              getBackendOrderId(o).toLowerCase() ===
              queryOrderId.toLowerCase()
          )
        : null;

      const target = matchedOrder || fetchedOrders[0];

      setSelectedOrder(target);

      fetchTrackingForOrder(getBackendOrderId(target), target);
    } else if (queryOrderId) {
      handleSearchOrder(queryOrderId);
    }
  } catch (err) {
    setErrorMessage(
      err.response?.data?.message ||
        err.message ||
        "Failed to load orders."
    );
  } finally {
    setLoading(false);
  }
};

const fetchTrackingForOrder = async (
  orderId,
  fallbackOrder = null
) => {
  if (!orderId) return;

  setTrackingLoading(true);

  try {
    let latestData = null;

    // Primary API
    try {
      const res = await apiClient.get(`/orders/${orderId}`);

      latestData =
        res.data?.order ||
        res.data?.data ||
        res.data;
    } catch (err) {
      console.warn("Primary Tracking API Failed:", err);
    }

    // Fallback API
    if (!latestData) {
      try {
        const API_URL = import.meta.env.VITE_API_URL;

        const res2 = await fetch(
          `${API_URL}/api/v1/orders/${encodeURIComponent(orderId)}`
        );

        const data2 = await res2.json();

        if (res2.ok) {
          latestData =
            data2.order ||
            data2.data ||
            data2;
        }
      } catch (err) {
        console.warn("Fallback Tracking API Failed:", err);
      }
    }

    if (latestData && getBackendOrderId(latestData)) {
      setSelectedOrder(latestData);
    } else if (fallbackOrder) {
      setSelectedOrder(fallbackOrder);
    }
  } catch (err) {
    console.warn("Tracking Error:", err);

    if (fallbackOrder) {
      setSelectedOrder(fallbackOrder);
    }
  } finally {
    setTrackingLoading(false);
  }
};

const handleSearchOrder = (idToSearch) => {
  const term = (idToSearch || searchInput).trim();

  if (!term) return;

  const matched = orders.find(
    (o) =>
      getBackendOrderId(o).toLowerCase() ===
      term.toLowerCase()
  );

  if (matched) {
    setSelectedOrder(matched);

    fetchTrackingForOrder(
      getBackendOrderId(matched),
      matched
    );
  } else {
    fetchTrackingForOrder(term, {
      orderId: term,
      status: "Placed",
      createdAt: new Date().toISOString(),
      items: [],
    });
  }
};

useEffect(() => {
  fetchCustomerOrders();
}, []);


const activeBackendId = getBackendOrderId(selectedOrder);
const activeStatus = selectedOrder?.status || "Placed";
const activeDate = selectedOrder?.createdAt || selectedOrder?.date;

const activePaymentStatus =
  selectedOrder?.paymentStatus ||
  (selectedOrder?.isPaid ? "Paid" : "Pending");

const activeTotal = selectedOrder?.totalAmount
  ? Number(selectedOrder.totalAmount).toLocaleString()
  : selectedOrder?.total
  ? Number(selectedOrder.total).toLocaleString()
  : "0";

const activeItems =
  selectedOrder?.items?.length > 0
    ? selectedOrder.items
    : selectedOrder?.productName
    ? [
        {
          productName: selectedOrder.productName,
          quantity: selectedOrder.quantity || 1,
          price: selectedOrder.totalAmount || 0,
          image:
            selectedOrder.image ||
            selectedOrder.productImage ||
            "",
        },
      ]
    : [];

const timelineInfo = calculateTimelineSteps(
  activeStatus,
  activeDate
);

const formattedOrderDate = activeDate
  ? new Date(activeDate).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  : "N/A";

const expectedDeliveryDate = activeDate
  ? new Date(
      new Date(activeDate).getTime() +
        5 * 24 * 60 * 60 * 1000
    ).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  : "3-5 Business Days";

const courierName =
  selectedOrder?.courier || "Delhivery Express";

const shippingId =
  selectedOrder?.shippingId ||
  selectedOrder?.trackingId ||
  (activeBackendId
    ? `DEL${activeBackendId
        .slice(-8)
        .toUpperCase()}`
    : "DEL849201938IN");

return (
  <>
    <Navbar />

    <div className="tracking-page">
      <div className="container">
        <div className="tracking-card">

          {/* Header */}
          <div className="tracking-title-section">
            <div>
              <h1>Track Your Order</h1>

              <p
                style={{
                  color: "#777",
                  fontSize: "14px",
                  marginTop: "4px",
                }}
              >
                Real-time status updates for your Fashion Oasis purchases.
              </p>
            </div>

            <div
              className="search-order-box"
              style={{ margin: 0 }}
            >
              <input
                type="text"
                placeholder="Enter Backend Order ID..."
                value={searchInput}
                className="search-order-input"
                onChange={(e) =>
                  setSearchInput(e.target.value)
                }
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  handleSearchOrder()
                }
              />

              <button
                className="search-order-btn"
                onClick={handleSearchOrder}
              >
                <FaSearch
                  style={{ marginRight: "6px" }}
                />
                Track
              </button>
            </div>
          </div>

          {/* Error */}
          {errorMessage && (
            <div className="tracking-error-alert">
              <span>{errorMessage}</span>

              <button
                className="retry-btn"
                onClick={fetchCustomerOrders}
              >
                Retry
              </button>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
              }}
            >
              <div
                className="pulse-dot"
                style={{
                  width: 20,
                  height: 20,
                  margin: "0 auto 15px",
                }}
              />

              <p
                style={{
                  color: "#666",
                  fontSize: 15,
                }}
              >
                Fetching your orders...
              </p>
            </div>
          )}

          {/* Empty */}
          {!loading &&
            !errorMessage &&
            orders.length === 0 &&
            !selectedOrder && (
              <div className="tracking-empty-state">
                <FaShoppingBag className="tracking-empty-icon" />

                <h2>No Orders Found</h2>

                <p>
                  You haven't placed any orders yet.
                </p>

                <Link
                  to="/shop"
                  className="shop-now-btn"
                >
                  Explore Collection
                </Link>
              </div>
            )}

          {/* Order List */}
          {!loading &&
            orders.length > 1 && (
              <div className="order-selector-section">
                <div className="order-selector-title">
                  <span>Your Recent Orders</span>

                  <span
                    style={{
                      fontSize: 13,
                      color: "#888",
                      fontWeight: 400,
                    }}
                  >
                    Select an order to track
                  </span>
                </div>

                <div className="customer-orders-list">
                  {orders.map((ord) => {
                    const bId =
                      getBackendOrderId(ord);

                    const isSelected =
                      bId === activeBackendId;

                    const ordStatus =
                      ord.status || "Placed";

                    const firstItem =
                      ord.items?.[0] || ord;

                    const thumb =
                      firstItem.image ||
                      firstItem.productImage ||
                      firstItem.product?.image ||
                      defaultPlaceholder;

                    const ordTotal =
                      ord.totalAmount
                        ? Number(
                            ord.totalAmount
                          ).toLocaleString()
                        : "0";

                    return (
                      <div
                        key={bId || ord._id}
                        className={`order-select-card ${
                          isSelected
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => {
                          setSelectedOrder(ord);

                          fetchTrackingForOrder(
                            bId,
                            ord
                          );
                        }}
                      >
                        <div className="order-select-header">
                          <span className="order-id-badge">
                            #{bId}
                          </span>

                          <span
                            className={`order-status-pill ${ordStatus
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                          >
                            {ordStatus}
                          </span>
                        </div>

                        <div className="order-select-details">
                          <img
                            src={thumb}
                            alt="Product"
                            className="order-thumb-img"
                            onError={(e) =>
                              (e.target.src =
                                defaultPlaceholder)
                            }
                          />

                          <div className="order-select-info">
                            <div className="order-select-name">
                              {firstItem.productName ||
                                firstItem.title ||
                                "Jewellery Item"}
                            </div>

                            <div className="order-select-meta">
                              <span>
                                Qty:{" "}
                                {firstItem.quantity ||
                                  1}
                              </span>

                              <strong
                                style={{
                                  color:
                                    "#EF6F8F",
                                }}
                              >
                                ₹{ordTotal}
                              </strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          {/* Active Order Details Starts Here */}


                    {!loading && selectedOrder && (
            <>
              <div
                className="tracking-meta-row"
                style={{ marginBottom: "30px" }}
              >
                <div className="tracking-meta">
                  <p>
                    Order ID: <span>#{activeBackendId}</span>
                  </p>

                  <p>
                    Date: <span>{formattedOrderDate}</span>
                  </p>

                  <p>
                    Payment:
                    <span
                      style={{
                        color:
                          activePaymentStatus === "Paid"
                            ? "#22A55A"
                            : "#C69214",
                      }}
                    >
                      {" "}
                      {activePaymentStatus}
                    </span>
                  </p>

                  <p>
                    Total Amount:
                    <span style={{ color: "#EF6F8F" }}>
                      {" "}
                      ₹{activeTotal}
                    </span>
                  </p>
                </div>
              </div>

              {trackingLoading && (
                <p
                  style={{
                    fontSize: "13px",
                    color: "#EF6F8F",
                    marginBottom: "15px",
                  }}
                >
                  Updating live tracking details...
                </p>
              )}

              {/* Timeline */}

              <div className="timeline-container">
                <div className="timeline-line">
                  <div
                    className="timeline-progress"
                    style={{
                      width: timelineInfo.progress,
                    }}
                  ></div>
                </div>

                <div className="timeline-steps">
                  {timelineInfo.steps.map((step, index) => (
                    <div
                      key={index}
                      className={`timeline-step ${
                        step.completed ? "completed" : ""
                      } ${step.active ? "current" : ""}`}
                    >
                      <div className="step-icon-wrapper">
                        {step.completed ? (
                          <FaCheck className="check-small" />
                        ) : (
                          step.icon
                        )}
                      </div>

                      <div className="step-content">
                        <h4>{step.title}</h4>
                        <p>{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status + Shipping */}

              <div className="tracking-details-grid">
                <div className="status-card">
                  <h3>Current Status</h3>

                  <div className="status-badge-row">
                    <span
                      className="status-badge"
                      style={
                        activeStatus.toLowerCase() === "cancelled"
                          ? {
                              background: "#FFE9EE",
                              color: "#EF6F8F",
                            }
                          : {}
                      }
                    >
                      {activeStatus}
                    </span>

                    {activeStatus.toLowerCase() !==
                      "cancelled" && (
                      <div className="pulse-dot"></div>
                    )}
                  </div>

                  <p className="status-msg">
                    {timelineInfo.statusMessage}
                  </p>

                  <div className="expected-box">
                    <span>Expected Delivery</span>

                    <strong>{expectedDeliveryDate}</strong>
                  </div>
                </div>

                <div className="shipping-info-card">
                  <h3>Shipping Details</h3>

                  <div className="info-box">
                    <div className="info-row">
                      <span>Courier Service</span>

                      <strong>{courierName}</strong>
                    </div>

                    <div className="info-row">
                      <span>Tracking ID</span>

                      <strong>{shippingId}</strong>
                    </div>
                  </div>

                  <a
                    href="https://www.delhivery.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="track-external-link"
                  >
                    Track on Delhivery
                  </a>
                </div>
              </div>

              {/* Products */}

              {activeItems.length > 0 && (
                <div className="tracking-products-card">
                  <h3>
                    Items in this Order ({activeItems.length})
                  </h3>

                  {activeItems.map((prod, idx) => {
                    const img =
                      prod.image ||
                      prod.img ||
                      prod.productImage ||
                      prod.product?.image ||
                      defaultPlaceholder;

                    const price = prod.price
                      ? Number(prod.price).toLocaleString()
                      : "0";

                    return (
                      <div
                        className="product-item-row"
                        key={idx}
                      >
                        <img
                          src={img}
                          alt={
                            prod.productName ||
                            prod.name ||
                            "Product"
                          }
                          className="product-item-img"
                          onError={(e) => {
                            e.target.src =
                              defaultPlaceholder;
                          }}
                        />

                        <div className="product-item-details">
                          <div className="product-item-title">
                            {prod.productName ||
                              prod.name ||
                              prod.title ||
                              "Handcrafted Jewellery"}
                          </div>

                          <div className="product-item-qty">
                            Quantity:
                            {" "}
                            {prod.quantity || 1}
                          </div>
                        </div>

                        <div className="product-item-price">
                          ₹{price}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>

    <Footer />
  </>
);

};

export default TrackOrder;