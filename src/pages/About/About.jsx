import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Newsletter from "../../Components/Newsletter/Newsletter";
import Testimonials from "../../Components/Testimonials/Testimonials";
import WhyChooseUs from "../../Components/WhyChooseUs/WhyChooseUs";

import InstagramGallery from "../../Components/InstagramGallery/InstagramGallery";

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

              Fashion Oasis was born from a love for timeless beauty
              and fine craftsmanship. Every jewellery piece is
              thoughtfully handcrafted to celebrate life's precious
              moments.

            </p>

            <div className="story-list">

              <div>❤ Made With Love</div>

              <div>💎 Premium Quality</div>

              <div>🌿 Ethical & Sustainable</div>

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

              <li>✔ Genuine Materials</li>

              <li>✔ Skilled Craftsmanship</li>

              <li>✔ Timeless Designs</li>

              <li>✔ Customer Satisfaction</li>

            </ul>

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