import "./Navbar.css";
import logo from "../../assets/logo.png";

import { Link } from "react-router-dom";
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

  const { wishlist, cart } = useContext(ShopContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const [serviceOpen, setServiceOpen] = useState(false);

  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const [isHomePage, setIsHomePage] = useState(true);

  const [navLogo, setNavLogo] = useState(logo);
  const [storeName, setStoreName] = useState("FASHION OASIS");
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

          {/* Logo */}
          <Link
            to="/"
            className="logo"
          >
            <img
              src={navLogo}
              alt={storeName}
              style={{ maxHeight: '50px', objectFit: 'contain' }}
            />

            <div className="brand-text">

              <h1>{storeName.toUpperCase()}</h1>

              <p>PREMIUM JEWELLERY</p>

            </div>

          </Link>
                    {/* ==========================
                Desktop Menu
          =========================== */}

          <ul className="desktop-menu">

            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/shop">
                Shop
              </Link>
            </li>

            <li
              className="services-menu"
              onMouseEnter={() => setServiceOpen(true)}
              onMouseLeave={() => setServiceOpen(false)}
            >

              <span>
                Collections
              </span>

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
              <Link to="/about">
                About Us
              </Link>
            </li>

            <li>
              <Link to="/contact">
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
                  to="/search"
                  className="icon-wrapper"
                >
                  <FaSearch />
                </Link>

                <Link
                  to="/wishlist"
                  className="icon-wrapper"
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
          >

            {menuOpen ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}

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
              Mobile Menu
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
                to="/collections"
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
                  to="/search"
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