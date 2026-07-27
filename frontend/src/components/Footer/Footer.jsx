import "./Footer.css";
import logo from "../../assets/logo.png";

import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* ================= Left Brand ================= */}

        <div className="footer-brand">

          <img
            src={logo}
            alt="Fashion Oasis"
            className="footer-logo"
          />

          <p className="brand-description">
            Discover timeless handcrafted jewellery designed to celebrate
            life's beautiful moments with elegance, craftsmanship and love.
          </p>

          <div className="social-icons">

            <a href="#"><FaFacebookF /></a>

            <a href="#"><FaInstagram /></a>

            <a href="#"><FaPinterestP /></a>

            <a href="#"><FaYoutube /></a>

          </div>

        </div>

        {/* ================= Right Section ================= */}

        <div className="footer-right">

          {/* Quick Links */}

          <div className="footer-column">

            <h3>Quick Links</h3>

            <ul>

              <li><a href="/">Home</a></li>

              <li><a href="/about">About Us</a></li>

              <li><a href="/shop">Shop</a></li>

              <li><a href="/collections">Collections</a></li>

              <li><a href="/contact">Contact</a></li>

            </ul>

          </div>

          {/* Shop */}

          <div className="footer-column">

            <h3>Shop</h3>

            <ul>

              <li><a href="#">Necklaces</a></li>

              <li><a href="#">Earrings</a></li>

              <li><a href="#">Bracelets</a></li>

              <li><a href="#">Rings</a></li>

              <li><a href="#">Gift Collection</a></li>

            </ul>

          </div>

          {/* Contact */}

          <div className="footer-column">

            <h3>Get In Touch</h3>

            <div className="contact-item">
              <FaMapMarkerAlt />
              <span>Nagpur, Maharashtra</span>
            </div>

            <div className="contact-item">
              <FaPhoneAlt />
              <span>+91 98765 43210</span>
            </div>

            <div className="contact-item">
              <FaEnvelope />
              <span>support@fashionoasis.com</span>
            </div>

          </div>

        </div>

      </div>

      <div className="footer-divider"></div>

      {/* Bottom */}

      <div className="footer-bottom">

        <p className="copyright">
          © 2026 Fashion Oasis. All Rights Reserved.
        </p>

        <p className="developed-by">
          Developed and Designed by <span>Athenura</span>
        </p>

        <div className="footer-bottom-links">

          <a href="#">Terms & Conditions</a>

          <a href="#">Privacy Policy</a>

          <a href="#">Return Policy</a>

          <a href="#">FAQs</a>

        </div>

      </div>

    </footer>
  );
};

export default Footer;