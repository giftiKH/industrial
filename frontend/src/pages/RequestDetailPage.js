import React from "react";
import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar";
import "../index.css";
import RequestDetail from "../component/subcityComponent/RequestDetail";
import { TextbookRequestProvider } from "../context/TextbookRequestContext";


function RequestDetailPage() {
  return (
    <div className="layout">
      <Header type="dashboard" />
      <div className="main-content">
        <Sidebar currentPage="/request-list" />
        <div className="content">
          <TextbookRequestProvider>
            <RequestDetail />
          </TextbookRequestProvider>
        </div>
      </div>
    </div>
  );
}
export default RequestDetailPage;
