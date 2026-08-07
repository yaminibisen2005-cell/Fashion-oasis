import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppButton.css";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/917739479666?text=Hi%20Fashion%20Oasis!%20I%20have%20an%20inquiry%20about%20your%20jewellery%20collection."
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float-btn"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp />
      <span className="whatsapp-tooltip">Chat with us</span>
    </a>
  );
};

export default WhatsAppButton;
