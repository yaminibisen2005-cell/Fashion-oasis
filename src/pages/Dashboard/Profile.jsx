import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import "./Profile.css";

function Profile() {
  return (
    <DashboardLayout>
      <div className="profile-page">

        <div className="profile-card">

          <h2>My Profile</h2>

          <div className="profile-image">
            <img
              src="https://i.pravatar.cc/150?img=32"
              alt="Profile"
            />
            <button className="change-btn">
              Change Photo
            </button>
          </div>

          <div className="profile-info">

            <div className="info-box">
              <label>Full Name</label>
              <input
                type="text"
                value="Shwet Samrat"
                readOnly
              />
            </div>

            <div className="info-box">
              <label>Email Address</label>
              <input
                type="email"
                value="shwet@gmail.com"
                readOnly
              />
            </div>

            <div className="info-box">
              <label>Phone Number</label>
              <input
                type="text"
                value="+91 9876543210"
                readOnly
              />
            </div>

            <div className="info-box">
              <label>Date of Birth</label>
              <input
                type="text"
                value="12 Oct 1995"
                readOnly
              />
            </div>

            <div className="info-box">
              <label>Gender</label>
              <input
                type="text"
                value="Male"
                readOnly
              />
            </div>

          </div>

          <button className="update-btn">
            UPDATE PROFILE
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Profile;