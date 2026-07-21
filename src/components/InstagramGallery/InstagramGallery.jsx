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

const InstagramGallery = () => {
  return (
    <section className="instagram-section">

      <div className="instagram-container">

        <div className="instagram-heading">

          <span>FOLLOW OUR JOURNEY</span>

          <h2>Instagram Gallery</h2>

          <p>
            Every piece tells a story. Discover timeless elegance,
            handcrafted jewellery, and beautiful moments shared by
            our Fashion Oasis family.
          </p>

        </div>

        <div className="instagram-grid">

          {images.map((image, index) => (
            <div className="instagram-card" key={index}>

              <img
                src={image}
                alt={`Instagram ${index + 1}`}
              />

              <div className="instagram-overlay">

                <FaInstagram />

                <h4>@fashionoasis</h4>

              </div>

            </div>
          ))}

        </div>

        <div className="instagram-button">

          <button>
            <FaInstagram />
            Follow @fashionoasis
          </button>

        </div>

      </div>

    </section>
  );
};

export default InstagramGallery;