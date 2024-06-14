import React from "react";
import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar";
import "../index.css";
import AvailableTextbooks from "../component/common/AvailableTextbooks";
import { TextbookProvider } from "../context/TextbookContext";

function AvailableTextbooksPage() {
  return (
    <div className="layout">
      <Header type="dashboard" />
      <div className="main-content">
        <Sidebar role="admin" currentPage="/textbooks" />
        <div className="content">
          <TextbookProvider>
            <AvailableTextbooks />
          </TextbookProvider>
        </div>
      </div>
    </div>
  );
}

export default AvailableTextbooksPage;
