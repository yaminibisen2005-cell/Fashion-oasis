import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FaChevronDown } from "react-icons/fa";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <>
      <Navbar />

      <section className="privacy-page">
        {/* HERO SECTION */}
        <section className="privacy-hero">
          <div className="privacy-hero-overlay">
            <span>Your Privacy Matters</span>
            <h1>Privacy Policy</h1>
            <p>We are committed to protecting your personal information and privacy.</p>
          </div>
        </section>

        {/* CONTENT SECTION */}
        <section className="privacy-content">
          <div className="container">
            <div className="privacy-intro">
              <p className="last-updated">Last Updated: January 2026</p>
              <p>At Fashion Oasis, we value your trust and are committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or make a purchase.</p>
            </div>

            {/* ACCORDION SECTIONS */}
            <div className="privacy-accordion">
              {privacyData.map((item, index) => (
                <div
                  key={index}
                  className={`accordion-item ${activeSection === index ? "active" : ""}`}
                >
                  <div
                    className="accordion-header"
                    onClick={() => toggleSection(index)}
                  >
                    <h3>{item.title}</h3>
                    <FaChevronDown className={`accordion-icon ${activeSection === index ? "rotated" : ""}`} />
                  </div>
                  <div className={`accordion-content ${activeSection === index ? "open" : ""}`}>
                    <div className="accordion-inner">
                      {item.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CONTACT SECTION */}
            <div className="privacy-contact">
              <h3>Privacy Concerns?</h3>
              <p>If you have any questions about our Privacy Policy or how we handle your data, please contact us:</p>
              <div className="contact-details">
                <p><strong>Email:</strong> fashionoasis082@gmail.com</p>
                <p><strong>Phone:</strong> +91 7739479666</p>
                <p><strong>Address:</strong> Newton Garden Apartment, Jagdeo Path, Patna, Bihar – 800014, India</p>
              </div>
            </div>
          </div>
        </section>
      </section>

      <Footer />
    </>
  );
};

const privacyData = [
  {
    title: "1. Information We Collect",
    content: (
      <div>
        <p>We collect information you provide directly to us, including:</p>
        <ul>
          <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address, and billing address when you place an order or create an account.</li>
          <li><strong>Order Information:</strong> Product details, purchase history, and payment information.</li>
          <li><strong>Communication:</strong> Messages you send us through our contact forms, email, or WhatsApp.</li>
        </ul>
        <p>We also automatically collect certain information when you visit our website, such as IP address, browser type, device information, and browsing behavior.</p>
      </div>
    )
  },
  {
    title: "2. How We Use Your Information",
    content: (
      <div>
        <p>We use your personal information for the following purposes:</p>
        <ul>
          <li>To process and fulfill your orders</li>
          <li>To communicate with you about your orders, including shipping confirmations and updates</li>
          <li>To provide customer support and respond to your inquiries</li>
          <li>To send you promotional communications (with your consent)</li>
          <li>To improve our website, products, and services</li>
          <li>To detect and prevent fraud and ensure the security of our platform</li>
        </ul>
      </div>
    )
  },
  {
    title: "3. Information Sharing",
    content: (
      <div>
        <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
        <ul>
          <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our website, processing payments, and delivering orders (e.g., courier services, payment gateways).</li>
          <li><strong>Legal Requirements:</strong> When required by law or to protect our rights, property, or safety, or that of our users.</li>
          <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, or acquisition of all or a portion of our business.</li>
        </ul>
      </div>
    )
  },
  {
    title: "4. Data Security",
    content: (
      <div>
        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
        <ul>
          <li>Secure SSL encryption for all data transmissions</li>
          <li>Secure payment processing through trusted payment gateways</li>
          <li>Restricted access to personal data only to authorized personnel</li>
          <li>Regular security reviews and updates</li>
        </ul>
        <p>However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.</p>
      </div>
    )
  },
  {
    title: "5. Cookies and Tracking",
    content: (
      <div>
        <p>We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content. Cookies are small files stored on your device that remember your preferences and help us understand how you use our website.</p>
        <p>You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our website and your user experience.</p>
      </div>
    )
  },
  {
    title: "6. Your Rights",
    content: (
      <div>
        <p>You have the following rights regarding your personal information:</p>
        <ul>
          <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
          <li><strong>Correction:</strong> Request correction of any inaccurate or incomplete information.</li>
          <li><strong>Deletion:</strong> Request deletion of your personal information, subject to certain legal obligations.</li>
          <li><strong>Opt-out:</strong> Opt-out of receiving promotional communications from us.</li>
          <li><strong>Object:</strong> Object to our processing of your personal information.</li>
        </ul>
        <p>To exercise these rights, please contact us using the information provided below.</p>
      </div>
    )
  },
  {
    title: "7. Third-Party Links",
    content: (
      <div>
        <p>Our website may contain links to third-party websites, including social media platforms and payment processors. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any third-party websites you visit.</p>
      </div>
    )
  },
  {
    title: "8. Children's Privacy",
    content: (
      <div>
        <p>Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.</p>
      </div>
    )
  },
  {
    title: "9. Changes to This Policy",
    content: (
      <div>
        <p>We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or for other operational reasons. We will notify you of any material changes by posting the new policy on our website and updating the "Last Updated" date.</p>
        <p>Your continued use of our website after any changes constitutes acceptance of the updated Privacy Policy.</p>
      </div>
    )
  },
  {
    title: "10. Contact Information",
    content: (
      <div>
        <p>For any questions regarding this Privacy Policy or our data practices, please contact us at:</p>
        <p><strong>Email:</strong> fashionoasis082@gmail.com</p>
        <p><strong>Phone:</strong> +91 7739479666</p>
        <p><strong>Address:</strong> Newton Garden Apartment, Jagdeo Path, Patna, Bihar – 800014, India</p>
      </div>
    )
  }
];

export default PrivacyPolicy;
