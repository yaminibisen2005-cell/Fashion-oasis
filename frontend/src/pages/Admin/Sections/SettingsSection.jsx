import React, { useState } from "react";
import { FaSave, FaStore, FaCreditCard, FaShareAlt, FaFileContract } from "react-icons/fa";

const SettingsSection = ({ settings, updateSettings }) => {
  const [activeTab, setActiveTab] = useState("General");
  const [formData, setFormData] = useState({ ...settings });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const tabs = [
    { name: "General", icon: <FaStore /> },
    { name: "Payment", icon: <FaCreditCard /> },
    { name: "Social Media", icon: <FaShareAlt /> },
    { name: "Store Policy", icon: <FaFileContract /> },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, storeLogo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePolicyFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const ext = file.name.split('.').pop().toLowerCase();
      if (ext !== 'pdf' && ext !== 'doc' && ext !== 'docx') {
        alert("Only PDF and Word (.doc, .docx) formats are supported.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          policyFileName: file.name,
          policyFileData: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
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
            {activeTab === "General" && (
              <div className="settings-form-tab fade-in">
                <h3>General Settings</h3>
                <div className="settings-form-grid">
                  <div className="form-group">
                    <label>Store Name</label>
                    <input
                      type="text"
                      name="storeName"
                      value={formData.storeName || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. Fashion Oasis"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Store Logo</label>
                    <div className="logo-preview-row" style={{ display: 'flex', gap: '15px', alignItems: 'center', marginTop: '5px' }}>
                      <div className="logo-badge-mock" style={{ width: '50px', height: '50px', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFDFE', overflow: 'hidden' }}>
                        {formData.storeLogo ? (
                          <img src={formData.storeLogo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        ) : (
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>No Logo</span>
                        )}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          style={{ border: 'none', padding: 0, background: 'transparent' }}
                        />
                        {formData.storeLogo && (
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, storeLogo: "" }))}
                            style={{ background: 'none', border: 'none', color: '#E74C3C', cursor: 'pointer', fontSize: '11px', textAlign: 'left', fontWeight: '600' }}
                          >
                            Remove Logo
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Store Support Email</label>
                    <input
                      type="email"
                      name="storeEmail"
                      value={formData.storeEmail || ""}
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
                      value={formData.contactNumber || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98765 43210"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Payment" && (
              <div className="settings-form-tab fade-in">
                <h3>Payment Settings</h3>
                <p className="subtitle" style={{ marginBottom: '20px', color: 'var(--text-muted)', fontSize: '13px' }}>
                  Enable or disable customer payment methods at checkout.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
                    <input
                      type="checkbox"
                      name="cardEnabled"
                      checked={formData.cardEnabled !== false}
                      onChange={(e) => setFormData(prev => ({ ...prev, cardEnabled: e.target.checked }))}
                      style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    Enable Credit / Debit Card Payments
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
                    <input
                      type="checkbox"
                      name="upiEnabled"
                      checked={formData.upiEnabled !== false}
                      onChange={(e) => setFormData(prev => ({ ...prev, upiEnabled: e.target.checked }))}
                      style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    Enable UPI Payments (Google Pay, PhonePe, Paytm, etc.)
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
                    <input
                      type="checkbox"
                      name="netbankingEnabled"
                      checked={formData.netbankingEnabled !== false}
                      onChange={(e) => setFormData(prev => ({ ...prev, netbankingEnabled: e.target.checked }))}
                      style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    Enable Net Banking Payments
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
                    <input
                      type="checkbox"
                      name="codEnabled"
                      checked={formData.codEnabled !== false}
                      onChange={(e) => setFormData(prev => ({ ...prev, codEnabled: e.target.checked }))}
                      style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    Enable Cash on Delivery (COD) Payments
                  </label>
                </div>
              </div>
            )}

            {activeTab === "Social Media" && (
              <div className="settings-form-tab fade-in">
                <h3>Social Media Settings</h3>
                <p className="subtitle" style={{ marginBottom: '20px', color: 'var(--text-muted)', fontSize: '13px' }}>
                  Connect your store's social media accounts to display in the footer.
                </p>
                <div className="settings-form-grid">
                  <div className="form-group">
                    <label>Instagram URL</label>
                    <input
                      type="url"
                      name="socialInstagram"
                      value={formData.socialInstagram || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. https://instagram.com/fashionoasis"
                    />
                  </div>

                  <div className="form-group">
                    <label>Facebook URL</label>
                    <input
                      type="url"
                      name="socialFacebook"
                      value={formData.socialFacebook || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. https://facebook.com/fashionoasis"
                    />
                  </div>

                  <div className="form-group">
                    <label>Pinterest URL</label>
                    <input
                      type="url"
                      name="socialPinterest"
                      value={formData.socialPinterest || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. https://pinterest.com/fashionoasis"
                    />
                  </div>

                  <div className="form-group">
                    <label>YouTube URL</label>
                    <input
                      type="url"
                      name="socialYoutube"
                      value={formData.socialYoutube || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. https://youtube.com/fashionoasis"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Store Policy" && (
              <div className="settings-form-tab fade-in">
                <h3>Store Policy Settings</h3>
                <p className="subtitle" style={{ marginBottom: '20px', color: 'var(--text-muted)', fontSize: '13px' }}>
                  Provide your store policies via text or document files.
                </p>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Policy Format Selection</label>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
                      <input
                        type="radio"
                        name="policyType"
                        value="text"
                        checked={formData.policyType === "text"}
                        onChange={(e) => setFormData(prev => ({ ...prev, policyType: "text" }))}
                      />
                      Direct Text Policy
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
                      <input
                        type="radio"
                        name="policyType"
                        value="file"
                        checked={formData.policyType === "file"}
                        onChange={(e) => setFormData(prev => ({ ...prev, policyType: "file" }))}
                      />
                      Upload Policy File (PDF/Word)
                    </label>
                  </div>
                </div>

                {formData.policyType === "text" ? (
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
                    <label>Policy Text Content</label>
                    <textarea
                      name="policyText"
                      value={formData.policyText || ""}
                      onChange={handleInputChange}
                      rows={8}
                      placeholder="Write your refund, returns and store policies here..."
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        fontFamily: 'inherit',
                        fontSize: '13px',
                        outline: 'none',
                        resize: 'vertical',
                        backgroundColor: '#FFFDFE'
                      }}
                    />
                  </div>
                ) : (
                  <div className="form-group">
                    <label>Upload Document (.pdf, .doc, .docx)</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '5px' }}>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handlePolicyFileUpload}
                        style={{ border: 'none', padding: 0, background: 'transparent' }}
                      />
                      {formData.policyFileName && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)', marginTop: '5px' }}>
                          <span>📎 Current File: <strong>{formData.policyFileName}</strong></span>
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, policyFileName: "", policyFileData: "" }))}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#E74C3C',
                              cursor: 'pointer',
                              fontWeight: '600',
                              fontSize: '12px'
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
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
