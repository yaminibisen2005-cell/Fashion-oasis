import "./DashboardLayout.css";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

import {
  FaHome,
  FaUser,
  FaShoppingBag,
  FaHeart,
  FaStar,
  FaCog,
  FaSignOutAlt,
  FaCamera,
} from "react-icons/fa";

import logo from "../../assets/logo.png"; // Change to your logo

function DashboardLayout({ children ,showProfile = true}) {
   const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(
    "https://i.pravatar.cc/150?img=12"
  );

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);

    // Later you can upload this file to your backend
    // console.log(file);
  };
  return (
    <div className="dashboard-layout">

      {/* Sidebar */}

     <aside className="sidebar">
  


       <div className="logo-section">

  {showProfile ? (
    <>
  <div className="profile-wrapper">
   <img
  src={profileImage}
  alt="Profile"
  className="sidebar-profile"
/>

    <button
  className="edit-profile-btn"
  onClick={handleEditClick}
>
  <FaCamera />
</button>
<input
  type="file"
  accept="image/*"
  ref={fileInputRef}
  onChange={handleImageChange}
  style={{ display: "none" }}
/>
  </div>

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

      <main className="dashboard-main">

        {children}

      </main>

    </div>
  );
}

export default DashboardLayout;
