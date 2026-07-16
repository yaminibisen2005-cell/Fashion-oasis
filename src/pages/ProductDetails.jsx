import "./ProductDetails.css";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import {
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaArrowLeft,
  FaShareAlt,
} from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const products = [
    {
      id: 1,
      name: "Rose Gold Diamond Earrings",
      price: 2999,
      rating: 4.8,
      reviews: 124,
      category: "Earrings",
      description:
        "Elegant rose gold diamond earrings featuring brilliant-cut diamonds in a classic design. Perfect for special occasions and everyday wear. Handcrafted with precision and love.",
      images: [
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
        "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=600&q=80",
        "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&q=80",
      ],
    },
    {
      id: 2,
      name: "Pearl Pendant Necklace",
      price: 4599,
      rating: 4.9,
      reviews: 89,
      category: "Necklaces",
      description:
        "A stunning pearl pendant necklace crafted with freshwater pearls and gold plating. This timeless piece adds elegance to any outfit, making it perfect for both casual and formal occasions.",
      images: [
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
        "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=80",
        "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80",
      ],
    },
    {
      id: 3,
      name: "Crystal Bracelet Set",
      price: 1899,
      rating: 4.7,
      reviews: 156,
      category: "Bracelets",
      description:
        "A beautiful crystal bracelet set featuring sparkling crystals in a delicate design. Each bracelet is handcrafted to ensure quality and durability. Perfect for gifting or treating yourself.",
      images: [
        "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80",
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
        "https://images.unsplash.com/photo-1573408301185-9146fe634ad1?w=600&q=80",
      ],
    },
    {
      id: 4,
      name: "Sapphire Ring",
      price: 5999,
      rating: 5.0,
      reviews: 67,
      category: "Rings",
      description:
        "A magnificent sapphire ring featuring a deep blue sapphire surrounded by brilliant diamonds. This exquisite piece is perfect for engagements, anniversaries, or as a statement piece for special occasions.",
      images: [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
        "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=80",
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
      ],
    },
    {
      id: 5,
      name: "Gold Chain Bracelet",
      price: 3299,
      rating: 4.6,
      reviews: 98,
      category: "Bracelets",
      description:
        "A classic gold chain bracelet with a modern twist. Crafted from high-quality materials, this bracelet is durable and stylish. Perfect for layering or wearing alone as a statement piece.",
      images: [
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
        "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80",
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
      ],
    },
    {
      id: 6,
      name: "Diamond Stud Earrings",
      price: 7999,
      rating: 4.9,
      reviews: 203,
      category: "Earrings",
      description:
        "Luxurious diamond stud earrings featuring brilliant-cut diamonds in a classic four-prong setting. These timeless earrings are perfect for everyday elegance and special occasions alike.",
      images: [
        "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=600&q=80",
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
        "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&q=80",
      ],
    },
    {
      id: 7,
      name: "Vintage Brooch",
      price: 2499,
      rating: 4.5,
      reviews: 45,
      category: "Accessories",
      description:
        "A beautiful vintage-inspired brooch featuring intricate detailing and sparkling crystals. Perfect for adding a touch of elegance to jackets, dresses, or accessories.",
      images: [
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
        "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=80",
      ],
    },
    {
      id: 8,
      name: "Engraved Locket",
      price: 3899,
      rating: 4.8,
      reviews: 78,
      category: "Personalized Gifts",
      description:
        "A sentimental engraved locket perfect for keeping cherished photos close. Features beautiful engraving and a secure clasp. An ideal gift for anniversaries, birthdays, or special memories.",
      images: [
        "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=80",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
      ],
    },
  ];

  const product = products.find((p) => p.id === parseInt(id));

  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="product-not-found">
          <h2>Product Not Found</h2>
          <button onClick={() => navigate("/collections")}>
            Back to Collections
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="product-details-page">
        <div className="container">
          {/* Back Button */}
          <button className="back-btn" onClick={() => navigate("/collections")}>
            <FaArrowLeft />
            Back to Collections
          </button>

          <div className="product-details-content">
            {/* Product Gallery */}
            <div className="product-gallery">
              <div className="main-image">
                <img src={product.images[selectedImage]} alt={product.name} />
              </div>
              <div className="thumbnail-gallery">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${
                      selectedImage === index ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="product-info-section">
              <div className="product-header">
                <h1>{product.name}</h1>
                <div className="product-rating">
                  <FaStar />
                  <span>{product.rating}</span>
                  <span className="reviews">({product.reviews} reviews)</span>
                </div>
              </div>

              <div className="product-price-section">
                <div className="price">₹{product.price.toLocaleString()}</div>
                <div className="category-badge">{product.category}</div>
              </div>

              <div className="product-description">
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>

              <div className="quantity-selector">
                <h3>Quantity</h3>
                <div className="quantity-controls">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              <div className="product-actions">
                <button className="add-to-cart-btn">
                  <FaShoppingCart />
                  Add to Cart
                </button>
                <button className="wishlist-btn">
                  <FaHeart />
                  Add to Wishlist
                </button>
                <button className="share-btn">
                  <FaShareAlt />
                  Share
                </button>
              </div>

              <div className="product-features">
                <div className="feature">
                  <div className="feature-icon">✓</div>
                  <span>Free Shipping</span>
                </div>
                <div className="feature">
                  <div className="feature-icon">✓</div>
                  <span>30-Day Returns</span>
                </div>
                <div className="feature">
                  <div className="feature-icon">✓</div>
                  <span>Certificate of Authenticity</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="related-products-section">
              <h2>Related Products</h2>
              <div className="related-products-grid">
                {relatedProducts.map((relatedProduct) => (
                  <div
                    key={relatedProduct.id}
                    className="related-product-card"
                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  >
                    <div className="related-product-image">
                      <img
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                      />
                    </div>
                    <div className="related-product-info">
                      <h3>{relatedProduct.name}</h3>
                      <div className="related-product-price">
                        ₹{relatedProduct.price.toLocaleString()}
                      </div>
                      <div className="related-product-rating">
                        <FaStar />
                        <span>{relatedProduct.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductDetails;
