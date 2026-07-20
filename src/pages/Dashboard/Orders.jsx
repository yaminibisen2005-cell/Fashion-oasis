import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import "./Orders.css";

function Orders() {
  return (
    <DashboardLayout>
      <div className="orders-page">

        <h2>My Orders</h2>

        <div className="orders-list">

          <div className="order-card">
            <img
              src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amV3ZWxlcnl8ZW58MHx8MHx8fDA%3D"
              alt="Product"
            />

            <div className="order-details">
              <h4>Ear-Rings</h4>
              <p>Order #FO1001</p>
              <p>18 Jul 2026</p>
              <h5>₹2,499</h5>
            </div>

            <div className="order-status">
              <span className="status delivered">
                Delivered
              </span>

              <button>View Details</button>
            </div>
          </div>

          <div className="order-card">
            <img
              src="https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8amV3ZWxlcnl8ZW58MHx8MHx8fDA%3D"
              alt="Product"
            />

            <div className="order-details">
              <h4>Rings</h4>
              <p>Order #FO1002</p>
              <p>16 Jul 2026</p>
              <h5>₹3,999</h5>
            </div>

            <div className="order-status">
              <span className="status shipped">
                Shipped
              </span>

              <button>View Details</button>
            </div>
          </div>

          <div className="order-card">
            <img
              src="https://images.unsplash.com/photo-1569397288884-4d43d6738fbd?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGpld2VsZXJ5fGVufDB8fDB8fHww"
              alt="Product"
            />

            <div className="order-details">
              <h4>Neck-lace</h4>
              <p>Order #FO1003</p>
              <p>12 Jul 2026</p>
              <h5>₹5,299</h5>
            </div>

            <div className="order-status">
              <span className="status processing">
                Processing
              </span>

              <button>View Details</button>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Orders;