import "./SpecialOffer.css";
import offerImage from "../../assets/special-offer.jpg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaArrowRight, FaClock } from "react-icons/fa";

function SpecialOffer() {

    const navigate = useNavigate();
  const offerEndDate = new Date("2026-12-31T23:59:59").getTime();

const calculateTimeLeft = () => {
  const now = new Date().getTime();
  const distance = offerEndDate - now;

  if (distance <= 0) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  }

  return {
    days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0"),
    hours: String(
      Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    ).padStart(2, "0"),
    minutes: String(
      Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    ).padStart(2, "0"),
    seconds: String(
      Math.floor((distance % (1000 * 60)) / 1000)
    ).padStart(2, "0"),
  };
};

const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft(calculateTimeLeft());
  }, 1000);

  return () => clearInterval(timer);
}, []);
  return (
    <section className="special-offer">
      <div className="container">

        <div className="offer-banner">

          {/* Background Image */}
          <img
            src={offerImage}
            alt="Special Offer"
            className="offer-image"
          />

          {/* Left Content */}
          <div className="offer-content">

            {/* Special Offer Label */}
            <span className="offer-label">
              ✨ SPECIAL OFFER
            </span>

            {/* Heading */}
            <h2>
              Celebrate Every
              <br />
              <span>Beautiful</span>
              <br />
              Moment
            </h2>

            {/* Discount */}
            <div className="discount-box">
              <p>FLAT</p>
              <h1>30% OFF</h1>
            </div>

            {/* Shop Button */}
           <button
  className="shop-btn"
  onClick={() => navigate("/shop")}
>
  SHOP NOW
  <FaArrowRight />
</button>

          </div>

          {/* Right Discount Badge */}
          <div className="offer-badge">
            <span>LIMITED</span>
            <h2>30%</h2>
            <p>OFF</p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default SpecialOffer;