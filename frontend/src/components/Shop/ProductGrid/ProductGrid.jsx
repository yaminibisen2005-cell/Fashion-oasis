import "./ProductGrid.css";
import ProductCard from "../ProductCard/ProductCard";
import { useEffect, useState, useRef } from "react";

const ProductGrid = ({ products, onAddToCart }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const prevProductsRef = useRef([]);

  useEffect(() => {
    // Only animate if products actually changed (check first product ID or length)
    const productsChanged =
      prevProductsRef.current.length !== products.length ||
      (products.length > 0 && prevProductsRef.current[0]?.id !== products[0]?.id);

    if (productsChanged) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);

      prevProductsRef.current = products;
      return () => clearTimeout(timer);
    }
  }, [products]);

  return (
    <section className={`product-grid ${isAnimating ? "fade-in" : ""}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </section>
  );
};

export default ProductGrid;




