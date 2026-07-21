import React from "react";
import "./InstagramGallery.css";

import { FaInstagram } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

        {/* Swiper */}

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={20}
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            576: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            992: {
              slidesPerView: 4,
            },
            1200: {
              slidesPerView: 6,
            },
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="instagram-card">
                <img
                  src={image}
                  alt={`Instagram ${index + 1}`}
                />

                <div className="instagram-overlay">
                  <FaInstagram />

                  <h4>@fashionoasis</h4>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Button */}

        <div className="instagram-button">
          <a
            href="https://www.instagram.com/fashionoasisstore/"
            target="_blank"
            rel="noopener noreferrer"
            className="follow-btn"
          >
            <FaInstagram />
            Follow @fashionoasis
          </a>
        </div>

      </div>
    </section>
  );
};

export default InstagramGallery;