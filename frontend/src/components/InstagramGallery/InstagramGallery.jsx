import React from "react";
import "./InstagramGallery.css";

import { FaInstagram } from "react-icons/fa";

import img1 from "../../assets/product1.jpg";
import img2 from "../../assets/product2.jpg";
import img3 from "../../assets/product3.jpg";
import img4 from "../../assets/product4.jpg";
import img5 from "../../assets/product5.jpg";
import img6 from "../../assets/product6.jpg";

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
];

// Duplicate images to create seamless infinite loop
const duplicatedImages = [...images, ...images, ...images];

const InstagramGallery = () => {
  return (
    <section className="instagram-section">
      <div className="instagram-container">

        {/* Heading */}

        <div className="instagram-heading">
          <span>FOLLOW OUR JOURNEY</span>

          <h2>Instagram Gallery</h2>

          <p>
            Every piece tells a story. Discover timeless elegance,
            handcrafted jewellery, and beautiful moments shared by
            our Fashion Oasis family.
          </p>
        </div>

        {/* Infinite Scroll Gallery */}

        <div className="instagram-gallery-wrapper">
          <div className="instagram-gallery-track">
            {duplicatedImages.map((image, index) => (
              <a
                href="https://www.instagram.com/fashionoasisstore/"
                target="_blank"
                rel="noopener noreferrer"
                className="instagram-card"
                key={index}
              >
                <img
                  src={image}
                  alt={`Instagram ${(index % images.length) + 1}`}
                />

                <div className="instagram-overlay">
                  <div className="instagram-badge">
                    <FaInstagram />
                  </div>
                  <div className="instagram-branding">
                    <h3>Fashion Oasis</h3>
                    <p>@fashionoasisstore</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default InstagramGallery;