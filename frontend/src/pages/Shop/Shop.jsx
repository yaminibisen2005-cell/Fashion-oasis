import { useState, useMemo, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import apiClient from "../../api/client";

import "./Shop.css";

import HeroBanner from "../../components/Shop/HeroBanner/HeroBanner";
import Sidebar from "../../components/Shop/Sidebar/Sidebar";
import SearchSort from "../../components/Shop/SearchSort/SearchSort";
import ProductGrid from "../../components/Shop/ProductGrid/ProductGrid";
import Pagination from "../../components/Shop/Pagination/Pagination";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function Shop() {
  const shopContentRef = useRef(null);
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("Popularity");
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Read URL query parameters on mount and when they change
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const filterParam = searchParams.get('filter');

    if (categoryParam) {
      const categoryMap = [
        { name: "Necklace", aliases: ["necklace", "necklaces"] },
        { name: "Earrings", aliases: ["earring", "earrings", "earings"] },
        { name: "Rings", aliases: ["ring", "rings"] },
        { name: "Bracelets", aliases: ["bracelet", "bracelets", "bengal"] },
        { name: "Mangalsutra", aliases: ["mangalsutra", "mangalsutras"] },
        { name: "Wedding", aliases: ["wedding", "bridal"] },
      ];
      
      const normalizedParam = categoryParam.trim().toLowerCase();
      const matched = categoryMap.find(c => 
        c.name.toLowerCase() === normalizedParam || c.aliases.includes(normalizedParam)
      );

      setSelectedCategory(matched ? matched.name : categoryParam);
    }

    if (filterParam === 'best-sellers') {
      setSortBy('Popularity');
    } else if (filterParam === 'new-arrivals') {
      setSortBy('Newest');
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get("/products?limit=100");
        console.log("[Shop.jsx] API Response:", res.data);
        
        let loadedProducts = [];
        if (res.data?.success && Array.isArray(res.data.data)) {
          loadedProducts = res.data.data;
        } else if (Array.isArray(res.data?.products)) {
          loadedProducts = res.data.products;
        } else if (Array.isArray(res.data)) {
          loadedProducts = res.data;
        }

        console.log("[Shop.jsx] Extracted Products Count:", loadedProducts.length);
        setProducts(loadedProducts);
      } catch (error) {
        console.error("[Shop.jsx] Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory && selectedCategory !== "All Products") {
      result = result.filter((item) => {
        if (!item.category) return false;
        const itemCat = item.category.trim().toLowerCase();
        const selCat = selectedCategory.trim().toLowerCase();
        return itemCat === selCat || itemCat.startsWith(selCat) || selCat.startsWith(itemCat);
      });
    }

    // Search filter
    if (searchTerm) {
      result = result.filter(item =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price range filter
    result = result.filter(item => {
      const price = Number(item.price) || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Material filter
    if (selectedMaterials.length > 0) {
      result = result.filter(item => item.material && selectedMaterials.includes(item.material));
    }

    // Occasion filter
    if (selectedOccasions.length > 0) {
      result = result.filter(item => item.occasion && selectedOccasions.includes(item.occasion));
    }

    // Sort logic
    if (sortBy === "Price Low to High") {
      result.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    } else if (sortBy === "Price High to Low") {
      result.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    } else if (sortBy === "Newest") {
      result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } else if (sortBy === "Popularity") {
      result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }

    console.log("[Shop.jsx] Filtered Products Count:", result.length);
    return result;
  }, [products, searchTerm, selectedCategory, sortBy, priceRange, selectedMaterials, selectedOccasions]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

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
            <div className="loading-spinner" style={{ textAlign: "center", padding: "40px" }}>Loading products...</div>
          ) : (
            <>
              <ProductGrid products={currentProducts} />
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}