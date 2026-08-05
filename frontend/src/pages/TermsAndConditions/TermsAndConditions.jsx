import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FaChevronDown } from "react-icons/fa";
import "./TermsAndConditions.css";

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <>
      <Navbar />

      <section className="terms-page">
        {/* HERO SECTION */}
        <section className="terms-hero">
          <div className="terms-hero-overlay">
            <span>Legal Information</span>
            <h1>Terms & Conditions</h1>
            <p>Please read our terms and conditions carefully before using our services.</p>
          </div>
        </section>

        {/* CONTENT SECTION */}
        <section className="terms-content">
          <div className="container">
            <div className="terms-intro">
              <p className="last-updated">Last Updated: January 2026</p>
              <p>Welcome to Fashion Oasis. By accessing or using our website and services, you agree to comply with and be bound by the following terms and conditions of use.</p>
            </div>

            {/* ACCORDION SECTIONS */}
            <div className="terms-accordion">
              {termsData.map((item, index) => (
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
            <div className="terms-contact">
              <h3>Need Help?</h3>
              <p>If you have any questions about our Terms & Conditions, please contact us:</p>
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

const termsData = [
  {
    title: "1. Introduction",
    content: (
      <div>
        <p>These Terms & Conditions govern your use of the Fashion Oasis website and our services. By accessing or using our website, you agree to be bound by these terms. If you do not agree to these terms, please do not use our website.</p>
        <p>Fashion Oasis reserves the right to modify these terms at any time without prior notice. Your continued use of the website after any changes constitutes acceptance of the new terms.</p>
      </div>
    )
  },
  {
    title: "2. Products & Services",
    content: (
      <div>
        <p>All products listed on our website are artificial jewellery and fashion accessories. We strive to provide accurate descriptions and images of our products; however, actual colors may vary slightly due to monitor settings and lighting conditions during photography.</p>
        <p>We reserve the right to discontinue any product at any time without notice. We also reserve the right to limit the quantity of any product purchased per person, per household, or per order.</p>
      </div>
    )
  },
  {
    title: "3. Orders & Payment",
    content: (
      <div>
        <p>All orders are subject to availability and acceptance. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing, or suspected fraud.</p>
        <p>Payment for orders can be made through the available payment methods on our website. All prices are in Indian Rupees (INR) and include applicable taxes unless otherwise stated.</p>
        <p>For order inquiries, customers can use our "Send Inquiry" feature to connect with our team via WhatsApp or email for order confirmation and payment details.</p>
      </div>
    )
  },
  {
    title: "4. Shipping & Delivery",
    content: (
      <div>
        <p>We offer shipping across India. Shipping times may vary based on your location. Standard delivery typically takes 5-7 business days from the date of order confirmation.</p>
        <p>We are not responsible for delays caused by courier services, natural disasters, or other factors beyond our control. Shipping charges may apply based on order value and location.</p>
      </div>
    )
  },
  {
    title: "5. Returns & Refunds",
    content: (
      <div>
        <p>Due to the nature of our products (artificial jewellery), we do not accept returns or exchanges unless the product received is damaged or defective. Customers must report any damage within 48 hours of delivery with photographic evidence.</p>
        <p>Refunds will be processed within 7-10 business days after approval. Refunds will be issued to the original payment method used for the purchase.</p>
      </div>
    )
  },
  {
    title: "6. User Accounts",
    content: (
      <div>
        <p>If you create an account on our website, you are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>
        <p>You may not use our website for any illegal or unauthorized purpose. You must not transmit any viruses or any code of a destructive nature through our website.</p>
      </div>
    )
  },
  {
    title: "7. Intellectual Property",
    content: (
      <div>
        <p>All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Fashion Oasis or its content suppliers and is protected by intellectual property laws.</p>
        <p>You may not use, reproduce, modify, or distribute any content from this website without prior written consent from Fashion Oasis.</p>
      </div>
    )
  },
  {
    title: "8. Limitation of Liability",
    content: (
      <div>
        <p>Fashion Oasis shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to or use of the website. Our total liability to you for all claims shall not exceed the amount you paid for the product in question.</p>
      </div>
    )
  },
  {
    title: "9. Governing Law",
    content: (
      <div>
        <p>These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in Patna, Bihar.</p>
      </div>
    )
  },
  {
    title: "10. Contact Information",
    content: (
      <div>
        <p>For any questions regarding these Terms & Conditions, please contact us at:</p>
        <p><strong>Email:</strong> fashionoasis082@gmail.com</p>
        <p><strong>Phone:</strong> +91 7739479666</p>
        <p><strong>Address:</strong> Newton Garden Apartment, Jagdeo Path, Patna, Bihar – 800014, India</p>
      </div>
    )
  }
];

export default TermsAndConditions;
