import React from "react";
import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar";
import "../index.css";
import RequestList from "../component/subcityComponent/RequestList";
import { TextbookRequestProvider } from "../context/TextbookRequestContext";


function AllRequestPage() {
  return (
    <div className="layout">
      <Header type="dashboard" />
      <div className="main-content">
        <Sidebar role="admin" currentPage="/request-list" />
        <div className="content">
          <TextbookRequestProvider>
            <RequestList />
          </TextbookRequestProvider>
        </div>
      </div>
    </div>
  );
}
export default AllRequestPage;
