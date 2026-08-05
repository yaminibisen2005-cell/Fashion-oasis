import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown, FaCalendarAlt, FaSpinner } from "react-icons/fa";
import { fetchAnalytics } from "../../../api/admin";

const AnalyticsSection = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnalytics(7)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load analytics");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="admin-analytics-view flex-center" style={{ minHeight: "60vh" }}>
        <div style={{ textAlign: "center", color: "#EF6F8F" }}>
          <FaSpinner className="spinner icon-large" />
          <p style={{ marginTop: "10px" }}>Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-analytics-view flex-center">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  const { metrics, salesSeries, topCategories } = data;

  // Render Trend Metric Helper
  const Trend = ({ value }) => {
    const isUp = value >= 0;
    return (
      <p className={isUp ? "text-success" : "text-danger"}>
        {isUp ? <FaArrowUp /> : <FaArrowDown />} {isUp ? "+" : ""}{value}% from last period
      </p>
    );
  };

  // SVG Chart points
  const points = salesSeries || [];
  const maxSales = Math.max(...points.map(p => p.sales), 100);
  const minSales = 0;
  
  // y between 35 (max) and 170 (min)
  const mapY = (val) => 170 - ((val - minSales) / maxSales) * (170 - 35);
  
  // 7 points x = 50, 120, 190, 260, 330, 400, 470
  const startX = 50;
  const stepX = 70;
  
  let dPath = "";
  let dFill = "";
  if (points.length > 0) {
    dPath = `M ${startX} ${mapY(points[0].sales)}`;
    points.forEach((p, i) => {
      if (i > 0) {
        dPath += ` L ${startX + i * stepX} ${mapY(p.sales)}`;
      }
    });
    dFill = `${dPath} L ${startX + (points.length - 1) * stepX} 210 L ${startX} 210 Z`;
  }

  // Top Categories (Colors: Pink1, Pink2, Gold, Brown)
  const catColors = ["#EF6F8F", "#D94C7A", "#D4AF37", "#8E7A6B"];
  const catCssColors = ["color-pink1", "color-pink2", "color-gold", "color-brown"];
  let dashOffset = 25; // starting offset

  return (
    <div className="admin-analytics-view">
      <div className="section-title-row">
        <div>
          <h2>Analytics Dashboard</h2>
          <p className="subtitle">Inspect your store conversion rates, sales trends, and inventory segments.</p>
        </div>
        <div className="date-picker-box">
          <FaCalendarAlt />
          <span>Last 7 Days</span>
        </div>
      </div>

      {/* Analytics Summary Row */}
      <div className="analytics-metrics-grid">
        <div className="analytics-metric-card">
          <span>Total Revenue</span>
          <h3>₹{metrics.totalRevenue.toLocaleString()}</h3>
          <Trend value={metrics.revenueTrend} />
        </div>
        <div className="analytics-metric-card">
          <span>Total Orders</span>
          <h3>{metrics.totalOrders}</h3>
          <Trend value={metrics.ordersTrend} />
        </div>
        <div className="analytics-metric-card">
          <span>Total Customers</span>
          <h3>{metrics.totalCustomers}</h3>
          <Trend value={metrics.customersTrend} />
        </div>
        <div className="analytics-metric-card">
          <span>Conversion Rate</span>
          <h3>{metrics.conversionRate}%</h3>
          <Trend value={metrics.conversionTrend} />
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
              
              <line x1="40" y1="35" x2="480" y2="35" stroke="#F5ECEF" strokeWidth="1" />
              <line x1="40" y1="80" x2="480" y2="80" stroke="#F5ECEF" strokeWidth="1" />
              <line x1="40" y1="125" x2="480" y2="125" stroke="#F5ECEF" strokeWidth="1" />
              <line x1="40" y1="170" x2="480" y2="170" stroke="#F5ECEF" strokeWidth="1" />

              {/* Y Axis Labels */}
              <text x="30" y="40" textAnchor="end" fill="#8E7A6B" fontSize="10">{Math.round(maxSales)}</text>
              <text x="30" y="85" textAnchor="end" fill="#8E7A6B" fontSize="10">{Math.round(maxSales * 0.66)}</text>
              <text x="30" y="130" textAnchor="end" fill="#8E7A6B" fontSize="10">{Math.round(maxSales * 0.33)}</text>
              <text x="30" y="175" textAnchor="end" fill="#8E7A6B" fontSize="10">0</text>

              {/* Line Graph */}
              {dPath && (
                <>
                  <path d={dPath} fill="none" stroke="#EF6F8F" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d={dFill} fill="url(#analyticsGrad)" />
                </>
              )}

              {/* Data circles and Labels */}
              {points.map((p, i) => (
                <g key={i}>
                  <circle cx={startX + i * stepX} cy={mapY(p.sales)} r="5" fill="#EF6F8F" stroke="#fff" strokeWidth="2" />
                  <text x={startX + i * stepX} y="210" textAnchor="middle" fill="#8E7A6B" fontSize="9">{p.date}</text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Top Categories Pie/Donut Chart */}
        <div className="analytics-chart-card category-breakdown-card">
          <h3>Top Categories</h3>
          {topCategories && topCategories.length > 0 ? (
            <div className="donut-chart-wrapper">
              <div className="donut-svg-container">
                <svg viewBox="0 0 100 100" width="150" height="150">
                  {topCategories.map((cat, i) => {
                    const pct = cat.percentage || 0;
                    const strokeDasharray = `${pct} ${100 - pct}`;
                    const offset = dashOffset;
                    dashOffset -= pct; // subtract because offset goes backwards
                    return (
                      <circle
                        key={i}
                        cx="50"
                        cy="50"
                        r="30"
                        fill="transparent"
                        stroke={catColors[i % catColors.length]}
                        strokeWidth="14"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={offset}
                        pathLength="100"
                        style={{ transition: "all 0.5s ease" }}
                      />
                    );
                  })}
                  <circle cx="50" cy="50" r="23" fill="#fff" />
                </svg>
                <div className="donut-center-lbl">
                  <h5>100%</h5>
                  <span>Sales</span>
                </div>
              </div>

              <div className="donut-legend">
                {topCategories.map((cat, i) => (
                  <div className="legend-item" key={i}>
                    <span className={`legend-dot ${catCssColors[i % catCssColors.length]}`}></span>
                    <span>{cat.name}</span>
                    <strong>{cat.percentage}%</strong>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-center" style={{height: '100%'}}>
              <p>No category data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
