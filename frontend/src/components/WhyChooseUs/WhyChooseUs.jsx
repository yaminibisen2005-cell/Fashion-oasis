import "./WhyChooseUs.css";
import {
  FaGem,
  FaHandHoldingHeart,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaGem />,
    title: "Premium Quality",
    description:
      "Crafted with premium materials to ensure timeless elegance and lasting beauty.",
  },
  {
    icon: <FaHandHoldingHeart />,
    title: "Handmade With Love",
    description:
      "Every jewellery piece is handcrafted by skilled artisans with attention to every detail.",
  },
  {
    icon: <FaTruck />,
    title: "Free & Fast Shipping",
    description:
      "Quick, safe and reliable delivery across India with secure packaging.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Payments",
    description:
      "Shop confidently with 100% encrypted and secure payment methods.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="why-section">

      <div className="container">

        <div className="why-heading">

          <span>WHY CHOOSE US</span>

          <h2>Crafted For Every Special Moment</h2>

          <p>
            Discover jewellery that combines elegance, craftsmanship,
            and timeless beauty for every occasion.
          </p>

        </div>

        <div className="why-grid">

          {features.map((item, index) => (

            <div className="why-card" key={index}>

              <div className="why-icon">
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.description}</p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default WhyChooseUs;