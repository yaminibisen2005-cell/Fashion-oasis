import "./AccountSetting.css";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
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
  return (
    <DashboardLayout showProfile={true}>
      <div className="account-settings-page">

        <div className="settings-card">

          <h2>Account Settings</h2>
          <p className="settings-subtitle">
            Manage your account preferences and security settings.
          </p>

          {/* ================= Account Information ================= */}

          <div className="setting-section">
          <div className="setting-section">

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
        placeholder="Enter your full name"
        defaultValue="Shwet Samrat"
      />
    </div>

    <div className="personal-input">
      <label>
        <FaEnvelope className="label-icon" />
        Email Address
      </label>

      <input
        type="email"
        placeholder="Enter your email"
        defaultValue="shwet@example.com"
      />
    </div>

    <div className="personal-input">
      <label>
        <FaPhone className="label-icon" />
        Phone Number
      </label>

      <input
        type="tel"
        placeholder="+91 9876543210"
        defaultValue="+91 9876543210"
      />
    </div>

    <div className="personal-input">
      <label>
        <FaVenusMars className="label-icon" />
        Gender
      </label>

      <select defaultValue="Male">
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
    </div>

    <div className="personal-input">
      <label>
        <FaBirthdayCake className="label-icon" />
        Date of Birth
      </label>

      <input
        type="date"
        defaultValue="2000-05-25"
      />
    </div>

    <div className="personal-input full-width">
      <label>
        <FaMapMarkerAlt className="label-icon" />
        Address
      </label>

      <textarea
        rows="4"
        defaultValue="Purnia, Bihar, India"
        placeholder="Enter your address"
      ></textarea>
    </div>

  </div>

  <button className="save-btn">
    <FaSave />
    Save Personal Information
  </button>

</div>
            
  
            

          </div>

          {/* ================= Password ================= */}

          <div className="setting-section">

           <h3>
  <FaLock className="section-icon" />
  Change Password
</h3>

            <div className="input-group">

              <label>
  <FaKey className="label-icon" />
  Current Password
</label>

              <input
                type="password"
                placeholder="Enter current password"
              />

            </div>

            <div className="input-group">

             <label>
  <FaKey className="label-icon" />
  New Password
</label>

              <input
                type="password"
                placeholder="Enter new password"
              />

            </div>

            <div className="input-group">

            <label>
  <FaKey className="label-icon" />
  Confirm Password
</label>

              <input
                type="password"
                placeholder="Confirm new password"
              />

            </div>

            <button className="update-btn">
              Update Password
            </button>

          </div>

          {/* ================= Notifications ================= */}

          <div className="setting-section">

            <h3>
  <FaBell className="section-icon" />
  Notification Preferences
</h3>

            <label className="checkbox">

              <input type="checkbox" defaultChecked />

              <span>Order Updates</span>

            </label>

            <label className="checkbox">

              <input type="checkbox" defaultChecked />

              <span>Promotions & Offers</span>

            </label>

            <label className="checkbox">

              <input type="checkbox" />

              <span>New Arrivals</span>

            </label>

            <label className="checkbox">

              <input type="checkbox" defaultChecked />

              <span>Newsletter</span>

            </label>

            <button className="save-btn">
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

                <input type="checkbox" />

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
            <select className="setting-select">

              <option>English</option>

              <option>Hindi</option>

            </select>

          </div>

          {/* ================= Security ================= */}

          <div className="setting-section">

            <h3>
  <FaShieldAlt className="section-icon" />
  Security
</h3>

            <div className="setting-row">

              <div>

                <h4>Two-Factor Authentication</h4>

                <p>Add an extra layer of protection to your account.</p>

              </div>

              <label className="switch">

                <input type="checkbox" />

                <span className="slider"></span>

              </label>

            </div>

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

            <button className="delete-btn">
              Delete Account
            </button>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default AccountSetting;