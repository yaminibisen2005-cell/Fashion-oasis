import React, { useState } from "react";
import { FaSave, FaStore, FaCreditCard, FaTruck, FaEnvelope, FaShareAlt, FaFileContract } from "react-icons/fa";

const SettingsSection = ({ settings, updateSettings }) => {
  const [activeTab, setActiveTab] = useState("General");
  const [formData, setFormData] = useState({ ...settings });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const tabs = [
    { name: "General", icon: <FaStore /> },
    { name: "Payment", icon: <FaCreditCard /> },
    { name: "Shipping", icon: <FaTruck /> },
    { name: "Email", icon: <FaEnvelope /> },
    { name: "Social Media", icon: <FaShareAlt /> },
    { name: "Store Policy", icon: <FaFileContract /> },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2000);
  };

  return (
    <div className="admin-settings-view">
      <div className="section-title-row">
        <div>
          <h2>Settings</h2>
          <p className="subtitle">Configure and inspect your store details.</p>
        </div>
      </div>

      <div className="settings-wrapper-card">
        {/* Inner Sidebar tabs */}
        <div className="settings-sidebar">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`settings-tab-btn ${activeTab === tab.name ? "active" : ""}`}
              onClick={() => setActiveTab(tab.name)}
              type="button"
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Form container */}
        <div className="settings-form-container">
          <form onSubmit={handleSaveSubmit}>
            {activeTab === "General" ? (
              <div className="settings-form-tab fade-in">
                <h3>General Settings</h3>
                <div className="settings-form-grid">
                  <div className="form-group">
                    <label>Store Name</label>
                    <input
                      type="text"
                      name="storeName"
                      value={formData.storeName}
                      onChange={handleInputChange}
                      placeholder="e.g. Fashion Oasis"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Store Logo Subtitle / Initials</label>
                    <div className="logo-preview-row">
                      <div className="logo-badge-mock">{formData.storeLogo || "FO"}</div>
                      <input
                        type="text"
                        name="storeLogo"
                        value={formData.storeLogo}
                        onChange={handleInputChange}
                        placeholder="Initials, e.g. FO"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Store Support Email</label>
                    <input
                      type="email"
                      name="storeEmail"
                      value={formData.storeEmail}
                      onChange={handleInputChange}
                      placeholder="e.g. info@fashionoasis.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Contact Number</label>
                    <input
                      type="text"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98765 43210"
                      required
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="settings-form-tab fade-in">
                <h3>{activeTab} Settings</h3>
                <p className="text-muted py-4 text-center">
                  Settings configurations for '{activeTab}' are active and set to standard merchant sandbox profiles.
                </p>
              </div>
            )}

            <div className="settings-action-row">
              {saveSuccess && (
                <span className="save-success-msg">✓ Changes saved successfully!</span>
              )}
              <button type="submit" className="admin-btn-primary save-btn">
                <FaSave /> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
