import "./Collections.css";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaArrowRight,
  FaStar,
} from "react-icons/fa";

const Collections = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Featured");

  // Handle category from URL query parameter
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      // Map slug to category name
      const categoryMap = {
        earrings: "Earrings",
        necklaces: "Necklaces",
        bracelets: "Bracelets",
        gifts: "Gift Items",
        accessories: "Accessories",
        personalized: "Personalized Gifts",
      };
      setSelectedCategory(categoryMap[categoryParam] || "All");
    }
  }, [searchParams]);

  const categories = [
    "All",
    "Earrings",
    "Necklaces",
    "Bracelets",
    "Rings",
    "Accessories",
    "Gift Items",
    "Personalized Gifts",
  ];

  const sortOptions = [
    "Featured",
    "Price Low to High",
    "Price High to Low",
    "New Arrivals",
    "Best Sellers",
  ];

  const products = [
    {
      id: 1,
      name: "Rose Gold Diamond Earrings",
      price: 2999,
      rating: 4.8,
      category: "Earrings",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
    },
    {
      id: 2,
      name: "Pearl Pendant Necklace",
      price: 4599,
      rating: 4.9,
      category: "Necklaces",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
    },
    {
      id: 3,
      name: "Crystal Bracelet Set",
      price: 1899,
      rating: 4.7,
      category: "Bracelets",
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=80",
    },
    {
      id: 4,
      name: "Sapphire Ring",
      price: 5999,
      rating: 5.0,
      category: "Rings",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80",
    },
    {
      id: 5,
      name: "Gold Chain Bracelet",
      price: 3299,
      rating: 4.6,
      category: "Bracelets",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80",
    },
    {
      id: 6,
      name: "Diamond Stud Earrings",
      price: 7999,
      rating: 4.9,
      category: "Earrings",
      image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=400&q=80",
    },
    {
      id: 7,
      name: "Vintage Brooch",
      price: 2499,
      rating: 4.5,
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
    },
    {
      id: 8,
      name: "Engraved Locket",
      price: 3899,
      rating: 4.8,
      category: "Personalized Gifts",
      image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&q=80",
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortProducts = (productsToSort) => {
    switch (sortBy) {
      case "Price Low to High":
        return [...productsToSort].sort((a, b) => a.price - b.price);
      case "Price High to Low":
        return [...productsToSort].sort((a, b) => b.price - a.price);
      case "New Arrivals":
        return [...productsToSort].reverse();
      case "Best Sellers":
        return [...productsToSort].sort((a, b) => b.rating - a.rating);
      default:
        return productsToSort;
    }
  };

  const displayedProducts = sortProducts(filteredProducts);

  return (
    <>
      <Navbar />
      <section className="collections-page">
        {/* Hero Banner */}
        <div className="collections-hero">
          <div className="collections-hero-bg">
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80"
              alt="Collections"
            />
          </div>
          <div className="collections-hero-overlay"></div>
          <div className="container collections-hero-content">
            <h1>Explore Our Collections</h1>
            <p>
              Discover timeless handcrafted jewellery made with love.
            </p>
          </div>
        </div>

        <div className="container collections-content">
          {/* Category Filter */}
          <div className="category-filter">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search and Sort */}
          <div className="search-sort-bar">
            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="sort-box">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="products-grid">
            {displayedProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <button className="wishlist-btn">
                    <FaHeart />
                  </button>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <div className="product-rating">
                    <FaStar />
                    <span>{product.rating}</span>
                  </div>
                  <div className="product-price">₹{product.price.toLocaleString()}</div>
                  <div className="product-actions">
                    <button
                      className="view-details-btn"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      View Details
                      <FaArrowRight />
                    </button>
                    <button className="add-to-cart-btn">
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {displayedProducts.length === 0 && (
            <div className="no-products">
              <p>No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Collections;
