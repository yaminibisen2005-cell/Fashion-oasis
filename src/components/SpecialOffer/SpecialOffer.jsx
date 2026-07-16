import "./SpecialOffer.css";
import offerImage from "../../assets/special-offer.jpg";

import {
  FaArrowRight,
  FaGem,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";

function SpecialOffer() {
  return (
    <section className="special-offer">

      <div className="container">

        <div className="offer-banner">

          {/* Background Image */}

          <img
            src={offerImage}
            alt="Special Offer"
            className="offer-bg"
          />

          {/* Left Content */}

          <div className="offer-overlay">

            <span className="offer-tag">
              LIMITED TIME OFFER
            </span>

            <h2>
              Celebrate Every
              <br />
              Beautiful Moment
            </h2>

            <h3>
              Flat <span>30% OFF</span>
            </h3>

            <p>
              Discover handcrafted jewellery designed with elegance,
              luxury and timeless beauty. Make every occasion
              unforgettable with Fashion Oasis.
            </p>

            <button className="offer-btn">

              Shop Collection

              <FaArrowRight />

            </button>

            <div className="offer-features">

              <div className="feature-item">

                <FaGem />

                <span>Premium Quality</span>

              </div>

              <div className="feature-item">

                <FaTruck />

                <span>Fast Delivery</span>

              </div>

              <div className="feature-item">

                <FaShieldAlt />

                <span>Secure Payment</span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default SpecialOffer;