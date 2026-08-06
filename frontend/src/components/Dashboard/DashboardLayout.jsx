import "./DashboardLayout.css";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import sidebarbg from "../../assets/sidebarbg.png";
import logo from "../../assets/logo.png";

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

function DashboardLayout({ children, showProfile = true }) {
  const [userName, setUserName] = useState("User");

  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(
    "https://i.pravatar.cc/150?img=12"
  );

  useEffect(() => {
    const storedUser =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(localStorage.getItem("customerInfo")) ||
      JSON.parse(localStorage.getItem("userInfo")) ||
      JSON.parse(localStorage.getItem("profile"));

    if (storedUser) {
      const resolvedName =
        storedUser.name ||
        storedUser.fullName ||
        storedUser.userName ||
        storedUser.username ||
        storedUser.displayName ||
        `${storedUser.firstName || ""} ${storedUser.lastName || ""}`.trim();

      if (resolvedName) {
        setUserName(resolvedName);
      }
    }
  }, []);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setProfileImage(URL.createObjectURL(file));
  };

  return (
    <div className="dashboard-layout">
      <aside
        className="sidebar"
        style={{
          backgroundImage: `url(${sidebarbg})`,
        }}
      >
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

              <h3>{userName}</h3>
            </>
          ) : (
            <>
              <img src={logo} alt="Fashion Oasis" />
              <h3>Fashion Oasis</h3>
            </>
          )}
        </div>

        <ul className="menu">
          <li>
            <Link to="/dashboard">
              <FaHome />
              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <Link to="/dashboard/profile">
              <FaUser />
              <span>Profile</span>
            </Link>
          </li>

          <li>
            <Link to="/dashboard/orders">
              <FaShoppingBag />
              <span>Orders</span>
            </Link>
          </li>

          <li>
            <Link to="/dashboard/wishlist">
              <FaHeart />
              <span>Wishlist</span>
            </Link>
          </li>

          <li>
            <Link to="/dashboard/reviews">
              <FaStar />
              <span>Reviews</span>
            </Link>
          </li>

          <li>
            <Link to="/dashboard/settings">
              <FaCog />
              <span>Account Settings</span>
            </Link>
          </li>
        </ul>

        <div className="logout">
          <Link to="/" onClick={() => localStorage.clear()}>
            <FaSignOutAlt />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;