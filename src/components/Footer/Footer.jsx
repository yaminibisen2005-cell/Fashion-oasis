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

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Logo */}

        <div className="footer-col">

          <img src={logo} alt="Fashion Oasis" className="footer-logo" />

          <p>
            Handmade jewellery and gifts crafted with love to make every
            moment memorable.
          </p>

          <div className="social-icons">

            <a href="#"><FaFacebookF /></a>

            <a href="#"><FaInstagram /></a>

            <a href="#"><FaPinterestP /></a>

            <a href="#"><FaYoutube /></a>

          </div>

        </div>

        {/* Shop */}

        <div className="footer-col">

          <h3>Shop</h3>

          <ul>

            <li><a href="#">Necklaces</a></li>

            <li><a href="#">Earrings</a></li>

            <li><a href="#">Bracelets</a></li>

            <li><a href="#">Rings</a></li>

            <li><a href="#">Gift Collection</a></li>

          </ul>

        </div>

        {/* Customer */}

        <div className="footer-col">

          <h3>Customer Care</h3>

          <ul>

            <li><a href="#">Contact Us</a></li>

            <li><a href="#">FAQs</a></li>

            <li><a href="#">Shipping</a></li>

            <li><a href="#">Returns</a></li>

            <li><a href="#">Track Order</a></li>

          </ul>

        </div>

        {/* Contact */}

        <div className="footer-col">

          <h3>Contact</h3>

          <p><FaMapMarkerAlt /> Nagpur, Maharashtra</p>

          <p><FaPhoneAlt /> +91 98765 43210</p>

          <p><FaEnvelope /> support@fashionoasis.com</p>

        </div>

      </div>

      <hr />

      <div className="footer-bottom">

        <p>© 2026 Fashion Oasis. All Rights Reserved.</p>

        <div className="footer-links">

          <a href="#">Privacy Policy</a>

          <a href="#">Terms & Conditions</a>

        </div>

      </div>

    </footer>
  );
}