
import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact-page">

      {/* Hero */}
      <div className="contact-hero">
        <span className="contact-tag">Get in Touch</span>

        <h1>Contact Fashion Oasis</h1>

        <p>
          We'd love to hear from you. Whether you have questions about our
          handcrafted jewellery, custom orders, or your recent purchase,
          our team is here to help.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="container">

        <div className="contact-cards">

          <div className="contact-card">
            <div className="icon">📍</div>
            <h3>Address</h3>
            <p>123 Fashion Street</p>
            <p>Mumbai, Maharashtra</p>
          </div>

          <div className="contact-card">
            <div className="icon">📞</div>
            <h3>Phone</h3>
            <p>+91 98765 43210</p>
            <p>+91 98765 12345</p>
          </div>

          <div className="contact-card">
            <div className="icon">✉️</div>
            <h3>Email</h3>
            <p>fashionoasis@gmail.com</p>
            <p>support@fashionoasis.com</p>
          </div>

        </div>

        {/* Contact Form */}

        <div className="contact-wrapper">

          <div className="contact-info">

            <h2>Let's Connect</h2>

            <p>
              Fill out the form and our team will get back to you within
              24 hours.
            </p>

            <div className="working-hours">
              <h4>Working Hours</h4>

              <p>Monday - Saturday</p>

              <p>10:00 AM - 7:00 PM</p>
            </div>

          </div>

          <form className="contact-form">

            <input
              type="text"
              placeholder="Full Name"
            />

            <input
              type="email"
              placeholder="Email Address"
            />

            <input
              type="text"
              placeholder="Phone Number"
            />

            <input
              type="text"
              placeholder="Subject"
            />

            <textarea
              rows="6"
              placeholder="Your Message"
            ></textarea>

            <button type="submit">
              Send Message
            </button>

          </form>

        </div>

        {/* Map */}

        <div className="map-section">

          <h2>Visit Our Store</h2>

          <iframe
            title="Google Map"
            src="https://www.google.com/maps?q=Mumbai&output=embed"
            loading="lazy"
          ></iframe>

        </div>

      </div>

    </section>
  );
};

export default Contact;