import "./Newsletter.css";
import { FaPaperPlane } from "react-icons/fa";

const Newsletter = () => {
  return (
    <section className="newsletter">

      <div className="container">

        <div className="newsletter-card">

          <div className="newsletter-content">

            <span>NEWSLETTER</span>

            <h2>Stay Inspired With Fashion Oasis</h2>

            <p>
              Subscribe to receive exclusive jewellery launches,
              special discounts, styling inspiration and premium offers.
            </p>

          </div>

          <form className="newsletter-form">

            <input
              type="email"
              placeholder="Enter your email address"
            />

            <button type="submit">
              Subscribe
              <FaPaperPlane />
            </button>

          </form>

        </div>

      </div>

    </section>
  );
};

export default Newsletter;