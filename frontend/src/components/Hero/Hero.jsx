import "./Hero.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import heroBanner from "../../assets/hero1.png";
import heroBanner1 from "../../assets/hero2.png";
import heroBanner2 from "../../assets/hero4.png";

import mobileHero1 from "../../assets/mobile_hero1.jpg";
import mobileHero2 from "../../assets/mobile_hero2.jpg";
import mobileHero3 from "../../assets/mobile_hero3.jpg";

import {
  FaHeart,
  FaGem,
  FaLeaf,
  FaArrowRight,
  FaChevronRight,
} from "react-icons/fa";

const Hero = () => {
  const desktopSwiperRef = useRef(null);
  const mobileSwiperRef = useRef(null);
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      image: heroBanner,
      mobileImage: mobileHero1,
      title: "Crafted",
      subtitle: "With Love",
      desc: "Timeless handcrafted jewellery designed with elegance and love to celebrate your unique style.",
    },
    {
      id: 2,
      image: heroBanner1,
      mobileImage: mobileHero2,
      title: "Elegance",
      subtitle: "Redefined",
      desc: "Exquisite diamonds and fine gold creations crafted for your most precious moments.",
    },
    {
      id: 3,
      image: heroBanner2,
      mobileImage: mobileHero3,
      title: "Radiant",
      subtitle: "Beauty",
      desc: "Discover sustainable luxury handcrafted with passion, precision, and perfection.",
    },
  ];

  return (
    <section className="home-hero">
      {/* ====================================================
          DESKTOP HERO SECTION (100% Untouched Original Markup)
         ==================================================== */}
      <div className="desktop-hero-section">
        <Swiper
          ref={desktopSwiperRef}
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          loop={true}
          speed={1200}
          allowTouchMove={true}
          keyboard={{ enabled: true }}
          className="hero-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="hero-slide">
                <div className="hero-bg">
                  <img src={slide.image} alt={slide.title} />
                </div>
                <div className="hero-overlay"></div>
                <div className="container">
                  <div className="hero-content">
                    <div className="hero-tag">
                      <span>Exclusive Collection</span>
                      <div className="line"></div>
                    </div>

                    <h1>
                      {slide.title}
                      <span>{slide.subtitle}</span>
                    </h1>

                    <p>{slide.desc}</p>

                    <button onClick={() => navigate("/shop")}>
                      Explore Collection
                      <FaArrowRight className="btn-arrow" />
                    </button>

                    <div className="hero-features desktop-features">
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
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ====================================================
          MOBILE HERO SECTION (Using Uploaded Mobile Banners)
         ==================================================== */}
      <div className="mobile-hero-section">
        <Swiper
          ref={mobileSwiperRef}
          modules={[Pagination, Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={800}
          className="mobile-full-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="mobile-full-slide">
                {/* Dedicated Portrait Mobile Banner Image */}
                <div className="mobile-full-bg">
                  <img src={slide.mobileImage} alt={slide.title} />
                </div>

                {/* Subtle Soft Gradient Overlay */}
                <div className="mobile-full-overlay"></div>

                {/* Overlaid Content in Upper-Left Clean Space */}
                <div className="mobile-full-content">
                  <h1>
                    {slide.title}
                    <span>{slide.subtitle}</span>
                  </h1>
                  <p>{slide.desc}</p>
                  <button onClick={() => navigate("/shop")}>
                    Explore Collection
                    <FaArrowRight className="btn-arrow" />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Mobile Feature Cards (Stacked Vertically Below Hero) */}
        <div className="mobile-features-wrapper">
          <div className="mobile-feature-card">
            <div className="feature-left">
              <div className="feature-icon-wrapper"><FaHeart /></div>
              <div className="feature-text">
                <h6>Handmade</h6>
                <small>With Love</small>
              </div>
            </div>
            <FaChevronRight className="feature-chevron" />
          </div>
          <div className="mobile-feature-card">
            <div className="feature-left">
              <div className="feature-icon-wrapper"><FaGem /></div>
              <div className="feature-text">
                <h6>Premium</h6>
                <small>Quality</small>
              </div>
            </div>
            <FaChevronRight className="feature-chevron" />
          </div>
          <div className="mobile-feature-card">
            <div className="feature-left">
              <div className="feature-icon-wrapper"><FaLeaf /></div>
              <div className="feature-text">
                <h6>Sustainable</h6>
                <small>& Ethical</small>
              </div>
            </div>
            <FaChevronRight className="feature-chevron" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;