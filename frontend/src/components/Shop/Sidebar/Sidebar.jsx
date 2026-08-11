import { useState } from "react";
import "./Sidebar.css";
import { products as allProducts } from "../../../data/products";
import { FiArrowLeft } from "react-icons/fi";

const defaultCategoryNames = [
  "All Products",
  "Necklace",
  "Earrings",
  "Rings",
  "Bracelets",
  "Mangalsutra",
  "Wedding",
];

const materials = [
  "Gold Plated",
  "Rose Gold",
  "Silver",
  "Pearl",
  "Diamond",
  "Kundan",
];

const occasions = [
  "Daily Wear",
  "Party Wear",
  "Wedding",
  "Festive",
  "Gift",
];

export default function Sidebar({
  products = [],
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  selectedMaterials,
  setSelectedMaterials,
  selectedOccasions,
  setSelectedOccasions,
  onClearFilters,
  isMobileFilterOpen,
  setIsMobileFilterOpen,
}) {
  const [activeTab, setActiveTab] = useState("Categories");

  const activeProducts = products && products.length > 0 ? products : allProducts;

  const categoryCounts = activeProducts.reduce((acc, product) => {
    if (product.category) {
      acc[product.category] = (acc[product.category] || 0) + 1;
    }
    return acc;
  }, {});

  const dynamicCategories = [
    { name: "All Products", count: activeProducts.length },
    ...defaultCategoryNames.filter(name => name !== "All Products").map(cat => ({
      name: cat,
      count: categoryCounts[cat] || activeProducts.filter(p => p.category && p.category.trim().toLowerCase() === cat.trim().toLowerCase()).length
    }))
  ];

  const handleMaterialToggle = (material) => {
    setSelectedMaterials(prev =>
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  const handleOccasionToggle = (occasion) => {
    setSelectedOccasions(prev =>
      prev.includes(occasion)
        ? prev.filter(o => o !== occasion)
        : [...prev, occasion]
    );
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange([0, value]);
  };

  return (
    <>
      <aside className="shop-sidebar">

        {/* Categories */}
        <div className="filter-card">
          <h4>Categories</h4>
          <ul className="category-list">
            {dynamicCategories.map((item) => (
              <li
                key={item.name}
                className={selectedCategory === item.name ? "active" : ""}
                onClick={() => setSelectedCategory(item.name)}
              >
                <span>{item.name}</span>
                <span className="count">{item.count}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price */}
        <div className="filter-card">
          <h4>Price Range</h4>
          <input
            type="range"
            min="0"
            max="200000"
            value={priceRange[1]}
            onChange={handlePriceChange}
          />
          <div className="price-values">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1].toLocaleString()}+</span>
          </div>
        </div>

        {/* Material */}
        <div className="filter-card">
          <h4>Material</h4>
          {materials.map((item) => (
            <label className="check-item" key={item}>
              <input
                type="checkbox"
                checked={selectedMaterials.includes(item)}
                onChange={() => handleMaterialToggle(item)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>

        {/* Occasion */}
        <div className="filter-card">
          <h4>Occasion</h4>
          {occasions.map((item) => (
            <label className="check-item" key={item}>
              <input
                type="checkbox"
                checked={selectedOccasions.includes(item)}
                onChange={() => handleOccasionToggle(item)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>

        {/* Clear Filters */}
        <button className="clear-filters-btn" onClick={onClearFilters}>
          Clear All Filters
        </button>

      </aside>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="mobile-filter-overlay">
          <div className="mobile-filter-drawer">
            
            {/* Drawer Header */}
            <div className="drawer-header">
              <button
                className="drawer-close-btn"
                onClick={() => setIsMobileFilterOpen(false)}
                type="button"
              >
                <FiArrowLeft size={20} />
                <span>Filters</span>
              </button>

              <button
                className="drawer-clear-btn"
                onClick={onClearFilters}
                type="button"
              >
                Clear All
              </button>
            </div>

            {/* Drawer Body: Left Tabs + Right Content */}
            <div className="drawer-body">
              {/* Left Panel */}
              <div className="drawer-left-panel">
                <button
                  type="button"
                  className={`drawer-tab-btn ${activeTab === "Categories" ? "active" : ""}`}
                  onClick={() => setActiveTab("Categories")}
                >
                  Categories
                  {selectedCategory !== "All Products" && <span className="tab-indicator">•</span>}
                </button>

                <button
                  type="button"
                  className={`drawer-tab-btn ${activeTab === "Price" ? "active" : ""}`}
                  onClick={() => setActiveTab("Price")}
                >
                  Price
                  {priceRange[1] < 200000 && <span className="tab-indicator">•</span>}
                </button>

                <button
                  type="button"
                  className={`drawer-tab-btn ${activeTab === "Material" ? "active" : ""}`}
                  onClick={() => setActiveTab("Material")}
                >
                  Material
                  {selectedMaterials.length > 0 && <span className="tab-indicator">({selectedMaterials.length})</span>}
                </button>

                <button
                  type="button"
                  className={`drawer-tab-btn ${activeTab === "Occasion" ? "active" : ""}`}
                  onClick={() => setActiveTab("Occasion")}
                >
                  Occasion
                  {selectedOccasions.length > 0 && <span className="tab-indicator">({selectedOccasions.length})</span>}
                </button>
              </div>

              {/* Right Panel */}
              <div className="drawer-right-panel">
                {activeTab === "Categories" && (
                  <div className="drawer-section">
                    <div className="section-title">Select Category</div>
                    <div className="category-radio-list">
                      {dynamicCategories.map((item) => (
                        <div
                          key={item.name}
                          className={`radio-item ${selectedCategory === item.name ? "selected" : ""}`}
                          onClick={() => setSelectedCategory(item.name)}
                        >
                          <div className="radio-circle">
                            {selectedCategory === item.name && <div className="radio-inner" />}
                          </div>
                          <span className="cat-name">{item.name}</span>
                          <span className="cat-count">({item.count})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "Price" && (
                  <div className="drawer-section">
                    <div className="section-title">Price Range</div>
                    <div className="drawer-price-content">
                      <div className="price-display">
                        <span className="min">₹{priceRange[0]}</span>
                        <span className="max">₹{priceRange[1].toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="200000"
                        value={priceRange[1]}
                        onChange={handlePriceChange}
                        className="mobile-range-slider"
                      />
                      <p className="price-subtext">Max Budget: ₹{priceRange[1].toLocaleString()}</p>
                    </div>
                  </div>
                )}

                {activeTab === "Material" && (
                  <div className="drawer-section">
                    <div className="section-title">Select Material</div>
                    <div className="checkbox-list">
                      {materials.map((item) => (
                        <label className="drawer-check-item" key={item}>
                          <input
                            type="checkbox"
                            checked={selectedMaterials.includes(item)}
                            onChange={() => handleMaterialToggle(item)}
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "Occasion" && (
                  <div className="drawer-section">
                    <div className="section-title">Select Occasion</div>
                    <div className="checkbox-list">
                      {occasions.map((item) => (
                        <label className="drawer-check-item" key={item}>
                          <input
                            type="checkbox"
                            checked={selectedOccasions.includes(item)}
                            onChange={() => handleOccasionToggle(item)}
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sticky Bottom Footer */}
            <div className="drawer-footer">
              <button
                className="apply-filters-btn"
                onClick={() => setIsMobileFilterOpen(false)}
                type="button"
              >
                Apply Filters
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}