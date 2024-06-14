import React from "react";
import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar";
import "../index.css";
import TextbookList from "../component/adminComponent/TextbookList";
import { TextbookProvider } from "../context/TextbookContext";


function TextbookPage() {
  return (
    <div className="layout">
      <Header type="dashboard" />
      <div className="main-content">
        <Sidebar role="admin" currentPage="/textbooks" />
        <div className="content">
          <TextbookProvider>
            <TextbookList />
          </TextbookProvider>
        </div>
      </div>
    </div>
  );
}
export default TextbookPage;
 