import "./Sidebar.css";
import { products as allProducts } from "../../../data/products";

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
}) {
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
          <span>₹{priceRange[1]}+</span>
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

      {/* Clear Filters */}
      <button className="clear-filters-btn" onClick={onClearFilters}>
        Clear All Filters
      </button>

    </aside>
  );
}