import React from "react";
import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar";
import "../index.css";
import EmailForm from "../component/common/EmailForm";
import EmailProvider from "../context/EmailContext";


function EmailTestPage() {
  return (
    <div className="layout">
      <Header type="dashboard" />
      <div className="main-content">
        <Sidebar role="admin" currentPage="/textbooks" />
        <div className="content">
          <EmailProvider>
            <EmailForm />
          </EmailProvider>
        </div>
      </div>
    </div>
  );
}
export default EmailTestPage;
