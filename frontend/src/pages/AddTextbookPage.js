import React from "react";
import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar";
import "../index.css";
import AddTB from "../component/adminComponent/AddTB";
import { TextbookProvider } from "../context/TextbookContext";


function AddTextbookPage() {
  return (
    <div className="layout">
      <Header type="dashboard" />
      <div className="main-content">
        <Sidebar role="admin" currentPage="/add-textbook" />
        <div className="content">
          <TextbookProvider>
            <AddTB />
          </TextbookProvider>
        
        </div>
      </div>
    </div>
  );
}
export default AddTextbookPage;
