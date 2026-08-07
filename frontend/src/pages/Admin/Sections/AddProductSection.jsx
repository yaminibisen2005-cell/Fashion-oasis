import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUpload, FaChevronLeft } from "react-icons/fa";

const AddProductSection = ({ addProduct, categories }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    material: "Gold Plated",
    price: "",
    stock: "",
    description: "",
    image: "", 
  });
  const [mediaFiles, setMediaFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setMediaFiles(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.material || !formData.price || !formData.stock) {
      alert("Please fill in all required fields.");
      return;
    }

    const newProduct = new FormData();
    newProduct.append('name', formData.name);
    newProduct.append('category', formData.category);
    newProduct.append('material', formData.material);
    newProduct.append('price', formData.price);
    newProduct.append('stock', formData.stock);
    newProduct.append('description', formData.description);
    if (formData.image) newProduct.append('image', formData.image);
    newProduct.append('status', 'Active');
    
    mediaFiles.forEach(file => {
      newProduct.append('images', file);
    });

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
                <label>Material <span className="text-danger">*</span></label>
                <select
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  required
                >
                  <option value="Gold Plated">Gold Plated</option>
                  <option value="Rose Gold">Rose Gold</option>
                  <option value="Silver">Silver</option>
                  <option value="Pearl">Pearl</option>
                  <option value="Diamond">Diamond</option>
                  <option value="Kundan">Kundan</option>
                </select>
              </div>
            </div>

            <div className="form-row-2">
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
            </div>

            <div className="form-group full-width">
              <label>Image URL (Optional)</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
              />
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
            <div className="upload-box" onClick={() => document.getElementById('file-upload').click()} style={{ cursor: 'pointer' }}>
              <FaUpload className="upload-icon" />
              <span>+ Upload Images</span>
              <p>You can upload up to 5 images</p>
            </div>
            <input 
              id="file-upload" 
              type="file" 
              multiple 
              accept="image/*" 
              style={{ display: 'none' }} 
              onChange={handleFileChange} 
            />
            {mediaFiles.length > 0 && (
              <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
                {mediaFiles.length} file(s) selected
              </div>
            )}
            
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
