import React from "react";
import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar";
import "../index.css";
import { OrganizationProvider } from "../context/OrganizationContext";
import OrganizationList from "../component/adminComponent/OrganizationList";

function OrganizationPage() {
  return (
    <div className="layout">
      <Header type="dashboard" />
      <div className="main-content">
        <Sidebar role="admin" currentPage="/organizations" />
        <div className="content">
          <h1>all organization</h1>
          <OrganizationProvider>
            <OrganizationList />
          </OrganizationProvider>
        </div>
      </div>
    </div>
  );
}
export default OrganizationPage;
