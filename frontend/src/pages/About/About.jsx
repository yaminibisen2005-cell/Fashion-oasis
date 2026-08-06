import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Newsletter from "../../components/Newsletter/Newsletter";
import Testimonials from "../../components/Testimonials/Testimonials";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";

import InstagramGallery from "../../components/InstagramGallery/InstagramGallery";

import aboutHero from "../../assets/about-banner.png";
import story from "../../assets/about-story.png";

import "./About.css";

const About = () => {
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

            <button>
              Explore Collection →
            </button>

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

              <div>❤️ Made With Love</div>

              <div>✨ Premium Quality</div>

              <div>� Ethical & Sustainable</div>

            </div>

          </div>

        </section>

        <div data-aos="fade-up">
    <WhyChooseUs />
</div>

        {/* Brand Promise */}

        <section className="brand-promise">

          <div className="promise-left" data-aos="zoom-in">

            <img src={story} alt="" />

          </div>

          <div className="promise-right" data-aos="fade-left">

            <span>OUR PROMISE</span>

            <h2>Beauty You Can Trust</h2>

            <ul>

              <li>
                <div className="promise-icon">✨</div>
                <div className="promise-content">
                  <h4>Genuine Materials</h4>
                  <p>Carefully selected premium-quality materials.</p>
                </div>
              </li>

              <li>
                <div className="promise-icon">💎</div>
                <div className="promise-content">
                  <h4>Skilled Craftsmanship</h4>
                  <p>Handcrafted by skilled artisans.</p>
                </div>
              </li>

              <li>
                <div className="promise-icon">🌸</div>
                <div className="promise-content">
                  <h4>Timeless Designs</h4>
                  <p>Elegant styles made to last.</p>
                </div>
              </li>

              <li>
                <div className="promise-icon">❤️</div>
                <div className="promise-content">
                  <h4>Customer Satisfaction</h4>
                  <p>Trusted by hundreds of happy customers.</p>
                </div>
              </li>

            </ul>

            <div className="promise-stats">

              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Happy Orders</div>
              </div>

              <div className="stat-item">
                <div className="stat-number">2024</div>
                <div className="stat-label">Established</div>
              </div>

              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Handcrafted</div>
              </div>

            </div>

          </div>

        </section>

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