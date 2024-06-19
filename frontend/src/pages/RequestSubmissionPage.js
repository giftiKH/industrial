// RequestSubmissionPage.js
import React from "react";
import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar";
import "../index.css";
import { TextbookRequestProvider } from "../context/TextbookRequestContext";
import RequestCon from "../component/schoolComponet/RequestCon";
import { TextbookProvider } from "../context/TextbookContext";


function RequestSubmissionPage() {
  return (
    <div className="layout">
      <Header type="dashboard" />
      <div className="main-content">
        <Sidebar role="admin" currentPage="/request-submission" />
        <div className="content">
          <TextbookProvider>
            <TextbookRequestProvider>
              <RequestCon />
            </TextbookRequestProvider>
          </TextbookProvider>
        </div>
      </div>
    </div>
  );
}

export default RequestSubmissionPage;
