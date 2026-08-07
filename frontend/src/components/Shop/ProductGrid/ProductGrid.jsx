import "./ProductGrid.css";
import ProductCard from "../ProductCard/ProductCard";
import { useEffect, useState, useRef } from "react";

const ProductGrid = ({ products = [], onAddToCart }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const prevProductsRef = useRef([]);

  useEffect(() => {
    const safeProducts = Array.isArray(products) ? products : [];
    const productsChanged =
      prevProductsRef.current.length !== safeProducts.length ||
      (safeProducts.length > 0 && prevProductsRef.current[0]?._id !== safeProducts[0]?._id);

    if (productsChanged) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);

      prevProductsRef.current = safeProducts;
      return () => clearTimeout(timer);
    }
  }, [products]);

  const safeProductsList = Array.isArray(products) ? products : [];

  if (safeProductsList.length === 0) {
    return (
      <div className="no-products-view" style={{ textAlign: "center", padding: "60px 20px", color: "#777" }}>
        <h3>No Products Available</h3>
        <p>Try clearing or modifying your filter selections.</p>
      </div>
    );
  }

  return (
    <section className={`product-grid ${isAnimating ? "fade-in" : ""}`}>
      {safeProductsList.map((product) => (
        <ProductCard
          key={product._id || product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </section>
  );
};

export default ProductGrid;
