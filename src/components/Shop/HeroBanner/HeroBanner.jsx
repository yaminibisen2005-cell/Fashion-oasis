import "./HeroBanner.css";
import { Link } from "react-router-dom";
import banner from "../../../assets/shop/hero-banner1.png"; // Replace with your banner

const HeroBanner = () => {
  return (
    <section className="shop-hero">
      <div className="hero-background">
        <img src={banner} alt="Jewellery Collection" />
        <div className="hero-overlay-shop"></div>
      </div>

      <div className="shop-hero-content">
        <div className="hero-left">

          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Shop</span>
          </div>

          <h1>Shop All Products</h1>

         <p>
  Discover timeless jewellery crafted with elegance,
  designed to celebrate every moment of your life.
</p>

        </div>
      </div>
    </section>
  );
};

export default HeroBanner;