import React from "react";
import "./Footer.css";
import logo from "../../assets/logo.png";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-top">

          {/* Logo */}

          <div className="footer-column">
            <img src={logo} alt="Fashion Oasis" className="footer-logo" />

            <p className="footer-description">
              Handmade jewellery and gifts crafted with love to make every
              moment memorable.
            </p>

            <div className="social-icons">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
            </div>

          </div>

          {/* Quick Links */}

          <div className="footer-column">

            <h3 className="footer-heading">
              Quick Links
            </h3>

            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Jewellery</a></li>
              <li><a href="#">Accessories</a></li>
              <li><a href="#">Gift Items</a></li>
            </ul>

          </div>

          {/* Customer */}

          <div className="footer-column">

            <h3 className="footer-heading">
              Customer Care
            </h3>

            <ul className="footer-links">
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>

          </div>

          {/* Newsletter */}

          <div className="footer-column">

            <h3 className="footer-heading">
              Stay Connected
            </h3>

            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
            />

            <button className="newsletter-button">
              Subscribe
            </button>

          </div>

        </div>

        <div className="footer-bottom">
          © 2026 Fashion Oasis. All Rights Reserved.
        </div>

      </div>

    </footer>
  );
};

export default Footer;