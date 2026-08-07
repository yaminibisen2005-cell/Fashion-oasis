 import "./AccountSetting.css";
import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { getProfile, updateProfile, updatePassword, deleteAccount } from "../../api/customer";
import {
  FaUserCircle,
  FaLock,
  FaBell,
  FaMoon,
  FaLanguage,
  FaShieldAlt,
  FaTrashAlt,
  FaKey,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaVenusMars,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaSave,
} from "react-icons/fa";

function AccountSetting() {
  // Get logged-in customer details from local storage
  const storedUser = JSON.parse(localStorage.getItem("customerInfo")) || {};
  const userEmail = storedUser.email || localStorage.getItem("customerEmail") || "";

  // Feedback states
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Personal Information form state
  const [formData, setFormData] = useState({
    firstName: storedUser.firstName || "",
    lastName: storedUser.lastName || "",
    email: userEmail,
    phone: "",
    gender: "Male",
    dob: "",
    address: "",
  });

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Preferences states
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newArrivals: false,
    newsletter: true,
  });

  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");

  // Fetch full customer profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userEmail) return;
      try {
        const data = await getProfile(userEmail);
        if (data.success && data.data) {
          setFormData({
            firstName: data.data.firstName || storedUser.firstName || "",
            lastName: data.data.lastName || storedUser.lastName || "",
            email: data.data.email || userEmail,
            phone: data.data.phone || "",
            gender: data.data.gender || "Male",
            dob: data.data.dob || "",
            address: data.data.address || "",
          });
        }
      } catch (err) {
        console.error("Error fetching profile details", err);
      }
    };
    fetchProfile();
  }, [userEmail]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChangeInput = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // Save Personal Information
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const nameParts = formData.firstName.trim().split(" ");
      const fName = nameParts[0] || formData.firstName;
      const lName = nameParts.slice(1).join(" ") || formData.lastName;

      const data = await updateProfile({
        originalEmail: userEmail,
        firstName: fName,
        lastName: lName,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        address: formData.address,
      });

      if (data.success) {
        setMessage("Personal information updated successfully!");
        localStorage.setItem("customerInfo", JSON.stringify(data.data));
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    }
  };

  // Update Password
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const activeUser = JSON.parse(localStorage.getItem("customerInfo")) || {};
    const currentEmail = formData.email || activeUser.email;

    if (!currentEmail) {
      setError("User session not found. Please log in again.");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match!");
      return;
    }

    try {
      const data = await updatePassword({
        email: currentEmail,
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      if (data.success) {
        setMessage("Password updated successfully!");
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password. Check your current password.");
    }
  };

  // Delete Account
  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
      try {
        const data = await deleteAccount(userEmail);

        if (data.success) {
          localStorage.removeItem("customerInfo");
          localStorage.removeItem("customerEmail");
          localStorage.removeItem("token");
          window.dispatchEvent(new Event("storage"));
          window.location.href = "/login";
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete account.");
      }
    }
  };

  return (
    <DashboardLayout showProfile={true}>
      <div className="account-settings-page">
        <div className="settings-card">
          <h2>Account Settings</h2>
          <p className="settings-subtitle">
            Manage your account preferences and security settings.
          </p>

          {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">{message}</div>}
          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

          {/* ================= Personal Information ================= */}
          <form onSubmit={handleSaveProfile} className="setting-section">
            <h3>
              <FaUserCircle className="section-icon" />
              Personal Information
            </h3>

            <div className="personal-grid">
              <div className="personal-input">
                <label>
                  <FaUser className="label-icon" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your full name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="personal-input">
                <label>
                  <FaEnvelope className="label-icon" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="personal-input">
                <label>
                  <FaPhone className="label-icon" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="personal-input">
                <label>
                  <FaVenusMars className="label-icon" />
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="personal-input">
                <label>
                  <FaBirthdayCake className="label-icon" />
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
              </div>

              <div className="personal-input full-width">
                <label>
                  <FaMapMarkerAlt className="label-icon" />
                  Address
                </label>
                <textarea
                  rows="4"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                ></textarea>
              </div>
            </div>

            <button type="submit" className="fo-save-btn">
              <FaSave />
              Save Personal Information
            </button>
          </form>

          {/* ================= Password ================= */}
          <form onSubmit={handleUpdatePassword} className="setting-section">
            <h3>
              <FaLock className="section-icon" />
              Change Password
            </h3>

            <div className="fo-input-group">
              <label>
                <FaKey className="label-icon" />
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChangeInput}
                placeholder="Enter current password"
                required
              />
            </div>

            <div className="fo-input-group">
              <label>
                <FaKey className="label-icon" />
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChangeInput}
                placeholder="Enter new password"
                required
              />
            </div>

            <div className="fo-input-group">
              <label>
                <FaKey className="label-icon" />
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChangeInput}
                placeholder="Confirm new password"
                required
              />
            </div>

            <button type="submit" className="update-btn">
              Update Password
            </button>
          </form>

          {/* ================= Notifications ================= */}
          <div className="setting-section">
            <h3>
              <FaBell className="section-icon" />
              Notification Preferences
            </h3>

            <label className="checkbox">
              <input
                type="checkbox"
                checked={notifications.orderUpdates}
                onChange={(e) => setNotifications({ ...notifications, orderUpdates: e.target.checked })}
              />
              <span>Order Updates</span>
            </label>

            <label className="checkbox">
              <input
                type="checkbox"
                checked={notifications.promotions}
                onChange={(e) => setNotifications({ ...notifications, promotions: e.target.checked })}
              />
              <span>Promotions & Offers</span>
            </label>

            <label className="checkbox">
              <input
                type="checkbox"
                checked={notifications.newArrivals}
                onChange={(e) => setNotifications({ ...notifications, newArrivals: e.target.checked })}
              />
              <span>New Arrivals</span>
            </label>

            <label className="checkbox">
              <input
                type="checkbox"
                checked={notifications.newsletter}
                onChange={(e) => setNotifications({ ...notifications, newsletter: e.target.checked })}
              />
              <span>Newsletter</span>
            </label>

            <button
              type="button"
              className="fo-save-btn"
              onClick={() => alert("Notification preferences saved successfully!")}
            >
              Save Preferences
            </button>
          </div>

          {/* ================= Appearance ================= */}
          <div className="setting-section">
            <h3>
              <FaMoon className="section-icon" />
              Appearance
            </h3>

            <div className="setting-row">
              <div>
                <h4>Dark Mode</h4>
                <p>Enable dark mode for better viewing at night.</p>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          {/* ================= Language ================= */}
          <div className="setting-section">
            <h3>
              <FaLanguage className="section-icon" />
              Language
            </h3>
            <select
              className="setting-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>

          {/* ================= Danger Zone ================= */}
          <div className="setting-section danger-zone">
            <h3>
              <FaTrashAlt className="section-icon danger-icon" />
              Danger Zone
            </h3>

            <p>
              Deleting your account will permanently remove all your
              orders, wishlist, reviews and account information.
            </p>

            <button type="button" className="delete-btn" onClick={handleDeleteAccount}>
              Delete Account
            </button>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}

export default AccountSetting;