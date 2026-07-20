import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./DashboardLayout.css";

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-container">

      <Sidebar />

      <div className="main-content">
        <Topbar />

        <div className="page-content">
          {children}
        </div>
      </div>

    </div>
  );
}

export default DashboardLayout;