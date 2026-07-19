import "./SearchSort.css";
import { FiSearch } from "react-icons/fi";

const SearchSort = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  totalProducts,
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
        </div>

      </div>

      <div className="toolbar-right">

        <div className="sort-box">

          <label>Sort by:</label>

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
          Showing {totalProducts} Products
        </span>

      </div>

    </div>
  );
};

export default SearchSort;