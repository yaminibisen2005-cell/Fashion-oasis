
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import "./Dashboard.css";

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <h2>Welcome Back 👋</h2>
        <p>Here's what's happening with your Fashion Oasis account.</p>
      </div>

      <div className="dashboard-cards">
        <div className="card-box">
          <h5>Total Orders</h5>
          <h2>24</h2>
        </div>

        <div className="card-box">
          <h5>Wishlist</h5>
          <h2>12</h2>
        </div>

        <div className="card-box">
          <h5>Reviews</h5>
          <h2>8</h2>
        </div>

        <div className="card-box">
          <h5>Reward Points</h5>
          <h2>350</h2>
        </div>
      </div>

      <div className="recent-orders">
        <h3>Recent Orders</h3>

        <table className="table table-hover align-middle">
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
            <tr>
              <td>#FO1001</td>
              <td>Women's Dress</td>
              <td>18 Jul 2026</td>
              <td>₹2,499</td>
              <td>
                <span className="badge bg-success">Delivered</span>
              </td>
            </tr>

            <tr>
              <td>#FO1002</td>
              <td>Leather Handbag</td>
              <td>16 Jul 2026</td>
              <td>₹3,999</td>
              <td>
                <span className="badge bg-warning text-dark">Shipped</span>
              </td>
            </tr>

            <tr>
              <td>#FO1003</td>
              <td>Running Shoes</td>
              <td>12 Jul 2026</td>
              <td>₹1,899</td>
              <td>
                <span className="badge bg-primary">Confirmed</span>
              </td>
            </tr>

            <tr>
              <td>#FO1004</td>
              <td>Watch</td>
              <td>10 Jul 2026</td>
              <td>₹5,299</td>
              <td>
                <span className="badge bg-danger">Cancelled</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;