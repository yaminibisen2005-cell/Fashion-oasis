import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Newsletter from "../../components/Newsletter/Newsletter";
import Testimonials from "../../components/Testimonials/Testimonials";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import InstagramGallery from "../../components/InstagramGallery/InstagramGallery";

import { GiDiamondRing, GiHeartNecklace } from "react-icons/gi";
import { BsShieldCheck } from "react-icons/bs";
import { PiFlowerLotus } from "react-icons/pi";
import { MdVerified } from "react-icons/md";
import { LuSparkles } from "react-icons/lu";

import aboutHero from "../../assets/about-banner.png";
import story from "../../assets/about-story.png";

import { useNavigate } from "react-router-dom";

import "./About.css";

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <section className="about">

        {/* HERO */}

        <section className="about-hero">

          <img src={aboutHero} alt="" />

          <div className="about-overlay" data-aos="fade-right">

            

            <h1>
              Timeless Jewellery
              <br />
              Crafted With Love
            </h1>

            <p>
              Discover handcrafted jewellery designed with elegance,
              passion and exceptional craftsmanship for every special
              occasion.
            </p>

            <button className="about-explore-btn btn-primary" onClick={() => navigate("/shop")}>
              Explore Collection →
            </button>

          </div>

        </section>

        {/* TOP 5 LUXURY HIGHLIGHTS */}
        <section className="about-highlights-section" data-aos="fade-up">
          <div className="highlights-container">
            <div className="highlight-card">
              <div className="highlight-icon-wrapper">
                <GiDiamondRing className="highlight-icon" />
              </div>
              <div className="highlight-text">
                <h4>Premium Collection</h4>
                <p>Exclusive Fine Jewellery</p>
              </div>
            </div>

            <div className="highlight-card">
              <div className="highlight-icon-wrapper">
                <MdVerified className="highlight-icon" />
              </div>
              <div className="highlight-text">
                <h4>Certified Quality</h4>
                <p>100% Verified Standards</p>
              </div>
            </div>

            <div className="highlight-card">
              <div className="highlight-icon-wrapper">
                <LuSparkles className="highlight-icon" />
              </div>
              <div className="highlight-text">
                <h4>Elegant Designs</h4>
                <p>Timeless & Modern Styles</p>
              </div>
            </div>

            <div className="highlight-card">
              <div className="highlight-icon-wrapper">
                <BsShieldCheck className="highlight-icon" />
              </div>
              <div className="highlight-text">
                <h4>Trusted Craftsmanship</h4>
                <p>Master Artisan Finished</p>
              </div>
            </div>

            <div className="highlight-card">
              <div className="highlight-icon-wrapper">
                <GiHeartNecklace className="highlight-icon" />
              </div>
              <div className="highlight-text">
                <h4>Crafted With Love</h4>
                <p>Thoughtfully Handcrafted</p>
              </div>
            </div>
          </div>
        </section>

        {/* STORY */}

        <section className="about-story">

          <div className="story-image" data-aos="fade-right">

            <img src={story} alt="" />

          </div>

          <div className="story-content" data-aos="fade-left">

            <span>OUR STORY</span>

            <h2>
              Where Passion
              <br />
              Meets Perfection
            </h2>

            <p>
              Established in 2024, Fashion Oasis is a handmade gifting and artificial jewellery brand dedicated to creating unique and thoughtfully crafted products for every special occasion. Since its inception, the brand has successfully delivered 500+ orders, earning the trust of customers through quality craftsmanship, creative designs, and attention to detail. With a growing collection of fashion accessories, bouquets, and artificial jewellery, Fashion Oasis continues to make every celebration more memorable.
            </p>

            <div className="story-list">
              <div className="luxury-feature-card">
                <div className="feature-icon-wrapper">
                  <GiDiamondRing className="feature-icon" />
                </div>
                <div className="feature-card-content">
                  <h3>Handcrafted with Care</h3>
                  <p>Every jewellery piece is thoughtfully handcrafted with attention to detail.</p>
                </div>
              </div>

              <div className="luxury-feature-card">
                <div className="feature-icon-wrapper">
                  <BsShieldCheck className="feature-icon" />
                </div>
                <div className="feature-card-content">
                  <h3>Premium Quality Assured</h3>
                  <p>Made from carefully selected materials with exceptional craftsmanship.</p>
                </div>
              </div>

              <div className="luxury-feature-card">
                <div className="feature-icon-wrapper">
                  <PiFlowerLotus className="feature-icon" />
                </div>
                <div className="feature-card-content">
                  <h3>Ethically Crafted</h3>
                  <p>Responsibly created using sustainable and ethical production practices.</p>
                </div>
              </div>
            </div>

          </div>

        </section>

        <div data-aos="fade-up">
          <WhyChooseUs />
        </div>

        <div data-aos="fade-up">
          <InstagramGallery />
        </div>

        <div data-aos="fade-up">
    <Testimonials />
</div>

      </section>

 
    <Newsletter />


      <Footer />

    </>
  );
};

export default About;