import "./FeaturedProducts.css";
import { FaArrowRight } from "react-icons/fa";
import { products } from "./FeaturedData";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  return (
    <section className="product-grid-section">

      <div className="grid-heading">

        <span>MORE TO EXPLORE</span>

        <h2>Our Best Picks</h2>

        <p>
          Discover handcrafted jewellery designed with elegance,
          premium quality and timeless beauty.
        </p>

      </div>

      <div className="products-grid">

        {products.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

      <div className="view-all">

        <button>

          View All Products

          <FaArrowRight />

        </button>

      </div>

    </section>
  );
};

export default ProductGrid;