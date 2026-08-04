import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaPlus, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const ProductsSection = ({ products, deleteProduct, toggleProductStatus, pagination, setPage }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-products-view">
      <div className="section-title-row">
        <div>
          <h2>Products Overview</h2>
          <p className="subtitle">Manage and inspect your luxury catalog items.</p>
        </div>
        <button
          className="admin-btn-primary"
          onClick={() => navigate("/admin/add-product")}
        >
          <FaPlus /> Add Product
        </button>
      </div>

      <div className="table-controls-card">
        <div className="search-box-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  No products found.
                </td>
              </tr>
            ) : (
              filteredProducts.map((prod) => (
                <tr key={prod._id}>
                  <td>
                    <div className="tbl-product-cell">
                      <img src={prod.image} alt={prod.name} />
                      <strong>{prod.name}</strong>
                    </div>
                  </td>
                  <td>{prod.category}</td>
                  <td>₹{prod.price.toLocaleString()}</td>
                  <td>{prod.stock}</td>
                  <td>
                    <span
                      className={`status-badge-inline ${
                        prod.status === "Active" ? "active" : "inactive"
                      }`}
                      onClick={() => toggleProductStatus(prod._id)}
                      title="Click to toggle status"
                      style={{ cursor: "pointer" }}
                    >
                      {prod.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="tbl-action-btn delete"
                      onClick={() => deleteProduct(prod._id)}
                      title="Delete Product"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '10px' }}>
          <button 
            className="admin-btn-secondary" 
            disabled={pagination.currentPage === 1}
            onClick={() => setPage(pagination.currentPage - 1)}
            style={{ padding: '8px 16px', borderRadius: '4px', cursor: pagination.currentPage === 1 ? 'not-allowed' : 'pointer' }}
          >
            Previous
          </button>
          <span style={{ padding: '8px 16px' }}>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button 
            className="admin-btn-secondary" 
            disabled={pagination.currentPage === pagination.totalPages}
            onClick={() => setPage(pagination.currentPage + 1)}
            style={{ padding: '8px 16px', borderRadius: '4px', cursor: pagination.currentPage === pagination.totalPages ? 'not-allowed' : 'pointer' }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsSection;
