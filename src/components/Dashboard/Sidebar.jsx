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
  return (
    <div className="sidebar"
    style={{backgroundImage: `url(${sidebarbg})`,}}>

      <div className="sidebar-logo">
        
        <h3>Fashion Oasis</h3>
      </div>

      <ul className="sidebar-menu">

        <li>
          <NavLink to="/dashboard">
            <FaTachometerAlt className="icon" />
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/profile">
            <FaUser className="icon" />
            Profile
          </NavLink>
        </li>

        <li>
          <NavLink to="/orders">
            <FaShoppingBag className="icon" />
            Orders
          </NavLink>
        </li>

        <li>
          <NavLink to="/wishlist">
            <FaHeart className="icon" />
            Wishlist
          </NavLink>
        </li>

        <li>
          <NavLink to="/reviews">
            <FaStar className="icon" />
            Reviews
          </NavLink>
        </li>

        <li>
          <NavLink to="/settings">
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