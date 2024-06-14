import React from "react";
import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar";
import "../index.css";
import RequestDetail from "../component/subcityComponent/RequestDetail";


function RequestDetailPage() {
  return (
    <div className="layout">
      <Header type="dashboard" />
      <div className="main-content">
        <Sidebar role="admin" currentPage="/request-detail" />
        <div className="content">
          <RequestDetail />
        </div>
      </div>
    </div>
  );
}
export default RequestDetailPage;
