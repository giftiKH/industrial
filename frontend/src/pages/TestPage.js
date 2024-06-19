import React from "react";
import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar";

import "../index.css";

import { UserProvider } from "../context/UserContext";
import TestList from "../component/common/TestList";



function TestPage() {
  return (
    <div className="layout">
      <Header type="dashboard" />
      <div className="main-content">
        <Sidebar currentPage="/users" />
        <div className="content">
          <h1>list testing</h1>
          <UserProvider>
            
           <TestList />
           
          </UserProvider>
        </div>
      </div>
    </div>
  );
}
export default TestPage;
