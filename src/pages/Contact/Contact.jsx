// import React from "react";
import "./Contact.css";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa";
import React, { useState } from "react";
import contactBanner from "../../assets/about-banner.png";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const Contact = () => {

  const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const [formData, setFormData] = useState(initialForm);
const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);
const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  setErrors((prev) => ({
    ...prev,
    [name]: "",
  }));
};
const validateForm = () => {
  const newErrors = {};

  if (!formData.name.trim()) {
    newErrors.name = "Full name is required";
  }

  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
  ) {
    newErrors.email = "Invalid email address";
  }

  if (!formData.phone.trim()) {
    newErrors.phone = "Phone number is required";
  } else if (!/^[0-9]{10}$/.test(formData.phone)) {
    newErrors.phone = "Enter a valid 10-digit phone number";
  }

  if (!formData.subject.trim()) {
    newErrors.subject = "Subject is required";
  }

  if (!formData.message.trim()) {
    newErrors.message = "Message is required";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};
const handleSubmit = (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setLoading(true);

  setTimeout(() => {
    setLoading(false);
    setSuccess(true);
    setFormData(initialForm);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  }, 1500);
};
const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "Orders are usually delivered within 3-7 business days depending on your location.",
  },
  {
    question: "Do you offer custom jewellery?",
    answer:
      "Yes. We create personalized and custom handcrafted jewellery according to your requirements.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept UPI, Debit Card, Credit Card, Net Banking and Cash on Delivery (where available).",
  },
  {
    question: "Can I return my order?",
    answer:
      "Yes. Returns are accepted within 7 days for eligible products. Customized products are non-returnable.",
  },
];
  return (
<>
    <Navbar/>
    <div className="contact-page">
     {/* ================= HERO SECTION ================= */}

<section
  className="contact-hero"
  style={{ backgroundImage: `url(${contactBanner})` }}
>
  <div className="contact-overlay"></div>

  <div className="contact-hero-content">
   

    <h1>Let's Start a Conversation</h1>

    <p>
      We'd love to hear from you. Whether you have questions about our
      handcrafted jewellery, need styling advice, or want to place a custom
      order, our team is here to help.
    </p>

    <div className="hero-buttons">
      <a href="#contact-form" className="primary-btn">
        Send Inquiry
      </a>

      <a href="#store-location" className="secondary-btn">
        Visit Store
      </a>
    </div>
  </div>
</section>

{/* ================= BREADCRUMB ================= */}
{/* 
<div className="breadcrumb-wrapper">
  <div className="breadcrumb-container">
  
    <span className="divider">/</span>
    <span className="active">Contact</span>
  </div>
</div> */}

{/* ================= CONTACT INFO ================= */}

<section className="contact-info">

  {/* Address */}

  <a
    href="https://maps.google.com/?q=Nagpur,Maharashtra"
    target="_blank"
    rel="noreferrer"
    className="info-card"
  >
    <div className="icon-box">
      <FaMapMarkerAlt />
    </div>

    <h3>Visit Our Store</h3>

    <p>
      Fashion Oasis
      <br />
      Nagpur, Maharashtra
    </p>

    <span>Get Directions →</span>
  </a>

  {/* Phone */}

  <a
    href="tel:+919876543210"
    className="info-card"
  >
    <div className="icon-box">
      <FaPhoneAlt />
    </div>

    <h3>Call Us</h3>

    <p>
      +91 98765 43210
      <br />
      Mon – Sat
    </p>

    <span>Call Now →</span>
  </a>

  {/* Email */}

  <a
    href="mailto:support@fashionoasis.com"
    className="info-card"
  >
    <div className="icon-box">
      <FaEnvelope />
    </div>

    <h3>Email Us</h3>

    <p>
      support@fashionoasis.com
      <br />
      We'll reply within 24 hours
    </p>

    <span>Send Email →</span>
  </a>

  {/* Hours */}

  <div className="info-card">
    <div className="icon-box">
      <FaClock />
    </div>

    <h3>Business Hours</h3>

    <p>
      Monday – Saturday
      <br />
      10:00 AM – 8:00 PM
    </p>

    <span>Sunday : Closed</span>
  </div>

</section>
{/* ================= CONTACT SECTION ================= */}

<section className="contact-wrapper" id="contact-form">

  {/* ================= LEFT : CONTACT FORM ================= */}

  <div className="contact-left">

    <span className="section-tag">
      SEND US A MESSAGE
    </span>

    <h2>
      We'd Love To Hear
      <span> From You</span>
    </h2>

    <p className="contact-description">
      Have a question about our handcrafted jewellery or need help with an
      order? Fill out the form below and our team will get back to you as
      soon as possible.
    </p>

   <form className="contact-form" onSubmit={handleSubmit}>

      <div className="input-row">
        <div className="input-group">
          <label>Full Name *</label>
          <input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="Enter your full name"
/>

{errors.name && (
  <small className="error-text">
    {errors.name}
  </small>
)}
        </div>

        <div className="input-group">
          <label>Email Address *</label>
          <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Enter your email"
/>

{errors.email && (
  <small className="error-text">
    {errors.email}
  </small>
)}
        </div>
      </div>

      <div className="input-row">
        <div className="input-group">
          <label>Phone Number *</label>
         <input
  type="tel"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  placeholder="+91 9876543210"
/>

{errors.phone && (
  <small className="error-text">
    {errors.phone}
  </small>
)}
        </div>

        <div className="input-group">
          <label>Subject *</label>
         <input
  type="text"
  name="subject"
  value={formData.subject}
  onChange={handleChange}
  placeholder="Subject"
/>

{errors.subject && (
  <small className="error-text">
    {errors.subject}
  </small>
)}
        </div>
      </div>

      <div className="input-group">
        <label>Message *</label>

       <textarea
  name="message"
  rows="6"
  value={formData.message}
  onChange={handleChange}
  placeholder="Tell us how we can help..."
></textarea>

{errors.message && (
  <small className="error-text">
    {errors.message}
  </small>
)}
      </div>

  <button
  type="submit"
  className="submit-btn"
  disabled={loading}
>
  {loading ? "Sending..." : "Send Inquiry"}
</button>
{success && (
  <div className="success-message">
    ✅ Thank you! Your inquiry has been sent successfully.
  </div>
)}

    </form>

  </div>

  {/* ================= RIGHT : MAP ================= */}

  <div className="contact-right" id="store-location">

    <div className="map-card">

      <div className="map-header">
        <h3>Our Store Location</h3>

        <p>
          Visit our showroom or contact us online anytime.
        </p>
      </div>

      <div className="map-container">
        <iframe
          title="Fashion Oasis Location"
          src="https://www.google.com/maps?q=Nagpur,Maharashtra&output=embed"
          loading="lazy"
          allowFullScreen=""
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

    </div>

    {/* ================= BUSINESS INFO ================= */}

    {/* <div className="business-card">

      <h3>Business Information</h3>

      <div className="business-item">
        <strong>Address</strong>
        <span>Nagpur, Maharashtra, India</span>
      </div>

      <div className="business-item">
        <strong>Email</strong>
        <a href="mailto:support@fashionoasis.com">
          support@fashionoasis.com
        </a>
      </div>

      <div className="business-item">
        <strong>Phone</strong>
        <a href="tel:+919876543210">
          +91 98765 43210
        </a>
      </div>

      <div className="business-item">
        <strong>Business Hours</strong>
        <span>Monday – Saturday</span>
        <span>10:00 AM – 8:00 PM</span>
      </div>

    </div> */}

    {/* ================= SOCIAL ================= */}

    {/* <div className="social-box">

      <h3>Follow Us</h3>

      <p>
        Stay connected for our latest collections,
        exclusive launches and handcrafted jewellery updates.
      </p>

      <div className="social-icons">

        <a href="#">
          <FaFacebookF />
        </a>

        <a href="#">
          <FaInstagram />
        </a>

        <a href="#">
          <FaPinterestP />
        </a>

      </div>

    </div> */}

  </div>

</section>
{/* ================= FAQ SECTION ================= */}

<section className="faq-section">

  <div className="faq-header">

    <span className="section-tag">
      FAQ
    </span>

    <h2>
      Frequently Asked
      <span> Questions</span>
    </h2>

    <p>
      Find answers to the most common questions about our jewellery,
      shipping, payments and returns.
    </p>

  </div>

  <div className="faq-container">

    {faqs.map((faq, index) => (

      <div
        key={index}
        className={`faq-item ${
          activeFAQ === index ? "active" : ""
        }`}
      >

        <div
          className="faq-question"
          onClick={() =>
            setActiveFAQ(activeFAQ === index ? null : index)
          }
        >

          <h3>{faq.question}</h3>

          <span>
            {activeFAQ === index ? "−" : "+"}
          </span>

        </div>

        {activeFAQ === index && (

          <div className="faq-answer">
            <p>{faq.answer}</p>
          </div>

        )}

      </div>

    ))}

  </div>

</section>
    </div>
    <Footer/>
    </>
  );
};

export default Contact;