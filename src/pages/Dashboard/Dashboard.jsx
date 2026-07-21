
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import "./Dashboard.css";

import {
  FaShoppingBag,
  FaHeart,
  FaStar,
  FaGift,
  FaRegHeart,
  FaTruck,
  FaArrowRight,
} from "react-icons/fa";

import dashboardbanner from "../../assets/dashboardbanner.png";

// Import actual product images from your assets folder
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
      subtitle: "↑ 3 this month",
      subtitleClass: "growth",
    },
    {
      icon: <FaHeart />,
      title: "Wishlist",
      value: "12",
      subtitle: "Items",
    },
    {
      icon: <FaStar />,
      title: "Reviews",
      value: "8",
      subtitle: "Reviews",
    },
    {
      icon: <FaGift />,
      title: "Reward Points",
      value: "350",
      subtitle: "Points",
    },
  ];

  const quickActions = [
    { icon: <FaShoppingBag />, label: "Shop Now" },
    { icon: <FaHeart />, label: "Wishlist" },
    { icon: <FaTruck />, label: "Track Order" },
    { icon: <FaGift />, label: "Rewards" },
  ];

  const orders = [
    {
      id: "Order #FO12345",
      image: product1,
      product: "Rose Quartz Necklace",
      date: "18 July 2025",
      amount: "₹1,299",
      status: "Delivered",
    },
    {
      id: "Order #FO12344",
      image: product2,
      product: "Floral Diamond Ring",
      date: "14 July 2025",
      amount: "₹1,799",
      status: "Shipped",
    },
    {
      id: "Order #FO12343",
      image: product3,
      product: "Pearl Drop Earrings",
      date: "10 July 2025",
      amount: "₹999",
      status: "Processing",
    },
  ];

  const recommendations = [
    {
      id: 1,
      name: "Kundan Flower Earrings",
      rating: "★★★★★",
      reviewsCount: 128,
      price: "₹1,199",
      originalPrice: "₹1,599",
      image: product1,
    },
    {
      id: 2,
      name: "Dainty Pearl Necklace",
      rating: "★★★★★",
      reviewsCount: 96,
      price: "₹1,499",
      originalPrice: "₹1,999",
      image: product2,
    },
    {
      id: 3,
      name: "Gold Plated Bracelet",
      rating: "★★★★★",
      reviewsCount: 78,
      price: "₹999",
      originalPrice: "₹1,299",
      image: product3,
    },
    {
      id: 4,
      name: "Floral Stud Earrings",
      rating: "★★★★★",
      reviewsCount: 64,
      price: "₹749",
      originalPrice: "₹999",
      image: product4,
    },
  ];

  return (
    <DashboardLayout>
      {/* HERO SECTION */}
      <section
        className="dashboard-hero"
        style={{
          backgroundImage: `linear-gradient(
              rgba(35, 25, 28, 0.45),
              rgba(35, 25, 28, 0.45)
            ),
            url(${dashboardbanner})`,
        }}
      >
        <div className="hero-content">
          <h1>Welcome back, Shwet Samrat! ✨</h1>
          <p>Here's what's happening with your Fashion Oasis account.</p>

          <div className="hero-actions">
            <button className="btn-primary">
              <FaShoppingBag /> Track Order
            </button>
            <button className="btn-secondary">
              <FaShoppingBag /> Continue Shopping
            </button>
          </div>
        </div>
      </section>

      {/* STATS & QUICK ACTIONS SECTION */}
      <section className="dashboard-metrics">
        <div className="dashboard-cards">
          {stats.map((item, index) => (
            <div className="card-box" key={index}>
              <div className="icon">{item.icon}</div>
              <h5>{item.title}</h5>
              <h2>{item.value}</h2>
              <span className={`subtitle ${item.subtitleClass || ""}`}>
                {item.subtitle}
              </span>
            </div>
          ))}
        </div>

        {/* QUICK ACTIONS PANEL */}
        <div className="quick-actions-card">
          <h5>Quick Actions</h5>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <button key={index} className="quick-action-btn">
                {action.icon}
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT ORDERS */}
      <section className="orders-card">
        <div className="orders-header">
          <div>
            <h3>Recent Orders</h3>
          </div>
          <button className="view-all-link">
            View All <FaArrowRight />
          </button>
        </div>

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="product">
                      <img src={item.image} alt={item.product} />
                      <div className="product-details">
                        <h6>{item.product}</h6>
                        <span className="order-id">{item.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>{item.date}</td>
                  <td>
                    <span
                      className={`status ${item.status.toLowerCase()}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="amount">{item.amount}</td>
                  <td>
                    <button className="view-details-btn">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* RECOMMENDED FOR YOU */}
      <section className="recommendations-section">
        <div className="section-header">
          <h3>Recommended For You</h3>
          <button className="view-all-link">
            View All Products <FaArrowRight />
          </button>
        </div>

        <div className="recommendations-grid">
          {recommendations.map((prod) => (
            <div className="recommendation-card" key={prod.id}>
              <button className="wishlist-btn">
                <FaRegHeart />
              </button>
              <div className="img-wrapper">
                <img src={prod.image} alt={prod.name} />
              </div>
              <div className="recommendation-details">
                <h6>{prod.name}</h6>
                <div className="rating">
                  <span className="stars">{prod.rating}</span>
                  <span className="reviews-count">({prod.reviewsCount})</span>
                </div>
                <div className="pricing">
                  <span className="price">{prod.price}</span>
                  <span className="original-price">{prod.originalPrice}</span>
                </div>
                <button className="add-to-cart-btn">
                  <FaShoppingBag /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}

export default Dashboard;