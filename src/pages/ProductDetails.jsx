import RelatedProducts from "../components/ProductDetails/RelatedProducts/RelatedProducts";
import "./ProductDetails.css";
import { Link } from "react-router-dom";
import { products } from "../data/products";


import ProductGallery from "../components/ProductDetails/ProductGallery/ProductGallery";
import ProductInfo from "../components/ProductDetails/ProductInfo/ProductInfo";
import ServiceFeatures from "../components/ProductDetails/ServiceFeatures/ServiceFeatures";
import ProductTabs from "../components/ProductDetails/ProductTabs/ProductTabs";
import RecentlyViewed from "../components/ProductDetails/RecentlyViewed/RecentlyViewed";

const product = products[0];

const ProductDetails = () => {
  return (
    <div className="product-details-page">

      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/shop">Shop</Link>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className="product-details-wrapper">

        <ProductGallery product={product} />

        <ProductInfo product={product} />

      </div>

     <ServiceFeatures />

      <ProductTabs />

      

      <RelatedProducts
        currentProduct={product}
        products={products}
      />

 <RecentlyViewed
          products={products}
      />
      
      

    </div>
  );
};

export default ProductDetails;