import "./FeaturedProducts.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";

import thumb1 from "../../assets/thumb1.png";
import thumb2 from "../../assets/thumb2.png";
import thumb3 from "../../assets/thumb3.png";
import thumb4 from "../../assets/thumb4.png";

// Removed hardcoded products

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/v1/products/featured?limit=4");
        if (res.data.success) {
          setFeaturedProducts(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const navigate = useNavigate();
  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    addToCart,
  } = useContext(ShopContext);

const handleBuyNow = (product) => {
  addToCart(
    {
      id: product._id || product.id,
      name: product.name || product.title,
      price: Number(product.price),
      oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
      image: product.image,
    },
    1
  );

  navigate("/cart");
};
  return (
    <section className="featured-section">

      <div className="container">

        <div className="featured-heading">

          <span>FEATURED COLLECTION</span>

          <h2>Handpicked For You</h2>

          <p>
            Timeless handcrafted jewellery curated for every occasion.
          </p>

        </div>

        <div className="products-grid">
          {loading ? (
            <div>Loading featured products...</div>
          ) : (
            featuredProducts.map((item) => (

            <div className="product-card" key={item._id || item.id}>

              <button
                className="card-heart"
                onClick={() => {
                  const itemId = item._id || item.id;
                  const exists = wishlist.some((p) => p.id === itemId);

                  if (exists) {
                    removeFromWishlist(itemId);
                  } else {
                    addToWishlist({
                      id: itemId,
                      name: item.name || item.title,
                      price: Number(item.price),
                      oldPrice: item.oldPrice ? Number(item.oldPrice) : null,
                      image: item.image,
                    });
                  }
                }}
              >
                {wishlist.some((p) => p.id === (item._id || item.id))? (
                  <FaHeart className="heart-active" />
                ) : (
                  <FaRegHeart />
                )}
              </button>

              <div className="product-image">
                <img src={item.image} alt={item.name || item.title} />
              </div>

              <div className="product-content">

                <h3>{item.name || item.title}</h3>

                <div className="card-rating">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>

<div className="product-bottom">

  <div className="card-price">

    <span className="new-price">
      ₹{item.price}
    </span>

    {item.oldPrice && (
      <del className="old-price">
        ₹{item.oldPrice}
      </del>
    )}

  </div>

 <button
  className="buy-btn"
  onClick={() => handleBuyNow(item)}
>
  
  Shop Now
</button>

</div>



               

              </div>

            </div>
          ))
          )}
        </div>

        <div className="view-all">

          <button
    onClick={() => navigate("/shop")}
>
    View All Products
    <FaArrowRight />
</button>

        </div>

      </div>

    </section>
  );
};

export default FeaturedProducts;