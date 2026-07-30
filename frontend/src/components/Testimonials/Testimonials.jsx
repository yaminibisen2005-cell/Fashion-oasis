import "./Testimonials.css";

import woman1 from "../../assets/woman1.jpg";
import woman2 from "../../assets/woman2.jpg";
import woman3 from "../../assets/woman3.jpg";

import jewel1 from "../../assets/jewel1.jpg";
import jewel2 from "../../assets/jewel2.jpg";
import jewel3 from "../../assets/jewel3.jpg";

import { FaStar, FaQuoteLeft } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,

    name: "Aishwarya Verma",

    city: "Mumbai",

    rating: 4.5,

    image: woman1,

    jewelry: jewel1,

    review:
      "Absolutely loved the necklace I ordered! The quality, design and packaging were beyond my expectations. It feels elegant and premium. I received so many compliments."
  },

  {
    id: 2,

    name: "Priya Sharma",

    city: "Delhi",

    rating: 5,

    image: woman2,

    jewelry: jewel2,

    review:
      "Fashion Oasis exceeded my expectations. The earrings are beautiful, lightweight and perfect for every occasion. Delivery was also super fast."
  },

  {
    id: 3,

    name: "Sneha Patel",

    city: "Ahmedabad",

    rating: 5,

    image: woman3,

    jewelry: jewel3,

    review:
      "Everything from product quality to customer service was amazing. The jewellery looks even better in real life. Highly recommended!"
  }
];

function Testimonials() {
  return (
    <section className="testimonial-section">

      <div className="container">

        <div className="testimonial-heading">

          <span>TESTIMONIALS</span>

          <h2>
            What Our Customers Say
          </h2>

        </div>

        <Swiper

          modules={[Navigation, Pagination, Autoplay]}

          slidesPerView={1}

          spaceBetween={30}

          navigation

          pagination={{
            clickable: true,
          }}

          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}

          loop={true}

          className="testimonialSwiper"
        >

          {testimonials.map((item) => (

            <SwiperSlide key={item.id}>

              <div className="testimonial-card">

                {/* LEFT */}

                <div className="testimonial-left">

                  <div className="rating">

                    <FaStar />

                    <FaStar />

                    <FaStar />

                    <FaStar />

                    <FaStar className="last-star" />

                    <span>
                      {item.rating}/5 Rating
                    </span>

                  </div>

                  <div className="quote">

                    <FaQuoteLeft />

                  </div>

                  <p className="review">

                    {item.review}

                  </p>

                  <div className="author">

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div>

                      <h5>{item.name}</h5>

                      <span>{item.city}</span>

                    </div>

                  </div>

                </div>

                {/* RIGHT */}

                <div className="testimonial-right">

                  <img
                    src={item.image}
                    alt=""
                    className="woman-image"
                  />

                  <div className="jewelry-circle">

                    <img
                      src={item.jewelry}
                      alt=""
                    />

                  </div>

                </div>

              </div>

            </SwiperSlide>

          ))}

        </Swiper>

      </div>

    </section>
  );
}

export default Testimonials;