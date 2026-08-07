import "../Auth.css";
import registerAuth from "../../assets/register-auth.jpg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaPhoneAlt, FaLock, FaEye, FaEyeSlash, FaMapMarkerAlt, FaStore } from "react-icons/fa";
import { FiTrendingUp, FiShield } from "react-icons/fi";
import AuthLayout from "../../components/AuthLayout/AuthLayout";

import { validatePasswordStrength, validateConfirmPassword } from "../../utils/passwordValidation";
import { registerSeller } from "../../api/seller";

const SellerRegister = () => {
  const [fullName, setFullName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.registrationSuccess) {
      // Show success message if redirected from registration
    }
  }, [location]);

  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!storeName.trim()) {
      newErrors.storeName = "Store name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (gstNumber && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i.test(gstNumber)) {
      newErrors.gstNumber = "Please enter a valid GST number";
    }

    if (!businessAddress.trim()) {
      newErrors.businessAddress = "Business address is required";
    }

    if (!city.trim()) {
      newErrors.city = "City is required";
    }

    if (!state.trim()) {
      newErrors.state = "State is required";
    }

    if (!pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^[0-9]{6}$/.test(pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit pincode";
    }

    const passErr = validatePasswordStrength(password);
    if (passErr) {
      newErrors.password = passErr;
    }

    const confirmErr = validateConfirmPassword(password, confirmPassword);
    if (confirmErr) {
      newErrors.confirmPassword = confirmErr;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const sellerData = {
        name: fullName,
        storeName,
        email,
        phone,
        gstNumber: gstNumber || null,
        businessAddress,
        city,
        state,
        pincode,
        password,
      };

      await registerSeller(sellerData);

      // Redirect to login with success message
      navigate("/seller/login", { 
        state: { 
          registrationSuccess: true,
          message: "Registration completed successfully. Please wait for admin approval." 
        } 
      });

    } catch (error) {
      alert(error.response?.data?.message || error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const glassCardItems = [
    { icon: <FaStore />, text: "Grow Your Business" },
    { icon: <FiTrendingUp />, text: "Reach More Customers" },
    { icon: <FiShield />, text: "Secure Platform" }
  ];

  return (
    <AuthLayout
      image={registerAuth}
      glassCardItems={glassCardItems}
      title="Become a Seller"
      subtitle="Join Fashion Oasis and showcase your handcrafted jewellery to thousands of customers."
      themeClass="register-theme seller-auth-theme"
      extraFormBoxClass="seller-register-box"
      extraWrapperClass="seller-register-wrapper"
    >
      <form onSubmit={handleRegister} noValidate>
        <div className="seller-form-grid">
          {/* Left Column */}
          <div className="seller-form-column">
            {/* Full Name */}
            <div className="input-group">
              <label htmlFor="fullName">Full Name</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  id="fullName"
                  type="text"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setErrors(prev => ({ ...prev, fullName: "" }));
                  }}
                  required
                  disabled={loading}
                />
              </div>
              {errors.fullName && <span className="error-text">{errors.fullName}</span>}
            </div>

            {/* Email */}
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors(prev => ({ ...prev, email: "" }));
                  }}
                  required
                  disabled={loading}
                />
              </div>
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            {/* Phone */}
            <div className="input-group">
              <label htmlFor="phone">Phone Number</label>
              <div className="input-wrapper">
                <FaPhoneAlt className="input-icon" />
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter 10-digit number"
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    if (value.length <= 10) {
                      setPhone(value);
                      if (value.length === 10) setErrors(prev => ({ ...prev, phone: "" }));
                    }
                  }}
                  required
                  disabled={loading}
                />
              </div>
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

            {/* Business Address */}
            <div className="input-group">
              <label htmlFor="businessAddress">Business Address</label>
              <div className="input-wrapper">
                <FaMapMarkerAlt className="input-icon" />
                <input
                  id="businessAddress"
                  type="text"
                  placeholder="Enter your business address"
                  value={businessAddress}
                  onChange={(e) => {
                    setBusinessAddress(e.target.value);
                    setErrors(prev => ({ ...prev, businessAddress: "" }));
                  }}
                  required
                  disabled={loading}
                />
              </div>
              {errors.businessAddress && <span className="error-text">{errors.businessAddress}</span>}
            </div>

            {/* Password */}
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className={`input-wrapper ${errors.password ? "input-error" : ""}`}>
                <FaLock className="input-icon" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password (e.g. Fashion@123)"
                  value={password}
                  onChange={(e) => {
                    const val = e.target.value;
                    setPassword(val);
                    const err = validatePasswordStrength(val);
                    setErrors(prev => ({ ...prev, password: err }));
                    if (confirmPassword) {
                      setErrors(prev => ({ ...prev, confirmPassword: validateConfirmPassword(val, confirmPassword) }));
                    }
                  }}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={loading}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <span className="password-error-msg">{errors.password}</span>}
            </div>
          </div>

          {/* Right Column */}
          <div className="seller-form-column">
            {/* Store Name */}
            <div className="input-group">
              <label htmlFor="storeName">Store Name</label>
              <div className="input-wrapper">
                <FaStore className="input-icon" />
                <input
                  id="storeName"
                  type="text"
                  placeholder="Your store name"
                  value={storeName}
                  onChange={(e) => {
                    setStoreName(e.target.value);
                    setErrors(prev => ({ ...prev, storeName: "" }));
                  }}
                  required
                  disabled={loading}
                />
              </div>
              {errors.storeName && <span className="error-text">{errors.storeName}</span>}
            </div>

            {/* GST Number (Optional) */}
            <div className="input-group">
              <label htmlFor="gstNumber">GST Number <span className="optional">(Optional)</span></label>
              <div className="input-wrapper">
                <FiShield className="input-icon" />
                <input
                  id="gstNumber"
                  type="text"
                  placeholder="Enter GST number"
                  value={gstNumber}
                  onChange={(e) => {
                    const value = e.target.value.toUpperCase();
                    setGstNumber(value);
                    setErrors(prev => ({ ...prev, gstNumber: "" }));
                  }}
                  disabled={loading}
                />
              </div>
              {errors.gstNumber && <span className="error-text">{errors.gstNumber}</span>}
            </div>

            {/* City */}
            <div className="input-group">
              <label htmlFor="city">City</label>
              <div className="input-wrapper">
                <FaMapMarkerAlt className="input-icon" />
                <input
                  id="city"
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setErrors(prev => ({ ...prev, city: "" }));
                  }}
                  required
                  disabled={loading}
                />
              </div>
              {errors.city && <span className="error-text">{errors.city}</span>}
            </div>

            {/* State */}
            <div className="input-group">
              <label htmlFor="state">State</label>
              <div className="input-wrapper">
                <FaMapMarkerAlt className="input-icon" />
                <input
                  id="state"
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    setErrors(prev => ({ ...prev, state: "" }));
                  }}
                  required
                  disabled={loading}
                />
              </div>
              {errors.state && <span className="error-text">{errors.state}</span>}
            </div>

            {/* Pincode */}
            <div className="input-group">
              <label htmlFor="pincode">Pincode</label>
              <div className="input-wrapper">
                <FaMapMarkerAlt className="input-icon" />
                <input
                  id="pincode"
                  type="tel"
                  placeholder="Enter 6-digit pincode"
                  value={pincode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    if (value.length <= 6) {
                      setPincode(value);
                      if (value.length === 6) setErrors(prev => ({ ...prev, pincode: "" }));
                    }
                  }}
                  required
                  disabled={loading}
                />
              </div>
              {errors.pincode && <span className="error-text">{errors.pincode}</span>}
            </div>

            {/* Confirm Password */}
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className={`input-wrapper ${errors.confirmPassword ? "input-error" : ""}`}>
                <FaLock className="input-icon" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => {
                    const val = e.target.value;
                    setConfirmPassword(val);
                    setErrors(prev => ({ ...prev, confirmPassword: validateConfirmPassword(password, val) }));
                  }}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  disabled={loading}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && <span className="password-error-msg">{errors.confirmPassword}</span>}
            </div>
          </div>
        </div>

        <button type="submit" className="anim-fade-up-btn-500" disabled={loading}>
          {loading ? (
            <span className="spinner"></span>
          ) : (
            <>
              Register as Seller <span className="arrow-icon">&rarr;</span>
            </>
          )}
        </button>
      </form>

      <p className="register anim-fade-up-register">
        Already have an approved seller account?
        <Link to="/seller/login">
          Login to Dashboard &rarr;
        </Link>
      </p>

      <div className="seller-info-card">
        <p>Your registration request will be reviewed by the Fashion Oasis Admin.</p>
        <p>After approval, your seller account will be activated and login credentials will be shared with you.</p>
      </div>
    </AuthLayout>
  );
};

export default SellerRegister;
