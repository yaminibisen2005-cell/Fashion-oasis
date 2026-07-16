import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import {
  FaHeart,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";

import { bannerProducts } from "./FeaturedData";

const BannerSlider = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay, EffectFade]}
      effect="fade"
      slidesPerView={1}
      loop
      speed={900}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      className="featured-slider"
    >
      {bannerProducts.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="featured-banner">

            {/* Left Content */}

            <div className="banner-left">

              <span className="product-badge">
                {item.badge}
              </span>

              <h1>
                {item.title}
              </h1>

              <p>
                {item.description}
              </p>

              <div className="banner-rating">

                {[...Array(item.rating)].map((_, index) => (
                  <FaStar key={index} />
                ))}

                <span>
                  ({item.reviews} Reviews)
                </span>

              </div>

              <div className="banner-price">

                <h2>
                  ₹{item.price}
                </h2>

                <del>
                  ₹{item.oldPrice}
                </del>

              </div>

              <div className="banner-buttons">

                <button className="shop-btn">

                  Shop Now

                  <FaArrowRight />

                </button>

                <button className="wishlist-btn">

                  <FaHeart />

                </button>

              </div>

            </div>

            {/* Right Image */}

            <div className="banner-right">

              <img
                src={item.image}
                alt={item.title}
              />

            </div>

          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerSlider;