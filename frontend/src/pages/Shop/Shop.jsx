import { useState, useMemo, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import "./Shop.css";

import HeroBanner from "../../components/Shop/HeroBanner/HeroBanner";
import Sidebar from "../../components/Shop/Sidebar/Sidebar";
import SearchSort from "../../components/Shop/SearchSort/SearchSort";
import ProductGrid from "../../components/Shop/ProductGrid/ProductGrid";
import Pagination from "../../components/Shop/Pagination/Pagination";

// import { products } from "../../data/products"; // Removed hardcoded products
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function Shop() {
  const shopContentRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("Popularity");
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  // Read URL query parameters on mount and when they change
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const filterParam = searchParams.get('filter');

    if (categoryParam) {
      const knownCategories = ["Necklace", "Earrings", "Rings", "Bracelets", "Mangalsutra", "Wedding"];
      const matched = knownCategories.find(
        (cat) => cat.toLowerCase() === categoryParam.trim().toLowerCase()
      );
      setSelectedCategory(matched || categoryParam);
    }

    if (filterParam === 'best-sellers') {
      setSortBy('Popularity');
    } else if (filterParam === 'new-arrivals') {
      setSortBy('Newest');
    }
  }, [searchParams]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Assuming we fetch all products for the shop page for client-side filtering, 
        // or we could adjust the limit. For now, fetch up to 100 to allow local filters to work.
        const res = await axios.get("http://localhost:5000/api/v1/products?limit=100");
        if (res.data.success) {
          setProducts(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter - strict case-insensitive match to prevent substring overlaps (e.g. Rings vs Earrings)
    if (selectedCategory !== "All Products") {
      result = result.filter(
        (item) => item.category && item.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
      );
    }

    // Search filter
    if (searchTerm) {
      result = result.filter(item =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price range filter
    result = result.filter(item => item.price >= priceRange[0] && item.price <= priceRange[1]);

    // Material filter (OR logic within category)
    if (selectedMaterials.length > 0) {
      result = result.filter(item => selectedMaterials.includes(item.material));
    }

    // Occasion filter (OR logic within category)
    if (selectedOccasions.length > 0) {
      result = result.filter(item => selectedOccasions.includes(item.occasion));
    }

    // Sort
    if (sortBy === "Price Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price High to Low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "Newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "Popularity") {
      result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }

    return result;
  }, [searchTerm, selectedCategory, sortBy, priceRange, selectedMaterials, selectedOccasions]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  // Update filter setters to reset page
  const handleSetSearchTerm = (value) => {
    setSearchTerm(value);
    handleFilterChange();
  };

  const handleSetSelectedCategory = (value) => {
    setSelectedCategory(value);
    handleFilterChange();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Smooth scroll to top of shop content
    if (shopContentRef.current) {
      shopContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSetSortBy = (value) => {
    setSortBy(value);
    handleFilterChange();
  };

  const handleSetPriceRange = (value) => {
    setPriceRange(value);
    handleFilterChange();
  };

  const handleSetSelectedMaterials = (value) => {
    setSelectedMaterials(value);
    handleFilterChange();
  };

  const handleSetSelectedOccasions = (value) => {
    setSelectedOccasions(value);
    handleFilterChange();
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Products");
    setSortBy("Popularity");
    setPriceRange([0, 200000]);
    setSelectedMaterials([]);
    setSelectedOccasions([]);
    setCurrentPage(1);
  };

  return (
    <div className="shop-page">
      <Navbar/>
      <HeroBanner/>
      <div className="shop-layout">
        <Sidebar
          products={products}
          selectedCategory={selectedCategory}
          setSelectedCategory={handleSetSelectedCategory}
          priceRange={priceRange}
          setPriceRange={handleSetPriceRange}
          selectedMaterials={selectedMaterials}
          setSelectedMaterials={handleSetSelectedMaterials}
          selectedOccasions={selectedOccasions}
          setSelectedOccasions={handleSetSelectedOccasions}
          onClearFilters={clearFilters}
        />
        <div className="shop-content" ref={shopContentRef}>
          <SearchSort
            searchTerm={searchTerm}
            setSearchTerm={handleSetSearchTerm}
            sortBy={sortBy}
            setSortBy={handleSetSortBy}
            totalProducts={filteredProducts.length}
            onClearFilters={clearFilters}
            hasActiveFilters={selectedMaterials.length > 0 || selectedOccasions.length > 0 || priceRange[0] !== 0 || priceRange[1] !== 200000}
          />
          {loading ? (
            <div className="loading-spinner">Loading products...</div>
          ) : (
            <>
              <ProductGrid products={currentProducts} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
         
          
        </div>
      </div>
       <Footer/>
    </div>
  );
}