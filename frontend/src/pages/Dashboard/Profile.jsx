 import React, { useState, useEffect } from 'react';
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import "./Profile.css";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaVenusMars,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Profile() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    address: ''
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Removed hardcoded fallback to prevent bleeding old user data
        const userEmail = localStorage.getItem('customerEmail');
        
        if (!userEmail) {
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:5000/api/v1/customer/profile?email=${userEmail}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        const result = await response.json();
        if (result.success) {
          setFormData(result.data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission / save changes
  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/customer/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originalEmail: localStorage.getItem('customerEmail'), // Passes current email reference
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email, // New email if changed
          phone: formData.phone,
          gender: formData.gender,
          address: formData.address
        }),
      });
        
      const result = await response.json();
      if (result.success) {
        setMessage('Profile updated successfully!');
        setFormData(result.data);
        // Update local storage if email was changed
        if (result.data.email) {
          localStorage.setItem('customerEmail', result.data.email);
        }
      } else {
        setMessage(result.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('An error occurred while saving.');
    }
  };

  if (loading) {
    return <DashboardLayout showProfile><div className="profile-page">Loading profile...</div></DashboardLayout>;
  }

  return (
    <DashboardLayout showProfile>
      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-information">
              <h2>Profile Information</h2>
              <p>Manage your personal details</p>
              {message && <p className="profile-message" style={{ color: 'green', fontSize: '14px' }}>{message}</p>}
            </div>
          </div>

          <div className="profile-info">
            <div className="info-box">
              <label>Full Name</label>
              <div className="input-group">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName || ''}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                />
              </div>
            </div>

            <div className="info-box">
              <label>Email</label>
              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  placeholder="Enter your email"
                /> 
              </div>
            </div>

            <div className="info-box">
              <label>Phone</label>
              <div className="input-group">
                <FaPhone className="input-icon" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className="info-box">
              <label>Gender</label>
              <div className="input-group">
                <FaVenusMars className="input-icon" />
                <select 
                  name="gender" 
                  value={formData.gender || ''} 
                  onChange={handleChange}
                >
                  <option value="" disabled>Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="info-box full">
              <label>Address</label>
              <div className="input-group textarea-group">
                <FaMapMarkerAlt className="input-icon textarea-icon" />
                <textarea
                  rows="4"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleChange}
                  placeholder="Enter your address"
                />
              </div>
            </div>
          </div>

          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;