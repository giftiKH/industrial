import React, { useState } from "react";
import { List, ListItem, Collapse } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const Sidebar = ({ userRole, onMenuItemClick }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const menuItems = {
    "super-admin": [
      //  { name: "Dashboard", key: "dashboard" },
      { name: "Tasks", subMenus: [{ name: "Task 1", key: "task1" }] },
      { name: "User Data", key: "userData", default: true },
      { name: "School Data", key: "schoolData" },
      { name: "Course Data", key: "courseData" },
    ],
    admin: [
      { name: "Distribution Progres", key: "dis-progres" },
      { name: "Distribution Ratio", key: "dis-ratio", default: true },
      { name: "School Request", key: "allRequest" },
      { name: "Distribution Schedule", key: "dis-schedule" },
      { name: "TextBook", key: "TextBook" },
      { name: "Tasks", subMenus: [{ name: "Task 1", key: "task1" }] },
    ],
    school: [
      { name: "Request Form", key: "requestForm", default: true },
      { name: "Payment", key: "payment" },
      { name: "Schedule", key: "schedule" },
      { name: "Profile", key: "profile" },
    ],
    "sub-city-staff": [
      { name: "Request Form", key: "requestForm", default: true },
      { name: "subciry 1", key: "subciry1" },
      { name: "subciry 2", key: "subciry2" },
      { name: "subciry 3", key: "subciry3" },
    ],
  };

  const userMenus = menuItems[userRole] || [];
  const defaultMenuItem = userMenus.find((item) => item.default) || {};

  const handleMenuItemClick = (menuItemKey) => {
    onMenuItemClick(menuItemKey);
  };

  return (
    <div
      style={{
        width: 240,
        backgroundColor: "#f0f0f0",
        padding: "20px",
        height: "calc(100vh - 100px)",
        overflowY: "auto",
      }}
    >
      <List>
        {userMenus.map((menuItem, index) => (
          <React.Fragment key={index}>
            <ListItem
              button
              onClick={
                menuItem.subMenus
                  ? handleClick
                  : () => handleMenuItemClick(menuItem.key)
              }
            >
              {menuItem.name}
              {menuItem.subMenus && (open ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
            {menuItem.subMenus && (
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {menuItem.subMenus.map((subMenu, subIndex) => (
                    <ListItem
                      key={subIndex}
                      button
                      onClick={() => handleMenuItemClick(subMenu.key)}
                      style={{ paddingLeft: 30 }}
                    >
                      {subMenu.name}
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
