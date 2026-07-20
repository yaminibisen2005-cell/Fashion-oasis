
import "./About.css";
import heroImg from "../../assets/images/Aboutheroimage.jpg.jpg";  

const AboutHero = () => {
  return (
    <section className="about-hero">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Content */}
          <div className="col-lg-6">
            <span className="hero-tag">About Fashion Oasis</span>

            <h1 className="hero-title">
              Timeless Handmade
              <span> Jewellery</span>
            </h1>

            <p className="hero-text">
              Every piece is handcrafted with passion, elegance, and
              exceptional attention to detail. We create jewellery that
              celebrates your unique beauty and unforgettable moments.
            </p>

            
          </div>

          
          <div className="col-lg-6 text-center">
            <img
              src={heroImg}
              alt="Luxury Jewellery"
              className="hero-image img-fluid"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;