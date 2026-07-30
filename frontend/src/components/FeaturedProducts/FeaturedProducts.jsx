import "./FeaturedProducts.css";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useContext } from "react";
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

const products = [
  {
    id: 1,
    image: thumb1,
    title: "Pearl Necklace",
    price: "₹999",
    oldPrice: "₹1299",
  },
  {
    id: 2,
    image: thumb2,
    title: "Rose Bracelet",
    price: "₹699",
    oldPrice: "₹899",
  },
  {
    id: 3,
    image: thumb3,
    title: "Luxury Ring",
    price: "₹899",
    oldPrice: "₹1199",
  },
  {
    id: 4,
    image: thumb4,
    title: "Pearl Earrings",
    price: "₹799",
    oldPrice: "₹999",
  },
];

const FeaturedProducts = () => {

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
      id: product.id,
      name: product.title,
      price: Number(product.price.replace("₹", "")),
      oldPrice: Number(product.oldPrice.replace("₹", "")),
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

          {products.map((item) => (

            <div className="product-card" key={item.id}>

              <button
                className="card-heart"
                onClick={() => {
  const exists = wishlist.some((p) => p.id === item.id);

  if (exists) {
    removeFromWishlist(item.id);
  } else {
    addToWishlist({
      id: item.id,
      name: item.title,
      price: Number(item.price.replace("₹", "")),
      oldPrice: Number(item.oldPrice.replace("₹", "")),
      image: item.image,
    });
  }
}}
              >
                {wishlist.some((p) => p.id === item.id)? (
                  <FaHeart className="heart-active" />
                ) : (
                  <FaRegHeart />
                )}
              </button>

              <div className="product-image">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="product-content">

                <h3>{item.title}</h3>

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
      {item.price}
    </span>

    <del className="old-price">
      {item.oldPrice}
    </del>

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

          ))}

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