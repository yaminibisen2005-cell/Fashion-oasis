 import "./DashboardLayout.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sidebarbg from "../../assets/sidebarbg.png";

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

import logo from "../../assets/logo.png";

function DashboardLayout({ children, showProfile = true }) {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    // Check all possible keys where Login.jsx might be storing the user object
    const storedUser = 
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(localStorage.getItem("customerInfo")) || 
      JSON.parse(localStorage.getItem("userInfo")) || 
      JSON.parse(localStorage.getItem("profile"));

    if (storedUser) {
      // Maps every possible property name your backend might use for the name
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
              <div className="profile-wrapper">
                <img
                  src="https://i.pravatar.cc/150?img=12"
                  alt="Profile"
                  className="sidebar-profile"
                />

                <button className="edit-profile-btn">
                  <FaCamera />
                </button>
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
          <Link to="/" onClick={() => localStorage.clear()}>
            <FaSignOutAlt />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="dashboard-content">{children}</main>
    </div>
  );
}

export default DashboardLayout;