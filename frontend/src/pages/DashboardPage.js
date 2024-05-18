// DashboardPage.js
import React, { useState } from "react";
import { Grid } from "@mui/material";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import renderContent from "../utils/renderContent";
import { useUserInfo } from "../utils/authUtils"; // Import useUserInfo hook

const DashboardPage = () => {
  // Use the useUserInfo hook to retrieve user information
  const userInfo = useUserInfo();
  const [selectedKey, setSelectedKey] = useState("dashboard");
  

  const handleMenuItemClick = (menuItemKey) => {
    setSelectedKey(menuItemKey);
  };

  // Ensure userInfo is not null or undefined before accessing its properties
  const userRole = userInfo && userInfo.role ? userInfo.role : "super-admin";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Header isDashboard />
      <div
        style={{
          display: "flex",
          minHeight: "calc(100vh - 100px)",
        }}
      >
        <Sidebar userRole={userRole} onMenuItemClick={handleMenuItemClick} />
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          style={{ flexGrow: 1, padding: "20px" }}
        >
          {renderContent(selectedKey, userRole)}
        </Grid>
      </div>
    </div>
  );
};

export default DashboardPage;
