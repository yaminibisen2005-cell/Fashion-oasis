import "./ProductGrid.css";
import ProductCard from "../ProductCard/ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <section className="product-grid">

      {products.map((product) => (
        <ProductCard
          key={product._id || product.id}
          product={product}
        />
      ))}

    </section>
  );
};

export default ProductGrid;
