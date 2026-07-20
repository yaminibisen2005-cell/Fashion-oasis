
import "./Testimonial.css";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Verified Buyer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "Absolutely in love with the earrings! The quality is amazing and the design is so unique.",
  },
  {
    id: 2,
    name: "Neha Verma",
    role: "Verified Buyer",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    review:
      "Beautiful packaging and fast delivery. Highly recommended! Will shop again.",
  },
  {
    id: 3,
    name: "Ananya Singh",
    role: "Verified Buyer",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    review:
      "The bracelet I ordered is stunning! You can feel the love in every detail.",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonial-section py-5">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="testimonial-title">
            What Our Customers Say
          </h2>

          <p className="testimonial-subtitle">
            Your happiness is our greatest motivation.
          </p>
        </div>

       
        <div className="row g-4">

          {testimonials.map((item) => (
            <div className="col-lg-4 col-md-6" key={item.id}>

              <div className="testimonial-card">

                <div className="quote-icon">
                  <FaQuoteLeft />
                </div>

                <div className="stars">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>

                <p className="review-text">
                  {item.review}
                </p>

                <hr />

                <div className="customer-info">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="customer-img"
                  />

                  <div>
                    <h6>{item.name}</h6>
                    <span>{item.role}</span>
                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>

       
        <div className="dots mt-4">

          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;