import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import "./Dashboard.css";

import {
  FaShoppingBag,
  FaHeart,
  FaStar,
  FaGift,
} from "react-icons/fa";

import dashboardbanner from "../../assets/dashboardbanner.png";

import product1 from "../../assets/product1.jpg";
import product2 from "../../assets/product2.jpg";
import product3 from "../../assets/product3.jpg";
import product4 from "../../assets/product4.jpg";

function Dashboard() {

  const stats = [
    {
      icon: <FaShoppingBag />,
      title: "Total Orders",
      value: "24",
    },
    {
      icon: <FaHeart />,
      title: "Wishlist",
      value: "12",
    },
    {
      icon: <FaStar />,
      title: "Reviews",
      value: "8",
    },
    {
      icon: <FaGift />,
      title: "Reward Points",
      value: "350",
    },
  ];

  const orders = [
    {
      id: "#FO1001",
      image: product1,
      product: "Elegant Earrings",
      date: "18 Jul 2026",
      amount: "₹2,499",
      status: "Delivered",
    },
    {
      id: "#FO1002",
      image: product2,
      product: "Royal Necklace",
      date: "16 Jul 2026",
      amount: "₹3,999",
      status: "Shipped",
    },
    {
      id: "#FO1003",
      image: product3,
      product: "Diamond Bracelet",
      date: "12 Jul 2026",
      amount: "₹1,899",
      status: "Confirmed",
    },
    {
      id: "#FO1004",
      image: product4,
      product: "Luxury Keychain",
      date: "10 Jul 2026",
      amount: "₹5,299",
      status: "Cancelled",
    },
  ];

  return (
    <DashboardLayout>

      {/* HERO */}

      <section
        className="dashboard-hero"
        style={{
          backgroundImage: `linear-gradient(
              rgba(35,25,28,.45),
              rgba(35,25,28,.45)
            ),
            url(${dashboardbanner})`,
        }}
      >

        <div className="hero-user">

          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="Profile"
            className="hero-profile"
          />

          <div className="hero-user-info">
            <span>Welcome</span>
            <h4>User</h4>
          </div>

        </div>

        <div className="hero-content">

          <h1>
            Welcome to Fashion Oasis
            
          </h1>

          <p>
            HERE'S WHAT'S HAPPENING WITH YOUR
            <br />
            FASHION OASIS ACCOUNT.
          </p>

        </div>

      </section>

      {/* STATISTICS */}

      <section className="dashboard-cards">

        {stats.map((item, index) => (

          <div
            className="card-box"
            key={index}
          >

            <div className="icon">
              {item.icon}
            </div>

            <h5>{item.title}</h5>

            <h2>{item.value}</h2>

          </div>

        ))}

      </section>
            {/* RECENT ORDERS */}

      <section className="orders-card">

        <div className="orders-header">

          <div>
            <h3>Recent Orders</h3>
            <p>Your latest purchases</p>
          </div>

          <button className="view-all-btn">
            View All →
          </button>

        </div>

        <div className="table-responsive">

          <table>

            <thead>

              <tr>

                <th>Order ID</th>

                <th>Product</th>

                <th>Date</th>

                <th>Amount</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {orders.map((item) => (

                <tr key={item.id}>

                  <td className="order-id">
                    {item.id}
                  </td>

                  <td>

                    <div className="product">

                      <img
                        src={item.image}
                        alt={item.product}
                      />

                      <div className="product-details">

                        <h6>{item.product}</h6>

                        <span>Fashion Oasis</span>

                      </div>

                    </div>

                  </td>

                  <td>{item.date}</td>

                  <td className="amount">
                    {item.amount}
                  </td>

                  <td>

                    <span
                      className={`status ${item.status.toLowerCase()}`}
                    >
                      {item.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>

    </DashboardLayout>
  );
}

export default Dashboard;