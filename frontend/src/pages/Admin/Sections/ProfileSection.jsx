import React, { useState } from "react";
import { FaUserCircle, FaEnvelope, FaKey, FaSave } from "react-icons/fa";

const ProfileSection = ({ profile, updateProfile }) => {
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    password: "",
    confirmPassword: "",
    img: profile.img,
  });
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    updateProfile({
      name: formData.name,
      email: formData.email,
      img: formData.img,
    });
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  return (
    <div className="admin-profile-view">
      <div className="section-title-row">
        <div>
          <h2>Profile Settings</h2>
          <p className="subtitle">Update your personal account credentials.</p>
        </div>
      </div>

      <div className="form-card profile-settings-card">
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="avatar-upload-box">
            <img src={formData.img} alt={formData.name} className="avatar-large" />
            <div className="avatar-info-box">
              <h4>Profile Picture</h4>
              <p>JPG or PNG under 2MB. Dynamic preview active.</p>
              <input
                type="text"
                name="img"
                value={formData.img}
                onChange={handleInputChange}
                placeholder="Avatar Image URL"
                className="url-input"
              />
            </div>
          </div>

          <div className="profile-form-grid">
            <div className="form-group">
              <label>Name</label>
              <div className="input-with-icon">
                <FaUserCircle className="input-icon" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Admin Name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="admin@fashionoasis.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>New Password (Optional)</label>
              <div className="input-with-icon">
                <FaKey className="input-icon" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-with-icon">
                <FaKey className="input-icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </div>

          <div className="profile-action-row">
            {success && (
              <span className="save-success-msg">✓ Profile updated successfully!</span>
            )}
            <button type="submit" className="admin-btn-primary">
              <FaSave /> Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSection;
