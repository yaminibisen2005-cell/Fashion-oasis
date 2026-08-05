import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUpload, FaChevronLeft } from "react-icons/fa";

const AddProductSection = ({ addProduct, categories }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80", // Default Unsplash placeholder
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.price || !formData.stock) {
      alert("Please fill in all required fields.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      description: formData.description,
      image: formData.image,
      status: "Active",
    };

    addProduct(newProduct);
    navigate("/admin/products");
  };

  return (
    <div className="admin-add-product-view">
      <div className="section-title-row">
        <div>
          <button className="back-nav-btn" onClick={() => navigate("/admin/products")}>
            <FaChevronLeft /> Back to Products
          </button>
          <h2>Add New Product</h2>
          <p className="subtitle">Expand your luxury jewellery catalog.</p>
        </div>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-left-col">
            <div className="form-group full-width">
              <label>Product Name <span className="text-danger">*</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Floral Diamond Necklace"
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Category <span className="text-danger">*</span></label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Price (₹) <span className="text-danger">*</span></label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 125000"
                  min="0"
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Stock Count <span className="text-danger">*</span></label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 25"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Image URL (Optional)</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                name="description"
                rows="5"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter item description, metal types, diamonds details..."
              ></textarea>
            </div>
          </div>

          {/* Right Column - Images Upload Box */}
          <div className="form-right-col">
            <label>Product Images</label>
            <div className="upload-box">
              <FaUpload className="upload-icon" />
              <span>+ Upload Images</span>
              <p>You can upload up to 5 images</p>
            </div>
            
            <div className="form-actions-row">
              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => navigate("/admin/products")}
              >
                Cancel
              </button>
              <button type="submit" className="admin-btn-primary">
                Save Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductSection;
