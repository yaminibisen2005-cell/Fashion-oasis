import "./WhyChooseUs.css";
import {
  FaHandHoldingHeart,
  FaLeaf,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: <FaHandHoldingHeart />,
    title: "Handcrafted",
    description: "Beautifully crafted by skilled artisans with attention to every detail.",
  },
  {
    id: 2,
    icon: <FaLeaf />,
    title: "Eco Friendly",
    description: "Made with sustainable materials that care for the planet.",
  },
  {
    id: 3,
    icon: <FaTruck />,
    title: "Fast Shipping",
    description: "Quick delivery with secure packaging across the country.",
  },
  {
    id: 4,
    icon: <FaShieldAlt />,
    title: "Secure Payments",
    description: "Safe checkout with trusted and encrypted payment methods.",
  },
];

function WhyChooseUs() {
  return (
    <section className="why-section">
      <div className="container">
        <div className="section-heading">
          <span className="tag">WHY CHOOSE US</span>

          <h2>
            Crafted with <span>Passion</span>, Delivered with Care
          </h2>

          <p>
            We believe shopping should be simple, beautiful, and reliable.
            Experience premium handcrafted products with exceptional service.
          </p>
        </div>

        <div className="row g-4">
          {features.map((feature) => (
            <div className="col-lg-3 col-md-6" key={feature.id}>
              <div className="feature-card">
                <div className="icon-box">
                  {feature.icon}
                </div>

                <h4>{feature.title}</h4>

                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;