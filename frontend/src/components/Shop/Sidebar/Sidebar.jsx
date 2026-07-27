import "./Sidebar.css";

const categories = [
  { name: "All Products", count: 12 },
  { name: "Necklace", count: 3 },
  { name: "Earrings", count: 3 },
  { name: "Rings", count: 2 },
  { name: "Bracelets", count: 2 },
  { name: "Mangalsutra", count: 1 },
  { name: "Wedding", count: 1 },
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
    setPriceRange([499, value]);
  };

  return (
    <aside className="shop-sidebar">

      {/* Categories */}
      <div className="filter-card">

        <h4>Categories</h4>

        <ul className="category-list">

          {categories.map((item) => (
            <li
  key={item.name}
  className={
    selectedCategory === item.name ? "active" : ""
  }
  onClick={() => setSelectedCategory(item.name)}
>
              <span>{item.name}</span>

              <span className="count">
                {item.count}
              </span>
            </li>
          ))}

        </ul>

      </div>

      {/* Price */}

      <div className="filter-card">

        <h4>Price Range</h4>

        <input
          type="range"
          min="499"
          max="5000"
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
  );
}