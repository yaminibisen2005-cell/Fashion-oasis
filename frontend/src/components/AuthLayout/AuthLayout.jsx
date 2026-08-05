import React from "react";
import { motion } from "framer-motion";

const AuthLayout = ({
  image,
  glassCardItems = [],
  title,
  subtitle,
  themeClass = "",
  extraFormBoxClass = "",
  extraWrapperClass = "",
  children
}) => {
  return (
    <div className={`login-page ${themeClass}`}>
      <div className="auth-container">
        <motion.div 
          className="login-overlay"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* ================= LEFT BRANDING PANEL ================= */}
          <motion.div 
            className="brand-panel"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <img src={image} alt="Premium Luxury Jewellery" className="brand-panel-image" />
            <div className="brand-panel-overlay"></div>
            
            {/* Soft moving golden radial light */}
            <div className="golden-light-glow"></div>

            {/* Floating Gold Particles */}
            <div className="gold-particles-container">
              <div className="gold-particle p1"></div>
              <div className="gold-particle p2"></div>
              <div className="gold-particle p3"></div>
              <div className="gold-particle p4"></div>
              <div className="gold-particle p5"></div>
              <div className="gold-particle p6"></div>
              <div className="gold-particle p7"></div>
              <div className="gold-particle p8"></div>
              <div className="gold-particle p9"></div>
              <div className="gold-particle p10"></div>
              <div className="gold-particle p11"></div>
              <div className="gold-particle p12"></div>
            </div>

            {/* Floating Glass Feature Card at the bottom */}
            {glassCardItems.length > 0 && (
              <div className="bottom-glass-card">
                {glassCardItems.map((item, index) => (
                  <div key={index} className="glass-card-col">
                    <span className="glass-card-icon">{item.icon}</span>
                    <span className="glass-card-text">{item.text}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* ================= RIGHT FORM PANEL ================= */}
          <motion.div 
            className={`login-box ${extraFormBoxClass}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div className={`login-form-wrapper ${extraWrapperClass}`}>
              <h1 className="anim-fade-up-700">{title}</h1>
              <p className="subtitle anim-fade-up-700">{subtitle}</p>
              {children}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
