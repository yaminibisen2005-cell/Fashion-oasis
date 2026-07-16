import "./Navbar.css";
import logo from "../../assets/logo.png";

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

  const [menuOpen, setMenuOpen] = useState(false);

  const [serviceOpen, setServiceOpen] = useState(false);

  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const [isHomePage, setIsHomePage] = useState(true);

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

        <div className="logo">
          <img src={logo} alt="Fashion Oasis" />
        </div>

        {/* Desktop Menu */}

        <ul className="desktop-menu">

          <li className="active">
            Home
          </li>

          <li>
            About
          </li>

          <li
            className="services-menu"
            onMouseEnter={() => setServiceOpen(true)}
            onMouseLeave={() => setServiceOpen(false)}
          >

            <span>
              Services
            </span>

            <FaChevronDown />

            <div
              className={`dropdown-menu ${
                serviceOpen ? "show" : ""
              }`}
            >

              {serviceCategories.map((item, index) => (

                <div
                  className="dropdown-item"
                  key={index}
                >
                  {item}
                </div>

              ))}

            </div>

          </li>

          <li>
            Contact
          </li>

        </ul>

        {/* Icons */}

        <div className="nav-icons">

          <div className="icon-wrapper">
            <FaSearch />
          </div>

          <div className="icon-wrapper">
            <FaRegHeart />
          </div>

          <div className="icon-wrapper">
            <FaShoppingBag />
          </div>

          <div className="icon-wrapper">
            <FaRegUser />
          </div>

        </div>

        {/* Mobile Toggle */}

        <div
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

      </div>

      {/* Overlay */}

      <div
        className={`mobile-menu-overlay ${
          menuOpen ? "active" : ""
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* Mobile Menu */}

      <div
        className={`mobile-menu ${
          menuOpen ? "active" : ""
        }`}
      >

        <ul className="mobile-menu-list">

          <li>Home</li>

          <li>About</li>

          <li
            onClick={() =>
              setMobileServiceOpen(!mobileServiceOpen)
            }
          >

            <span>
              Services
            </span>

            <FaChevronDown />

          </li>

          {mobileServiceOpen && (

            <ul className="mobile-dropdown">

              {serviceCategories.map((item, index) => (

                <li key={index}>
                  {item}
                </li>

              ))}

            </ul>

          )}

          <li>Contact</li>

        </ul>

        <div className="mobile-nav-icons">

          <div className="icon-wrapper">
            <FaSearch />
          </div>

          <div className="icon-wrapper">
            <FaRegHeart />
          </div>

          <div className="icon-wrapper">
            <FaShoppingBag />
          </div>

          <div className="icon-wrapper">
            <FaRegUser />
          </div>

        </div>

      </div>

    </nav>
  </header>
);

};

export default Navbar;