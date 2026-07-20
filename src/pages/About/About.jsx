
import "./About.css";
import {
  FaUsers,
  FaLeaf,
  FaGem,
  FaHandshake,
  FaShoppingBag,
  FaStar,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="about-page">

      
      <section className="about-hero">
        <div className="hero-content">
          <p>About Us</p>
          <h1>FASHION OASIS</h1>
          <h3>Where Style Meets Elegance</h3>
          <span>
            We believe fashion is more than clothing — it's a way to express
            confidence, personality, and individuality.
          </span>

          <button>EXPLORE COLLECTION</button>
        </div>
      </section>


      
      <section className="story">
        <div className="story-image">
          <img
            src="https://images.unsplash.com/photo-1445205170230-053b83016050"
            alt="fashion store"
          />
        </div>

        <div className="story-content">
          <p>OUR STORY</p>
          <h2>A Passion for Fashion</h2>

          <span>
            Fashion Oasis was founded with a vision of bringing premium-quality
            fashion to everyone. We combine modern trends with timeless elegance
            to create collections that inspire confidence and comfort.
          </span>

          <br /><br />

          <span>
            From carefully selected fabrics to our customer-first approach,
            every detail is designed to make your shopping experience
            exceptional.
          </span>
        </div>
      </section>


      {/* Mission Vision */}
      <section className="mission">

        <h2>OUR MISSION & VISION</h2>

        <div className="mission-box">

          <div className="card">
            <div className="circle">
              <FaStar />
            </div>

            <div>
              <h3>Our Mission</h3>
              <p>
                To deliver high-quality, stylish fashion that empowers
                everyone to look and feel their best.
              </p>
            </div>
          </div>


          <div className="card">

            <div className="circle">
              <FaGem />
            </div>

            <div>
              <h3>Our Vision</h3>
              <p>
                To become one of the most trusted fashion destinations by
                offering exceptional quality and innovation.
              </p>
            </div>

          </div>

        </div>

      </section>



      {/* Values */}
      <section className="values">

        <h2>OUR VALUES</h2>

        <div className="value-container">

          <div className="value-card">
            <FaUsers />
            <h3>Customer First</h3>
            <p>
              Our customers are at the heart of everything we do.
            </p>
          </div>


          <div className="value-card">
            <FaLeaf />
            <h3>Sustainability</h3>
            <p>
              We are committed to ethical practices and a better planet.
            </p>
          </div>


          <div className="value-card">
            <FaGem />
            <h3>Quality Craftsmanship</h3>
            <p>
              Every piece is crafted with care and perfection.
            </p>
          </div>


          <div className="value-card">
            <FaHandshake />
            <h3>Trust & Transparency</h3>
            <p>
              We believe in honest practices and lasting trust.
            </p>
          </div>


        </div>

      </section>



      {/* Stats */}
      <section className="stats">

        <div>
          <FaUsers />
          <h2>10,000+</h2>
          <p>Happy Customers</p>
        </div>

        <div>
          <FaShoppingBag />
          <h2>500+</h2>
          <p>Fashion Products</p>
        </div>


        <div>
          <FaHandshake />
          <h2>50+</h2>
          <p>Brand Partners</p>
        </div>


        <div>
          <FaStar />
          <h2>4.9★</h2>
          <p>Customer Rating</p>
        </div>

      </section>



      {/* CTA */}
      <section className="cta">

        <div>
          <h1>Ready to Elevate Your Style?</h1>

          <p>
            Explore our latest collections and discover fashion that defines you.
          </p>

          <button>
            SHOP NOW
          </button>
        </div>

      </section>


    </div>
  );
};

export default About;