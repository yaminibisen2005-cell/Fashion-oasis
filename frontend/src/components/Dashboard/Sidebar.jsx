import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import sidebarbg from "../../assets/sidebarbg.png";
import {
  FaTachometerAlt,
  FaUser,
  FaShoppingBag,
  FaHeart,
  FaStar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.css";

function Sidebar() {
  const [storeName, setStoreName] = useState("Fashion Oasis");

  useEffect(() => {
    const saved = localStorage.getItem("storeSettings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.storeName) setStoreName(parsed.storeName);
      } catch (e) {}
    }
  }, []);

  return (
    <div className="sidebar"
    style={{backgroundImage: `url(${sidebarbg})`,}}>

      <div className="sidebar-logo">
        
        <h3>{storeName}</h3>
      </div>

      <ul className="sidebar-menu">

        <li>
          <NavLink to="/dashboard">
            <FaTachometerAlt className="icon" />
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/profile">
            <FaUser className="icon" />
            Profile
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/orders">
            <FaShoppingBag className="icon" />
            Orders
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/wishlist">
            <FaHeart className="icon" />
            Wishlist
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/reviews">
            <FaStar className="icon" />
            Reviews
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/settings">
            <FaCog className="icon" />
            Account Settings
          </NavLink>
        </li>

      </ul>

      <div className="logout">
        <NavLink to="/login">
          <FaSignOutAlt className="icon" />
          Logout
        </NavLink>
      </div>

    </div>
  );
}

export default Sidebar;
