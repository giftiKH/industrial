import React from "react";
import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar";
import "../index.css";
// Import the respective components for each page
import RequestListContent from "../components/RequestListContent";

function RequestListPage() {
  return (
    <div className="layout">
      <Header type="dashboard" />
      <div className="main-content">
        <Sidebar role="admin" currentPage="/request-list" />
        <div className="content">
          <RequestListContent />
        </div>
      </div>
    </div>
  );
}
export default RequestListPage;
