import "./DashboardLayout.css";
import { Link } from "react-router-dom";
import sidebarbg from "../../assets/sidebarbg.png"

import {
  FaHome,
  FaUser,
  FaShoppingBag,
  FaHeart,
  FaStar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import logo from "../../assets/logo.png"; // Change to your logo

function DashboardLayout({ children ,showProfile = true}) {
  return (
    <div className="dashboard-layout">

      {/* Sidebar */}

     <aside
  className="sidebar"
  style={{
    backgroundImage: `url(${sidebarbg})`,
  }}
>

       <div className="logo-section">

  {showProfile ? (
    <>
      <img
        src="https://i.pravatar.cc/150?img=12"
        alt="Profile"
        className="sidebar-profile"
      />

      <h3>Shwet Samrat</h3>

      
    </>
  ) : (
    <>
      <img src={logo} alt="Fashion Oasis" />

      <h3>Fashion Oasis</h3>
    </>
  )}

</div>
        <ul className="menu">

          <li className="">
            <Link to="/dashboard">
              <FaHome />
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/dashboard/profile">
              <FaUser />
              Profile
            </Link>
          </li>

          <li>
            <Link to="/dashboard/orders">
              <FaShoppingBag />
              Orders
            </Link>
          </li>

          <li>
            <Link to="/dashboard/wishlist">
              <FaHeart />
              Wishlist
            </Link>
          </li>

          <li>
            <Link to="/dashboard/reviews">
              <FaStar />
              Reviews
            </Link>
          </li>

          <li>
            <Link to="/dashboard/settings">
              <FaCog />
              Account Settings
            </Link>
          </li>

        </ul>

        <div className="logout">

          <Link to="/">
            <FaSignOutAlt />
            Logout
          </Link>

        </div>

      </aside>

      {/* Main */}

      <main className="dashboard-content">

        {children}

      </main>

    </div>
  );
}

export default DashboardLayout;
