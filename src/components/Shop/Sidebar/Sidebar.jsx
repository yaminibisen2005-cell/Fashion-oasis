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
}) {
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

        <input type="range" />

        <div className="price-values">

          <span>₹499</span>

          <span>₹5000+</span>

        </div>

      </div>

      {/* Material */}

      <div className="filter-card">

        <h4>Material</h4>

        {materials.map((item) => (

          <label className="check-item" key={item}>

            <input type="checkbox" />

            <span>{item}</span>

          </label>

        ))}

      </div>

      {/* Occasion */}

      <div className="filter-card">

        <h4>Occasion</h4>

        {occasions.map((item) => (

          <label className="check-item" key={item}>

            <input type="checkbox" />

            <span>{item}</span>

          </label>

        ))}

      </div>

    </aside>
  );
}