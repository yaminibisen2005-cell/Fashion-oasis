import "./RelatedProducts.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import ProductCard from "../../Shop/ProductCard/ProductCard";

const RelatedProducts = ({ currentProduct, products }) => {

  let relatedProducts = products.filter(
    (item) =>
      item.category === currentProduct.category &&
      item.id !== currentProduct.id
  );

  if (relatedProducts.length < 4) {
    const extraProducts = products.filter(
      (item) =>
        item.id !== currentProduct.id &&
        !relatedProducts.includes(item)
    );

    relatedProducts = [
      ...relatedProducts,
      ...extraProducts.slice(0, 4 - relatedProducts.length),
    ];
  }

  return (
    <section className="related-products">
      <div className="related-products-container">

        <div className="section-title">
          <h2>You May Also Like</h2>
          <div className="divider"></div>
          <p>Handpicked jewellery specially for you.</p>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          spaceBetween={25}
          loop={relatedProducts.length > 4}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {relatedProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default RelatedProducts;