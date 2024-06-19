import React from "react";
import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar";
import "../index.css";
import AddUserForm from "../component/adminComponent/AddUserForm";
//import OrganizationDropdown from "../component/common/OrganizationDropdown";
import { OrganizationProvider } from "../context/OrganizationContext";
import { UserProvider } from "../context/UserContext";
import EmailProvider from "../context/EmailContext";


function AddUserPage() {
  return (
    <div className="layout">
      <Header type="dashboard" />
      <div className="main-content">
        <Sidebar role="admin" currentPage="/add-user" />
        <div className="content">
          <OrganizationProvider>
            <UserProvider>
              <EmailProvider>
                <AddUserForm />
              </EmailProvider>
            </UserProvider>
          </OrganizationProvider>
        </div>
      </div>
    </div>
  );
}
export default AddUserPage;
