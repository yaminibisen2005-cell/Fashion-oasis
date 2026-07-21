import "./Categories.css";
import { Link, useNavigate } from "react-router-dom";

import earrings from "../../assets/earings.png";
import necklaces from "../../assets/necklaces.png";
import bracelets from "../../assets/bracelets.png";
import accessories from "../../assets/accessories.png";
import gifts from "../../assets/gifts.png";
import personalized from "../../assets/personalized.png";

import { FaArrowRight } from "react-icons/fa";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <section className="categories">
      <div className="category-container">

        {/* Heading */}
        <div className="category-heading">
          <span>OUR COLLECTION</span>

          <h2>Shop By Category</h2>

          <p>
            Discover handcrafted jewellery collections designed with elegance,
            beauty and timeless craftsmanship.
          </p>

          <div className="heading-divider">✦</div>
        </div>

        {/* Grid */}
        <div className="category-grid">

          {/* Left Big Card */}
          <div className="large-card">
            <img src={earrings} alt="Earrings" />

            <div className="overlay">
              <span>01</span>

              <h3>Earrings</h3>

              <p>
                Elegant handmade earrings
                <br />
                for every occasion.
              </p>

              <button onClick={() => navigate("/shop")}>
                Explore Collection
                <FaArrowRight />
              </button>
            </div>
          </div>

          {/* Right Grid */}
          <div className="right-grid">

            <div className="small-card">
              <img src={necklaces} alt="Necklaces" />

              <div className="overlay">
                <span>02</span>

                <h4>Necklaces</h4>

                <Link to="/shop">Shop Now →</Link>
              </div>
            </div>

            <div className="small-card">
              <img src={bracelets} alt="Bracelets" />

              <div className="overlay">
                <span>03</span>

                <h4>Bracelets</h4>

                <Link to="/shop">Shop Now →</Link>
              </div>
            </div>

            <div className="small-card">
              <img src={accessories} alt="Accessories" />

              <div className="overlay">
                <span>04</span>

                <h4>Accessories</h4>

                <Link to="/shop">Shop Now →</Link>
              </div>
            </div>

            <div className="small-card">
              <img src={gifts} alt="Gift Items" />

              <div className="overlay">
                <span>05</span>

                <h4>Gift Items</h4>

                <Link to="/shop">Shop Now →</Link>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Banner */}
        <div className="personalized-card">

          <div className="banner-left">
            <span>06</span>

            <h2>Personalized Jewellery</h2>

            <p>
              Custom crafted jewellery made
              <br />
              especially for your loved ones.
            </p>

            <button onClick={() => navigate("/shop")}>
              View Collection
              <FaArrowRight />
            </button>
          </div>

          <div className="banner-right">
            <img
              src={personalized}
              alt="Personalized Jewellery"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default Categories;