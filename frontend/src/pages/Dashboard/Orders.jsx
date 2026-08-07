 import React, { useState, useEffect } from "react";
import { getOrders } from "../../api/customer";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import "./Orders.css";
import product5 from "../../assets/product5.jpg"; // Fallback image

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const customerEmail = localStorage.getItem("customerEmail");
        
        if (!customerEmail) {
          setErrorMessage("Please log in to view your orders.");
          setLoading(false);
          return;
        }

        const data = await getOrders(customerEmail);

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

  return (
    <DashboardLayout>
      <div className="orders-page">

        <div className="orders-title">
          <h2>My Orders</h2>
          <p>Track and manage all your purchases.</p>
        </div>

        {loading && <p style={{ textAlign: "center", padding: "20px" }}>Loading your orders...</p>}
        {errorMessage && <p style={{ color: "red", textAlign: "center", padding: "20px" }}>{errorMessage}</p>}

        {!loading && !errorMessage && orders.length === 0 && (
          <p style={{ textAlign: "center", padding: "20px", color: "#777" }}>You have not placed any orders yet.</p>
        )}

        {!loading && orders.flatMap((order, orderIndex) => {
          const orderListId = order.orderId || (order._id ? `#${order._id.slice(-6).toUpperCase()}` : `#FO100${orderIndex + 1}`);
          const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "Recent";
          const orderStatus = order.status || "Confirmed";
          
          // Grab all items in the order, or fallback if empty
          const orderItems = order.items && order.items.length > 0 ? order.items : [{ productName: "Jewellery Item", price: order.totalAmount || 0, quantity: 1, image: product5 }];

          // Render a card for EVERY individual item in the order
          return orderItems.map((item, itemIdx) => {
            const productTitle = item.productName || item.name || "Jewellery Item";
         const itemPrice = "₹" + ((item.price || 0) * (item.quantity || 1)).toLocaleString();
            const orderImage = item.image || product5;

            return (
              <div className="order-card" key={`${order._id || orderIndex}-${itemIdx}`}>
                <div className="order-left">
                  <img src={orderImage} alt={productTitle} />
                  <div className="order-info">
                    <h4>{productTitle}</h4>
                    <p className="order-material">Qty: {item.quantity || 1} | Handcrafted Luxury</p>
                    <p>Order ID: {orderListId}</p>
                    <p>{orderDate}</p>
                    <h3>{itemPrice}</h3>
                  </div>
                </div>

                <div className="order-right">
                  <span className={`status ${orderStatus.toLowerCase()}`}>
                    {orderStatus}
                  </span>
                  <button>View Details</button>
                </div>
              </div>
            );
          });
        })}

      </div>
    </DashboardLayout>
  );
}

export default Orders;