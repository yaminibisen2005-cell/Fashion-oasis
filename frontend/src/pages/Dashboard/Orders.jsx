import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import "./Orders.css";

import product7 from "../../assets/product7.jpg";
import product8 from "../../assets/product8.jpg";
import product5 from "../../assets/product5.jpg";
import product6 from "../../assets/product6.jpg";

const orders = [
  {
    id: "#FO1001",
    product: "Necklace",
    image: product5,
    date: "18 Jul 2026",
    price: "₹2,499",
    status: "Delivered",
  },
  {
    id: "#FO1002",
    product: "Key-chain",
    image: product8,
    date: "16 Jul 2026",
    price: "₹3,999",
    status: "Shipped",
  },
  {
    id: "#FO1003",
    product: "Rings",
    image: product6,
    date: "12 Jul 2026",
    price: "₹1,899",
    status: "Confirmed",
  },
  {
    id: "#FO1004",
    product: "Decorative Flower",
    image: product7,
    date: "10 Jul 2026",
    price: "₹5,299",
    status: "Cancelled",
  },
];

function Orders() {
  return (
    <DashboardLayout>
      <div className="orders-page">

        <div className="orders-title">
          <h2>My Orders</h2>
          <p>Track and manage all your purchases.</p>
        </div>

        {orders.map((item) => (
          <div className="order-card" key={item.id}>

            <div className="order-left">

              <img src={item.image} alt={item.product} />

              <div className="order-info">

                <h4>{item.product}</h4>

                <p>Order ID: {item.id}</p>

                <p>{item.date}</p>

                <h3>{item.price}</h3>

              </div>

            </div>

            <div className="order-right">

              <span
                className={`status ${item.status.toLowerCase()}`}
              >
                {item.status}
              </span>

              <button>View Details</button>

            </div>

          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default Orders;