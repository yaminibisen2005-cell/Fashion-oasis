import React, { useState } from "react";
import "./Newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setMessage("Thank you for subscribing!");
      setEmail(""); // Clear the input field
    } else {
      setMessage("Please enter a valid email.");
    }
  };

  return (
    <div className="newsletter-container">
      <h2 className="newsletter-heading">Subscribe to our Newsletter</h2>
      <p className="newsletter-paragraph">
        Stay updated with our latest news and exclusive offers!
      </p>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="newsletter-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="newsletter-button">
          Subscribe
        </button>
      </form>
      {message && <p className="newsletter-message">{message}</p>}
    </div>
  );
};

export default Newsletter;