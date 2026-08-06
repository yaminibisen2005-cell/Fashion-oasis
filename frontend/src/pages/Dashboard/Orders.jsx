 import React, { useState, useEffect } from "react";
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

        const response = await fetch(`http://localhost:5000/api/v1/orders?email=${customerEmail}`);
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

        {!loading && orders.map((item, index) => {
          // Extract proper fields depending on backend naming convention
          const orderId = item._id ? `#${item._id.slice(-6).toUpperCase()}` : `#FO100${index + 1}`;
          const productTitle = item.items && item.items[0] ? item.items[0].productName : "Jewellery Item";
          const productPrice = item.totalAmount ? `₹${item.totalAmount.toLocaleString()}` : "₹0";
          const orderDate = item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "Recent";
          const orderStatus = item.status || "Confirmed";
          const orderImage = item.items && item.items[0] && item.items[0].image ? item.items[0].image : product5;

          return (
            <div className="order-card" key={item._id || index}>

              <div className="order-left">

                <img src={orderImage} alt={productTitle} />

                <div className="order-info">
                  <h4>{productTitle}</h4>
                  <p className="order-material">Material: Handcrafted Luxury</p>
                  <p>Order ID: {orderId}</p>
                  <p>{orderDate}</p>
                  <h3>{productPrice}</h3>
                </div>

              </div>

              <div className="order-right">

                <span
                  className={`status ${orderStatus.toLowerCase()}`}
                >
                  {orderStatus}
                </span>

                <button>View Details</button>

              </div>

            </div>
          );
        })}

      </div>
    </DashboardLayout>
  );
}

export default Orders;