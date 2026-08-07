import "./Navbar.css";
import logo from "../../assets/logo.png";

import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

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

const serviceCategories = [
  { name: "All Products", path: "/shop" },
  { name: "Necklace", category: "necklace" },
  { name: "Earrings", category: "earrings" },
  { name: "Rings", category: "rings" },
  { name: "Bracelets", category: "bracelets" },
  { name: "Mangalsutra", category: "mangalsutra" },
  { name: "Wedding", category: "wedding" },
];

const Navbar = () => {
  const location = useLocation();
  const { wishlist, cart } = useContext(ShopContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);

  const [navLogo, setNavLogo] = useState(logo);
  const [storeName, setStoreName] = useState("Fashion Oasis");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

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

    const checkAuth = () => {
      const customerEmail = localStorage.getItem("customerEmail");
      setIsAuthenticated(!!customerEmail);
    };

    // Load store settings
    const saved = localStorage.getItem("storeSettings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.storeLogo) setNavLogo(parsed.storeLogo);
        if (parsed.storeName) setStoreName(parsed.storeName);
      } catch (e) {}
    }

    handleScroll();
    checkHomePage();
    checkAuth();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("popstate", checkHomePage);
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", checkHomePage);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return (
    <header className="navbar-wrapper">
      <nav
        className={`fo-navbar ${scrolled ? "scrolled" : ""} ${
          !isHomePage ? "solid" : ""
        }`}
      >
        <div className="container nav-container">

          {/* ==========================
                Logo Only (Text Removed)
          =========================== */}
          <Link
            to="/"
            className="logo"
            aria-label={storeName}
          >
            <img
              src={navLogo}
              alt={storeName}
              className="nav-logo-img"
            />
          </Link>

          {/* ==========================
                Desktop Menu
          =========================== */}
          <ul className="desktop-menu">
            <li>
              <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
            </li>

            <li>
              <Link to="/shop" className={location.pathname === "/shop" ? "active" : ""}>
                Shop
              </Link>
            </li>

            <li
              className="services-menu"
              onMouseEnter={() => setServiceOpen(true)}
              onMouseLeave={() => setServiceOpen(false)}
            >
              <span>Collections</span>
              <FaChevronDown />

              <div
                className={`fo-dropdown-menu ${
                  serviceOpen ? "show" : ""
                }`}
              >
                {serviceCategories.map((item, index) => {
                  const to = item.path 
                    ? item.path 
                    : item.category 
                      ? `/shop?category=${item.category}` 
                      : item.filter 
                        ? `/shop?filter=${item.filter}` 
                        : '/shop';
                  return (
                    <Link
                      key={index}
                      className="fo-dropdown-item"
                      to={to}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </li>

            <li>
              <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>
                About Us
              </Link>
            </li>

            <li>
              <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>
                Contact
              </Link>
            </li>
          </ul>

          {/* ==========================
                Desktop Icons
          =========================== */}
          <div className="nav-icons">
            {!isAuthenticated ? (
              <Link to="/login" className="login-btn">
                Login
              </Link>
            ) : (
              <>
                <Link
                  to="/shop"
                  className="icon-wrapper"
                  aria-label="Search"
                >
                  <FaSearch />
                </Link>

                <Link
                  to="/wishlist"
                  className="icon-wrapper"
                  aria-label="Wishlist"
                >
                  <FaRegHeart />
                  {wishlist.length > 0 && (
                    <span className="nav-badge">
                      {wishlist.length}
                    </span>
                  )}
                </Link>

                <Link
                  to="/cart"
                  className="icon-wrapper"
                  aria-label="Cart"
                >
                  <FaShoppingBag />
                  {cartCount > 0 && (
                    <span className="nav-badge">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/dashboard"
                  className="icon-wrapper"
                  aria-label="Account Dashboard"
                >
                  <FaRegUser />
                </Link>
              </>
            )}
          </div>

          {/* ==========================
                Mobile Toggle
          =========================== */}
          <div
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>

        </div>

        {/* ==========================
              Mobile Overlay
        =========================== */}
        <div
          className={`mobile-menu-overlay ${
            menuOpen ? "active" : ""
          }`}
          onClick={() => setMenuOpen(false)}
        ></div>

        {/* ==========================
              Mobile Menu Drawer
        =========================== */}
        <div
          className={`mobile-menu ${
            menuOpen ? "active" : ""
          }`}
        >
          <ul className="mobile-menu-list">
            <li>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/shop"
                onClick={() => setMenuOpen(false)}
              >
                Shop
              </Link>
            </li>

            <li
              className="mobile-services"
              onClick={() =>
                setMobileServiceOpen(!mobileServiceOpen)
              }
            >
              <span>Collections</span>
              <FaChevronDown
                className={
                  mobileServiceOpen ? "rotate" : ""
                }
              />
            </li>

            {mobileServiceOpen && (
              <ul className="mobile-dropdown">
                {serviceCategories.map((item, index) => {
                  const to = item.path 
                    ? item.path 
                    : item.category 
                      ? `/shop?category=${item.category}` 
                      : item.filter 
                        ? `/shop?filter=${item.filter}` 
                        : '/shop';
                  return (
                    <li key={index}>
                      <Link
                        to={to}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}

            <li>
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* ==========================
                Mobile Icons
          =========================== */}
          <div className="mobile-nav-icons">
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="login-btn"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            ) : (
              <>
                <Link
                  to="/shop"
                  className="icon-wrapper"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaSearch />
                </Link>

                <Link
                  to="/wishlist"
                  className="icon-wrapper"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaRegHeart />
                  {wishlist.length > 0 && (
                    <span className="nav-badge">
                      {wishlist.length}
                    </span>
                  )}
                </Link>

                <Link
                  to="/cart"
                  className="icon-wrapper"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaShoppingBag />
                  {cartCount > 0 && (
                    <span className="nav-badge">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/dashboard"
                  className="icon-wrapper"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaRegUser />
                </Link>
              </>
            )}
          </div>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;