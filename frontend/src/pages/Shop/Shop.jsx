import { useState, useMemo, useRef } from "react";

import "./Shop.css";

import HeroBanner from "../../components/Shop/HeroBanner/HeroBanner";
import Sidebar from "../../components/Shop/Sidebar/Sidebar";
import SearchSort from "../../components/Shop/SearchSort/SearchSort";
import ProductGrid from "../../components/Shop/ProductGrid/ProductGrid";
import Pagination from "../../components/Shop/Pagination/Pagination";

import { products } from "../../data/products";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function Shop() {
  const shopContentRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("Popularity");
  const [priceRange, setPriceRange] = useState([499, 5000]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== "All Products") {
      result = result.filter(item => item.category === selectedCategory);
    }

    // Search filter
    if (searchTerm) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      result.sort((a, b) => b.id - a.id);
    } else if (sortBy === "Popularity") {
      result.sort((a, b) => b.reviews - a.reviews);
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
    setPriceRange([499, 5000]);
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
            hasActiveFilters={selectedMaterials.length > 0 || selectedOccasions.length > 0 || priceRange[0] !== 499 || priceRange[1] !== 5000}
          />
          <ProductGrid products={currentProducts} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
         
          
        </div>
      </div>
       <Footer/>
    </div>
  );
}