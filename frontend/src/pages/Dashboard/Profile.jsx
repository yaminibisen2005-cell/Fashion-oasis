import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import "./Profile.css";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaVenusMars,
  FaMapMarkerAlt,
} from "react-icons/fa";

// import avatar from "../../assets/avatar.jpg";

function Profile() {
  return (
    <DashboardLayout showProfile>
      <div className="profile-page">

        <div className="profile-card">

          <div className="profile-header">

            {/* Local Image */}
            {/* <img src={avatar} alt="Profile" className="profile-avatar" /> */}

            {/* Temporary Avatar */}
           

            <div className="profile-information">

              <h2>Profile Infromation</h2>

              <p>Manage your personal details</p>

            </div>

          </div>

          <div className="profile-info">

            <div className="info-box">
            <label>Full Name</label>
              <div className="input-group">
    <FaUser className="input-icon" />
    <input
      type="text"
      defaultValue={"Shwet"}
     
    />
            </div>
            </div>

           <div className="info-box">
  <label>Email</label>

  <div className="input-group">
    <FaEnvelope className="input-icon" />
    <input
      type="email"
      defaultValue={"shwet@gmail.com"}
      
    />
  </div>
</div>

           <div className="info-box">
  <label>Phone</label>

  <div className="input-group">
    <FaPhone className="input-icon" />
    <input
      type="text"
      defaultValue={"+91 8709529162"}
      
    />
  </div>
</div>

           <div className="info-box">
  <label>Gender</label>

  <div className="input-group">
    <FaVenusMars className="input-icon" />

    <select defaultValue="Male">
      <option>Male</option>
      <option>Female</option>
      <option>Other</option>
    </select>
  </div>
</div>

            <div className="info-box full">
  <label>Address</label>

  <div className="input-group textarea-group">
    <FaMapMarkerAlt className="input-icon textarea-icon" />

    <textarea
      rows="4"
      defaultValue={"+Saket,New Delhi"}
      
    />
  </div>
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