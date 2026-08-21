import RelatedProducts from "../components/ProductDetails/RelatedProducts/RelatedProducts";
import "./ProductDetails.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apiClient from "../api/client";


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
        let foundProduct = null;

        try {
          const productRes = await apiClient.get(`/products/${id}`);
          if (productRes.data.success && productRes.data.data) {
            foundProduct = productRes.data.data;
          }
        } catch (err) {
          console.warn("Direct product fetch failed, executing list fallback:", err);
        }

        const allRes = await apiClient.get(`/products?limit=100`);
        let allProds = [];
        if (allRes.data) {
          allProds = allRes.data.data || allRes.data.products || (Array.isArray(allRes.data) ? allRes.data : []);
          setAllProducts(allProds);
        }

        if (!foundProduct && allProds.length > 0) {
          const targetId = String(id).trim().toLowerCase();
          foundProduct = allProds.find(
            (p) =>
              String(p._id).toLowerCase() === targetId ||
              String(p.id).toLowerCase() === targetId ||
              (p.name && p.name.toLowerCase() === targetId)
          ) || null;
        }

        setProduct(foundProduct);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div style={{ textAlign: "center", padding: "80px 20px", fontSize: "18px" }}>Loading product details...</div>;
  if (!product) return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2>Product Details</h2>
        <p style={{ color: "#777", marginTop: "10px" }}>Item details are currently unavailable or moved.</p>
        <Link to="/shop" className="btn-primary" style={{ marginTop: "20px", display: "inline-block" }}>Browse Collection</Link>
      </div>
      <Footer />
    </>
  );

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