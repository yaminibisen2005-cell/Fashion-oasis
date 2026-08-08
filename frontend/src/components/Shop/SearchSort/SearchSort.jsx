import "./SearchSort.css";
import { FiSearch, FiX, FiSliders } from "react-icons/fi";

const SearchSort = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  totalProducts,
  onClearFilters,
  hasActiveFilters,
  onOpenMobileFilter,
}) => {
  return (
    <div className="shop-toolbar">

      <div className="toolbar-left">

        <div className="search-box">
          <FiSearch className="search-icon" />

          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search jewellery..."
          />
          {searchTerm && (
            <button className="clear-search-btn" onClick={() => setSearchTerm("")}>
              <FiX />
            </button>
          )}
        </div>

      </div>

      <div className="toolbar-right">

        <button
          className="mobile-filter-trigger-btn"
          onClick={onOpenMobileFilter}
          type="button"
        >
          <FiSliders className="filter-trigger-icon" />
          <span>Filter</span>
        </button>

        <div className="sort-box">

          <label className="sort-label">Sort by:</label>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option>Popularity</option>
            <option>Newest</option>
            <option>Price Low to High</option>
            <option>Price High to Low</option>
          </select>

        </div>

        <span className="product-count">
          {totalProducts} Products
        </span>

        {hasActiveFilters && (
          <button className="clear-filters-link" onClick={onClearFilters}>
            Clear
          </button>
        )}

      </div>

    </div>
  );
};

export default SearchSort;