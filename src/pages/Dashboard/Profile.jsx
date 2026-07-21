import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import "./Profile.css";

// import avatar from "../../assets/avatar.jpg";

function Profile() {
  return (
    <DashboardLayout>
      <div className="profile-page">

        <div className="profile-card">

          <div className="profile-header">

            {/* Local Image */}
            {/* <img src={avatar} alt="Profile" className="profile-avatar" /> */}

            {/* Temporary Avatar */}
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Profile"
              className="profile-avatar"
            />

            <div className="profile-user">

              <h2>Shwet Samrat</h2>

              <p>Member since July 2026</p>

            </div>

          </div>

          <div className="profile-info">

            <div className="info-box">
              <label>Full Name</label>
              <input
                type="text"
                defaultValue="Shwet Samrat"
              />
            </div>

            <div className="info-box">
              <label>Email</label>
              <input
                type="email"
                defaultValue="shwet@example.com"
              />
            </div>

            <div className="info-box">
              <label>Phone</label>
              <input
                type="text"
                defaultValue="+91 9876543210"
              />
            </div>

            <div className="info-box">
              <label>Gender</label>

              <select defaultValue="Male">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="info-box full">
              <label>Address</label>

              <textarea
                rows="4"
                defaultValue="Purnia, Bihar, India"
              />
            </div>

          </div>

          <button className="save-btn">
            Save Changes
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Profile;