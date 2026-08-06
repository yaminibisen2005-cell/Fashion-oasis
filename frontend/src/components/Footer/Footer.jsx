import React, { useState, useEffect } from "react";
import "./Footer.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

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
  const [footerLogo, setFooterLogo] = useState(logo);
  const [storeName, setStoreName] = useState("Fashion Oasis");
  const [socials, setSocials] = useState({
    instagram: "https://www.instagram.com/fashionoasisstore/",
    facebook: "#",
    pinterest: "#",
    youtube: "#",
  });

  useEffect(() => {
    const saved = localStorage.getItem("storeSettings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.storeLogo) setFooterLogo(parsed.storeLogo);
        if (parsed.storeName) setStoreName(parsed.storeName);
        setSocials({
          instagram: parsed.socialInstagram || "https://www.instagram.com/fashionoasisstore/",
          facebook: parsed.socialFacebook || "#",
          pinterest: parsed.socialPinterest || "#",
          youtube: parsed.socialYoutube || "#",
        });
      } catch (e) {}
    }
  }, []);

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* ================= Brand Column ================= */}

        <div className="footer-brand">

          <img
            src={footerLogo}
            alt={storeName}
            className="footer-logo"
            style={{ maxHeight: '50px', objectFit: 'contain' }}
          />

          <p className="brand-description">
            Discover timeless handcrafted jewellery designed to celebrate
            life's beautiful moments with elegance, craftsmanship and love.
          </p>

          <div className="social-icons">

            <a href={socials.facebook} target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>

            <a href={socials.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>

            <a href={socials.pinterest} target="_blank" rel="noopener noreferrer"><FaPinterestP /></a>

            <a href={socials.youtube} target="_blank" rel="noopener noreferrer"><FaYoutube /></a>

          </div>

        </div>

        {/* ================= Quick Links Column ================= */}

        <div className="footer-column">

          <h3>Quick Links</h3>

          <ul>

            <li><Link to="/">Home</Link></li>

            <li><Link to="/about">About Us</Link></li>

            <li><Link to="/shop">Shop</Link></li>

            <li><Link to="/shop">Collections</Link></li>

            <li><Link to="/contact">Contact</Link></li>

            <li><Link to="/seller/dashboard">Seller Portal</Link></li>

          </ul>

        </div>

        {/* ================= Shop Column ================= */}

        <div className="footer-column">

          <h3>Shop</h3>

          <ul>

            <li><Link to="/shop?category=necklace">Necklaces</Link></li>

            <li><Link to="/shop?category=earrings">Earrings</Link></li>

            <li><Link to="/shop?category=bracelets">Bracelets</Link></li>

            <li><Link to="/shop?category=rings">Rings</Link></li>

            <li><Link to="/shop?category=gifts">Gift Collection</Link></li>

          </ul>

        </div>

        {/* ================= Contact Column ================= */}

        <div className="footer-column">

          <h3>Get In Touch</h3>

          <div className="contact-item">
            <FaMapMarkerAlt />
            <span>Newton Garden Apartment, Jagdeo Path, Patna, Bihar – 800014, India</span>
          </div>

          <div className="contact-item">
            <FaPhoneAlt />
            <span>+91 7739479666</span>
          </div>

          <div className="contact-item">
            <FaEnvelope />
            <span>fashionoasis082@gmail.com</span>
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

          <Link to="/terms-and-conditions">Terms & Conditions</Link>

          <Link to="/privacy-policy">Privacy Policy</Link>

          <Link to="/contact#faq-section">FAQs</Link>

        </div>

      </div>

    </footer>
  );
};

export default Footer;