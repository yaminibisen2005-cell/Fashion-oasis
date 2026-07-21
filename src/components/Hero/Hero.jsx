import "./Hero.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import heroBanner from "../../assets/hero.png";
import heroBanner1 from "../../assets/hero1.png";
import heroBanner2 from "../../assets/hero2.png";

import {
  FaHeart,
  FaGem,
  FaLeaf,
  FaArrowRight,
} from "react-icons/fa";

const Hero = () => {
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      image: heroBanner,
    },
    {
      id: 2,
      image: heroBanner1,
    },
    {
      id: 3,
      image: heroBanner2,
    },
  ];

  return (
    <section className="hero">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        loop={true}
        speed={1000}
        allowTouchMove={true}
        keyboard={{
          enabled: true,
        }}
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="hero-slide">
              <div className="hero-bg">
                <img src={slide.image} alt="Hero Banner" />
              </div>
              <div className="hero-overlay"></div>
              <div className="container">
                <div className="row align-items-center hero-row">
                  <div className="col-lg-5">
                    <div className="hero-content">
                      <div className="hero-tag">
                        
                        <div className="line"></div>
                        <FaHeart />
                      </div>
                      <h1 color="#ef6f8f">
                        Crafted
                        <span>With Love</span>
                      </h1>
                      <p>
                        Timeless handcrafted jewellery designed with elegance
                        and love to celebrate your unique style.
                      </p>
                      <button onClick={() => navigate("/collections")}>
                        Explore Collection
                        <FaArrowRight />
                      </button>
                      <div className="hero-features">
                        <div>
                          <FaHeart />
                          <div>
                            <h6>Handmade</h6>
                            <small>With Love</small>
                          </div>
                        </div>
                        <div>
                          <FaGem />
                          <div>
                            <h6>Premium</h6>
                            <small>Quality</small>
                          </div>
                        </div>
                        <div>
                          <FaLeaf />
                          <div>
                            <h6>Sustainable</h6>
                            <small>& Ethical</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7"></div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;