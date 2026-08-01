import RelatedProducts from "../components/ProductDetails/RelatedProducts/RelatedProducts";
import "./ProductDetails.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


import ProductGallery from "../components/ProductDetails/ProductGallery/ProductGallery";
import ProductInfo from "../components/ProductDetails/ProductInfo/ProductInfo";
import ServiceFeatures from "../components/ProductDetails/ServiceFeatures/ServiceFeatures";
import ProductTabs from "../components/ProductDetails/ProductTabs/ProductTabs";
import RecentlyViewed from "../components/ProductDetails/RecentlyViewed/RecentlyViewed";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch single product
        const productRes = await axios.get(`http://localhost:5000/api/v1/products/${id}`);
        if (productRes.data.success) {
          setProduct(productRes.data.data);
        }
        
        // Fetch products for related/recently viewed
        const allRes = await axios.get(`http://localhost:5000/api/v1/products?limit=10`);
        if (allRes.data.success) {
          setAllProducts(allRes.data.data);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found.</div>;

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
        products={allProducts}
      />

 <RecentlyViewed
          products={allProducts}
      />
      
      

    </div>
    <Footer/>
     </>
  );
};

export default ProductDetails;