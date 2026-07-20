import { Link } from "react-router-dom";
import "./SpecialOffer.css";
import specialofferbanner from "../../assets/images/specialofferbanner.jpg";

function SpecialOffer() {
  return (
    <section className="special-offer">
      <div className="container">

        <div
          className="offer-banner"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), url(${specialofferbanner})`
          }}
        >

          <div className="offer-content">

            <p className="offer-subtitle">
              SPECIAL OFFER
            </p>

            <h1>
              FLAT <span>20%</span> OFF
            </h1>

            <p className="offer-text">
              On your first order
            </p>

            <div className="divider">
              <span>❤</span>
            </div>

            <h2>
              Use Code:
              <span className="coupon"> WELCOME20</span>
            </h2>

            <Link to="/ShopNow" className="offer-btn">
              SHOP NOW →
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}

export default SpecialOffer;