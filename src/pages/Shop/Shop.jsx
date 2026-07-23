import { useState, useMemo } from "react";

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

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("Popularity");
  const [priceRange, setPriceRange] = useState([499, 5000]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);

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

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Products");
    setSortBy("Popularity");
    setPriceRange([499, 5000]);
    setSelectedMaterials([]);
    setSelectedOccasions([]);
  };

  return (
    <div className="shop-page">
      <Navbar/>
      <HeroBanner/>
      <div className="shop-layout">
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedMaterials={selectedMaterials}
          setSelectedMaterials={setSelectedMaterials}
          selectedOccasions={selectedOccasions}
          setSelectedOccasions={setSelectedOccasions}
          onClearFilters={clearFilters}
        />
        <div className="shop-content">
          <SearchSort
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
            totalProducts={filteredProducts.length}
            onClearFilters={clearFilters}
            hasActiveFilters={selectedMaterials.length > 0 || selectedOccasions.length > 0 || priceRange[0] !== 499 || priceRange[1] !== 5000}
          />
          <ProductGrid products={filteredProducts} />
          <Pagination/>
         
          
        </div>
      </div>
       <Footer/>
    </div>
  );
}