import { useState} from "react";
import "./Faq.css";

const faqData = [
  {
    question: "Are all your jewellery pieces handmade?",
    answer:
      "Yes! Every piece is handcrafted by skilled artisans using premium-quality materials to ensure elegance and durability."
  },
  {
    question: "Do you offer customization?",
    answer:
      "Absolutely! We offer personalized jewellery designs based on your preferences."
  },
  {
    question: "How long does shipping take?",
    answer:
      "Orders are usually delivered within 5–7 business days across India."
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery for selected locations."
  },
  {
    question: "Can I return or exchange my order?",
    answer:
      "Yes, we offer a 7-day return and exchange policy for eligible products."
  },
  {
    question: "How do I take care of my jewellery?",
    answer:
      "Keep your jewellery in a dry place, avoid direct contact with perfumes or chemicals, and store it in a soft pouch."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-page">
      <div className="container">

        <div className="faq-header">
          <span className="faq-tag">Frequently Asked Questions</span>
          <h1>We're Here to Help</h1>
          <p>
            Find answers to the most common questions about our handcrafted
            jewellery, orders, shipping, and more.
          </p>
        </div>

        <div className="faq-container">
          {faqData.map((item, index) => (
            <div className="faq-item" key={index}>
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                {item.question}
                <span>{activeIndex === index ? "−" : "+"}</span>
              </button>

              {activeIndex === index && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="faq-contact">
          <h2>Still Have Questions?</h2>
          <p>
            Our support team is always ready to help you with any queries.
          </p>

          <button>Contact Us</button>
        </div>

      </div>
    </section>
  );
};

export default FAQ;