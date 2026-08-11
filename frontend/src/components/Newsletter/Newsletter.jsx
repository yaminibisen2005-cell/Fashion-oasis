import React, { useState } from "react";
import "./Newsletter.css";
import { HiOutlineMail } from "react-icons/hi";
import apiClient from "../../api/client";
import banner from "../../assets/newsletter-bg.jpg";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setIsError(true);
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const response = await apiClient.post("/newsletter/subscribe", { email });
      if (response.data?.success) {
        setIsError(false);
        setMessage("Subscribed Successfully");
        setEmail("");
      } else {
        throw new Error(response.data?.message || "Subscription failed.");
      }
    } catch (err) {
      setIsError(true);
      setMessage(err.response?.data?.message || err.message || "Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter">
      <img
        src={banner}
        alt="Fashion Oasis Newsletter"
        className="newsletter-bg"
      />

      <div className="newsletter-overlay">
        <span className="newsletter-tag">
          ✨ NEWSLETTER
        </span>

        <h2>
          Stay Connected
          <br />
          <span>With Fashion Oasis</span>
        </h2>

        <p>
          Get exclusive offers, handcrafted jewellery updates, and new arrivals directly in your inbox.
        </p>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <div className="newsletter-input">
            <HiOutlineMail className="mail-icon" />
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {message && (
          <div
            className={`newsletter-message ${isError ? "error" : "success"}`}
            style={{
              marginTop: "15px",
              color: isError ? "#ff4d4f" : "#52c41a",
              fontWeight: 600,
              fontSize: "15px",
              textAlign: "center"
            }}
          >
            {message}
          </div>
        )}
      </div>
    </section>
  );
};

export default Newsletter;