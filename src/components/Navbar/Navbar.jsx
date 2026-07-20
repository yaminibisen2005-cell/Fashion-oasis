import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

import {
  FaSearch,
  FaRegUser,
  FaRegHeart,
  FaShoppingBag,
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useState, useEffect } from "react";

const serviceCategories = [
  "Necklace",
  "Earrings",
  "Rings",
  "Bracelets",
  "Jewellery Sets",
  "Personalized Gifts",
  "Couple Gifts",
  "Best Sellers",
  "New Arrivals",
  "View All Products",
];

const Navbar = () => {
  const { wishlist, cart } = useContext(ShopContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const checkHomePage = () => {
      setIsHomePage(
        window.location.pathname === "/" ||
        window.location.pathname === "/home"
      );
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("popstate", checkHomePage);
    
    handleScroll();
    checkHomePage();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", checkHomePage);
    };
  }, []);

  return (
    <header className="navbar-wrapper">
      <nav
        className={`navbar ${scrolled ? "scrolled" : ""} ${
          !isHomePage ? "solid" : ""
        }`}
      >
        <div className="container nav-container">
          {/* Logo */}
          <Link to="/" className="logo" style={{ textDecoration: "none" }}>
            <img src={logo} alt="Fashion Oasis" />
            <div className="brand-text">
              <h1>FASHION OASIS</h1>
              <p>PREMIUM JEWELLERY</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className="desktop-menu">
            <li>
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
            </li>
            <li>
              <Link to="/collections" style={{ color: "inherit", textDecoration: "none" }}>Shop</Link>
            </li>
            <li
              className="services-menu"
              onMouseEnter={() => setServiceOpen(true)}
              onMouseLeave={() => setServiceOpen(false)}
            >
              <span>Collections</span>
              <FaChevronDown />
              <div className={`dropdown-menu ${serviceOpen ? "show" : ""}`}>
                {serviceCategories.map((item, index) => (
                  <Link
                    to={`/collections?category=${item.toLowerCase()}`}
                    className="dropdown-item"
                    key={index}
                    style={{ textDecoration: "none" }}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </li>
            <li>
              <Link to="/collections" style={{ color: "inherit", textDecoration: "none" }}>About Us</Link>
            </li>
          </ul>

          {/* Icons */}
          <div className="nav-icons">
            <Link to="/collections" className="icon-wrapper">
              <FaSearch />
            </Link>
            <Link to="/wishlist" className="icon-wrapper">
              <FaRegHeart />
              {wishlist.length > 0 && (
                <span className="nav-badge">{wishlist.length}</span>
              )}
            </Link>
            <Link to="/cart" className="icon-wrapper">
              <FaShoppingBag />
              {cartCount > 0 && (
                <span className="nav-badge">{cartCount}</span>
              )}
            </Link>
            <Link to="/checkout" className="icon-wrapper">
              <FaRegUser />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        {/* Overlay */}
        <div
          className={`mobile-menu-overlay ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(false)}
        ></div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
          <ul className="mobile-menu-list">
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)} style={{ color: "inherit", textDecoration: "none" }}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/collections" onClick={() => setMenuOpen(false)} style={{ color: "inherit", textDecoration: "none" }}>
                Shop
              </Link>
            </li>
            <li onClick={() => setMobileServiceOpen(!mobileServiceOpen)}>
              <span>Collections</span>
              <FaChevronDown />
            </li>
            {mobileServiceOpen && (
              <ul className="mobile-dropdown">
                {serviceCategories.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={`/collections?category=${item.toLowerCase()}`}
                      onClick={() => setMenuOpen(false)}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <li>
              <Link to="/collections" onClick={() => setMenuOpen(false)} style={{ color: "inherit", textDecoration: "none" }}>
                About Us
              </Link>
            </li>
          </ul>

          <div className="mobile-nav-icons">
            <Link to="/collections" className="icon-wrapper" onClick={() => setMenuOpen(false)}>
              <FaSearch />
            </Link>
            <Link to="/wishlist" className="icon-wrapper" onClick={() => setMenuOpen(false)}>
              <FaRegHeart />
              {wishlist.length > 0 && (
                <span className="nav-badge">{wishlist.length}</span>
              )}
            </Link>
            <Link to="/cart" className="icon-wrapper" onClick={() => setMenuOpen(false)}>
              <FaShoppingBag />
              {cartCount > 0 && (
                <span className="nav-badge">{cartCount}</span>
              )}
            </Link>
            <Link to="/checkout" className="icon-wrapper" onClick={() => setMenuOpen(false)}>
              <FaRegUser />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;