import React, { useState, useEffect } from "react";
import "./SpecialOffer.css";
import offerImage from "../../assets/special-offer.jpg";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { fetchActiveOffers } from "../../api/admin";

function SpecialOffer() {
  const navigate = useNavigate();
  const [currentOffer, setCurrentOffer] = useState(null);

  useEffect(() => {
    const loadOffer = async () => {
      try {
        const res = await fetchActiveOffers();
        if (res.success && res.data && res.data.length > 0) {
          setCurrentOffer(res.data[0]); // Show latest active offer first
        }
      } catch (err) {
        console.warn("Could not load dynamic special offer:", err);
      }
    };
    loadOffer();
  }, []);

  const offerEndDate = currentOffer?.endDate
    ? new Date(currentOffer.endDate).getTime()
    : new Date("2026-12-31T23:59:59").getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const distance = offerEndDate - now;

    if (distance <= 0) {
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }

    return {
      days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0"),
      hours: String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0"),
      minutes: String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0"),
      seconds: String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, "0"),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [offerEndDate]);

  const discountText = currentOffer?.discount || "30% OFF";
  const displayTitle = currentOffer?.title || "Celebrate Every Beautiful Moment";
  const bgImage = currentOffer?.image || offerImage;

  return (
    <section className="special-offer">
      <div className="container">
        <div className="offer-banner">
          {/* Background Image */}
          <img src={bgImage} alt="Special Offer" className="offer-image" />

          {/* Left Content */}
          <div className="offer-content">
            <span className="offer-label">✨ SPECIAL OFFER</span>

            <h2>{displayTitle}</h2>

            <div className="discount-box">
              <p>{currentOffer?.description ? currentOffer.description.toUpperCase() : "FLAT"}</p>
              <h1>{discountText}</h1>
            </div>

            <p className="offer-short-desc">
              Discover handcrafted jewellery at exclusive limited-time prices.
            </p>

            <button className="shop-btn" onClick={() => navigate("/shop")}>
              SHOP NOW <FaArrowRight />
            </button>
          </div>

          {/* Right Discount Badge */}
          <div className="offer-badge">
            <span>LIMITED</span>
            <h2>{discountText.replace(/[^0-9%]/g, '') || "30%"}</h2>
            <p>OFF</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpecialOffer;