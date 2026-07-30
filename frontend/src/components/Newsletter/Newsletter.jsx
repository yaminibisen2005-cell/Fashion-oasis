import React from "react";
import "./Newsletter.css";
import { HiOutlineMail } from "react-icons/hi";

import banner from "../../assets/newsletter-bg.png";

const Newsletter = () => {
  return (
    <section className="newsletter">

      <img
        src={banner}
        alt="Newsletter Banner"
        className="newsletter-bg"
      />

      <div className="newsletter-overlay">

        <span className="newsletter-tag">
          BE THE FIRST TO KNOW
        </span>

        <h2>
          Stay Connected
          <br />
          <span>With Fashion Oasis</span>
        </h2>

        <p>
          Subscribe to receive exclusive jewellery launches,
          special offers and timeless style inspiration
          directly to your inbox.
        </p>

        <div className="newsletter-form">

          <div className="newsletter-input">

            <HiOutlineMail className="mail-icon" />

            <input
              type="email"
              placeholder="Enter your email address"
            />

          </div>

          <button>
            Subscribe
          </button>

        </div>

      </div>

    </section>
  );
};

export default Newsletter;