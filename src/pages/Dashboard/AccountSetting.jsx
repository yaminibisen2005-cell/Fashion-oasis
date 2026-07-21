import "./AccountSetting.css";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";

const AccountSetting = () => {
  return (
    <DashboardLayout>
      <div className="account-settings-page">

        <div className="settings-card">
          <h2>Account Settings</h2>

          <div className="setting-section">
            <h3>Change Password</h3>

            <div className="input-group">
              <label>Current Password</label>
              <input
                type="password"
                placeholder="Current Password"
              />
            </div>

            <div className="input-group">
              <label>New Password</label>
              <input
                type="password"
                placeholder="New Password"
              />
            </div>

            <div className="input-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm New Password"
              />
            </div>

            <button className="update-btn">
              UPDATE PASSWORD
            </button>
          </div>

          <div className="setting-section notification-section">
            <h3>Notification Preferences</h3>

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
              SAVE PREFERENCES
            </button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default AccountSetting;