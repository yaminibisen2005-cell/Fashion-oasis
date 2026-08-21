import "./RecentlyViewed.css";
import ProductCard from "../../Shop/ProductCard/ProductCard";

const RecentlyViewed = ({ products }) => {

  return (
    <section className="recently-viewed">

      <div className="section-heading">

        <h2>Recently Viewed</h2>

        <p>
          Continue exploring products you've viewed recently.
        </p>

      </div>

      <div className="recent-grid">

        {products.slice(0, 4).map((product, index) => (
          <ProductCard
            key={product._id || product.id || index}
            product={product}
          />
        ))}

      </div>

    </section>
  );
};

export default RecentlyViewed;