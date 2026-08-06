import RelatedProducts from "../components/ProductDetails/RelatedProducts/RelatedProducts";
import "./ProductDetails.css";
import { Link, useParams } from "react-router-dom";
import { products } from "../data/products";


import ProductGallery from "../components/ProductDetails/ProductGallery/ProductGallery";
import ProductInfo from "../components/ProductDetails/ProductInfo/ProductInfo";
import ServiceFeatures from "../components/ProductDetails/ServiceFeatures/ServiceFeatures";
import ProductTabs from "../components/ProductDetails/ProductTabs/ProductTabs";
import RecentlyViewed from "../components/ProductDetails/RecentlyViewed/RecentlyViewed";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
   <Navbar/>
    <div className="product-details-page">

     

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
    <Footer/>
     </>
  );
};

export default ProductDetails;