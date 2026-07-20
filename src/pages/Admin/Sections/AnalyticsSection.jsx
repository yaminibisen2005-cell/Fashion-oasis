import React from "react";
import { FaArrowUp, FaArrowDown, FaCalendarAlt } from "react-icons/fa";

const AnalyticsSection = () => {
  return (
    <div className="admin-analytics-view">
      <div className="section-title-row">
        <div>
          <h2>Analytics Dashboard</h2>
          <p className="subtitle">Inspect your store conversion rates, sales trends, and inventory segments.</p>
        </div>
        <div className="date-picker-box">
          <FaCalendarAlt />
          <span>Last 30 Days</span>
        </div>
      </div>

      {/* Analytics Summary Row */}
      <div className="analytics-metrics-grid">
        <div className="analytics-metric-card">
          <span>Total Revenue</span>
          <h3>₹8,95,000</h3>
          <p className="text-success"><FaArrowUp /> +15.7% from last month</p>
        </div>
        <div className="analytics-metric-card">
          <span>Total Orders</span>
          <h3>890</h3>
          <p className="text-success"><FaArrowUp /> +8.2% from last month</p>
        </div>
        <div className="analytics-metric-card">
          <span>Total Customers</span>
          <h3>1,200</h3>
          <p className="text-success"><FaArrowUp /> +10.2% from last month</p>
        </div>
        <div className="analytics-metric-card">
          <span>Conversion Rate</span>
          <h3>2.8%</h3>
          <p className="text-success"><FaArrowUp /> +1.54% from last month</p>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="analytics-charts-grid">
        {/* Sales Trend Line Chart */}
        <div className="analytics-chart-card">
          <h3>Sales Overview</h3>
          <div className="svg-chart-container-large">
            <svg viewBox="0 0 500 220" width="100%" height="100%">
              <defs>
                <linearGradient id="analyticsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EF6F8F" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#EF6F8F" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              
              {/* Horizontal lines */}
              <line x1="40" y1="30" x2="480" y2="30" stroke="#F5ECEF" strokeWidth="1" />
              <line x1="40" y1="75" x2="480" y2="75" stroke="#F5ECEF" strokeWidth="1" />
              <line x1="40" y1="120" x2="480" y2="120" stroke="#F5ECEF" strokeWidth="1" />
              <line x1="40" y1="165" x2="480" y2="165" stroke="#F5ECEF" strokeWidth="1" />

              {/* Y Axis Labels */}
              <text x="30" y="35" textAnchor="end" fill="#8E7A6B" fontSize="10">2,00,000</text>
              <text x="30" y="80" textAnchor="end" fill="#8E7A6B" fontSize="10">1,50,000</text>
              <text x="30" y="125" textAnchor="end" fill="#8E7A6B" fontSize="10">1,00,000</text>
              <text x="30" y="170" textAnchor="end" fill="#8E7A6B" fontSize="10">50,000</text>
              <text x="30" y="210" textAnchor="end" fill="#8E7A6B" fontSize="10">0</text>

              {/* Line Graph */}
              <path
                d="M 50 170 Q 110 135 120 125 T 190 145 T 260 95 T 330 115 T 400 65 T 470 45"
                fill="none"
                stroke="#EF6F8F"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M 50 170 Q 110 135 120 125 T 190 145 T 260 95 T 330 115 T 400 65 T 470 45 L 470 210 L 50 210 Z"
                fill="url(#analyticsGrad)"
              />

              {/* Data circles */}
              <circle cx="50" cy="170" r="5" fill="#EF6F8F" stroke="#fff" strokeWidth="2" />
              <circle cx="120" cy="125" r="5" fill="#EF6F8F" stroke="#fff" strokeWidth="2" />
              <circle cx="190" cy="145" r="5" fill="#EF6F8F" stroke="#fff" strokeWidth="2" />
              <circle cx="260" cy="95" r="5" fill="#EF6F8F" stroke="#fff" strokeWidth="2" />
              <circle cx="330" cy="115" r="5" fill="#EF6F8F" stroke="#fff" strokeWidth="2" />
              <circle cx="400" cy="65" r="5" fill="#EF6F8F" stroke="#fff" strokeWidth="2" />
              <circle cx="470" cy="45" r="5" fill="#EF6F8F" stroke="#fff" strokeWidth="2" />

              {/* X Axis Labels */}
              <text x="50" y="210" textAnchor="middle" fill="#8E7A6B" fontSize="9">May 12</text>
              <text x="120" y="210" textAnchor="middle" fill="#8E7A6B" fontSize="9">May 13</text>
              <text x="190" y="210" textAnchor="middle" fill="#8E7A6B" fontSize="9">May 14</text>
              <text x="260" y="210" textAnchor="middle" fill="#8E7A6B" fontSize="9">May 15</text>
              <text x="330" y="210" textAnchor="middle" fill="#8E7A6B" fontSize="9">May 16</text>
              <text x="400" y="210" textAnchor="middle" fill="#8E7A6B" fontSize="9">May 17</text>
              <text x="470" y="210" textAnchor="middle" fill="#8E7A6B" fontSize="9">May 18</text>
            </svg>
          </div>
        </div>

        {/* Top Categories Pie/Donut Chart */}
        <div className="analytics-chart-card category-breakdown-card">
          <h3>Top Categories</h3>
          <div className="donut-chart-wrapper">
            <div className="donut-svg-container">
              <svg viewBox="0 0 100 100" width="150" height="150">
                {/* Necklace: 40% (stroke-dasharray="40 60" stroke-dashoffset="25") */}
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="transparent"
                  stroke="#EF6F8F"
                  strokeWidth="14"
                  strokeDasharray="40 60"
                  strokeDashoffset="25"
                />
                {/* Earrings: 30% (stroke-dasharray="30 70" stroke-dashoffset="85") */}
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="transparent"
                  stroke="#D94C7A"
                  strokeWidth="14"
                  strokeDasharray="30 70"
                  strokeDashoffset="85"
                />
                {/* Rings: 20% (stroke-dasharray="20 80" stroke-dashoffset="55") */}
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="transparent"
                  stroke="#D4AF37"
                  strokeWidth="14"
                  strokeDasharray="20 80"
                  strokeDashoffset="115"
                />
                {/* Others: 10% (stroke-dasharray="10 90" stroke-dashoffset="35") */}
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="transparent"
                  stroke="#8E7A6B"
                  strokeWidth="14"
                  strokeDasharray="10 90"
                  strokeDashoffset="135"
                />
                {/* Center Hole for Donut */}
                <circle cx="50" cy="50" r="23" fill="#fff" />
              </svg>
              <div className="donut-center-lbl">
                <h5>100%</h5>
                <span>Sales</span>
              </div>
            </div>

            <div className="donut-legend">
              <div className="legend-item">
                <span className="legend-dot color-pink1"></span>
                <span>Necklace</span>
                <strong>40%</strong>
              </div>
              <div className="legend-item">
                <span className="legend-dot color-pink2"></span>
                <span>Earrings</span>
                <strong>30%</strong>
              </div>
              <div className="legend-item">
                <span className="legend-dot color-gold"></span>
                <span>Rings</span>
                <strong>20%</strong>
              </div>
              <div className="legend-item">
                <span className="legend-dot color-brown"></span>
                <span>Others</span>
                <strong>10%</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
