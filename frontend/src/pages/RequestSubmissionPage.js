import React from "react";
import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar";
import "../index.css";
import RequestForm from "../component/schoolComponet/RequestForm";

function RequestSubmissionPage() {
  return (
    <div className="layout">
      <Header type="dashboard" />
      <div className="main-content">
        <Sidebar role="admin" currentPage="/request-submission" />
        <div className="content">
          <RequestForm />
        </div>
      </div>
    </div>
  );
}
export default RequestSubmissionPage;
