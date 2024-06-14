import React from "react";
import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar";

import "../index.css";
import UserList from "../component/adminComponent/UserList";
import { UserProvider } from "../context/UserContext";
import { OrganizationProvider } from "../context/OrganizationContext";


function UserPage() {
  return (
    <div className="layout">
      <Header type="dashboard" />
      <div className="main-content">
        <Sidebar role="admin" currentPage="/users" />
        <div className="content">
          <h1>all users</h1>
          <UserProvider>
            <OrganizationProvider>
              <UserList />
            </OrganizationProvider>
          </UserProvider>
        </div>
      </div>
    </div>
  );
}
export default UserPage;
