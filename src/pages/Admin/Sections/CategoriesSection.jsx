import React, { useState } from "react";
import { FaPlus, FaTrash, FaTimes } from "react-icons/fa";

const CategoriesSection = ({ categories, addCategory, deleteCategory, toggleCategoryStatus }) => {
  const [showModal, setShowModal] = useState(false);
  const [newCatName, setNewCatName] = useState("");

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const newCategory = {
      name: newCatName.trim(),
      productsCount: 0,
      status: "Active",
    };

    addCategory(newCategory);
    setNewCatName("");
    setShowModal(false);
  };

  return (
    <div className="admin-categories-view">
      <div className="section-title-row">
        <div>
          <h2>Categories</h2>
          <p className="subtitle">Classify and organize your luxury collection lines.</p>
        </div>
        <button className="admin-btn-primary" onClick={() => setShowModal(true)}>
          <FaPlus /> Add Category
        </button>
      </div>

      <div className="table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Products Count</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, idx) => (
              <tr key={idx}>
                <td><strong>{cat.name}</strong></td>
                <td>{cat.productsCount}</td>
                <td>
                  <span
                    className={`status-badge-inline ${
                      cat.status === "Active" ? "active" : "inactive"
                    }`}
                    onClick={() => toggleCategoryStatus(cat.name)}
                    style={{ cursor: "pointer" }}
                    title="Click to toggle status"
                  >
                    {cat.status}
                  </span>
                </td>
                <td>
                  <button
                    className="tbl-action-btn delete"
                    onClick={() => deleteCategory(cat.name)}
                    title="Delete Category"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Category Modal Dialog */}
      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box fade-in">
            <div className="modal-header">
              <h3>Add New Category</h3>
              <button className="close-modal-btn" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="modal-form">
              <div className="form-group">
                <label>Category Name</label>
                <input
                  type="text"
                  placeholder="e.g. Bracelets, Jewellery Sets"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="admin-btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesSection;
