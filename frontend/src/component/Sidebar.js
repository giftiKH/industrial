import React, { useState } from "react";
import { List, ListItem, ListItemText, Collapse } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const Sidebar = ({ userRole, onMenuItemClick }) => {
  const [openMenus, setOpenMenus] = useState({});
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleClick = (menuItemName) => {
    setOpenMenus((prevOpenMenus) => ({
      ...prevOpenMenus,
      [menuItemName]: !prevOpenMenus[menuItemName],
    }));
  };

  const handleMenuItemClick = (menuItemKey) => {
    setSelectedMenu(menuItemKey);
    onMenuItemClick(menuItemKey);
  };

  const menuItems = {
    "super-admin": [
      {
        name: "Users",
        subMenus: [
          { name: "All Users", key: "allUsers" },
          { name: "Add User", key: "newUser" },
        ],
      },
      {
        name: "Textbooks",
        subMenus: [
          { name: "Textbook List", key: "textbooks" },
          { name: "Add Textbook", key: "tbForm" },
        ],
      },
      {
        name: "Organization",
        subMenus: [
          { name: "All", key: "allOrganizations" },
          { name: "Add organization", key: "addOrg" },
        ],
      },
      { name: "Profile", key: "profile" },
      { name: "test", key: "test" },
    ],

    admin: [
      { name: "School Request", key: "allRequest" },
      {
        name: "Users",
        subMenus: [
          { name: "All Users", key: "allUsers" },
          { name: "Sub-city", key: "subCity" },
          { name: "schools", key: "schoolUsers" },
        ],
      },
      { name: "Distribution Progres", key: "dis-progres" },
      { name: "Distribution Ratio", key: "dis-ratio", default: true },
      { name: "Distribution Schedule", key: "dis-schedule" },
      { name: "Schools", key: "schools" },
    ],

    "school-admin": [
      { name: "Request Form", key: "requestForm", default: true },
      { name: "Payment", key: "payment" },
      { name: "Schedule", key: "schedule" },
      { name: "Profile", key: "profile" },
    ],

    "sub-city-staff": [
      { name: "Request Form", key: "requestList", default: true },
      { name: "subciry 1", key: "subciry1" },
      { name: "subciry 2", key: "subciry2" },
      { name: "subciry 3", key: "subciry3" },
    ],
  };

  const userMenus = menuItems[userRole] || [];

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
                  ? () => handleClick(menuItem.name)
                  : () => handleMenuItemClick(menuItem.key)
              }
              style={{
                backgroundColor:
                  selectedMenu === menuItem.key ? "#d3d3d3" : "inherit",
              }}
            >
              <ListItemText primary={menuItem.name} />
              {menuItem.subMenus && (
                <>
                  {openMenus[menuItem.name] ? (
                    <ExpandLess style={{ marginLeft: "auto" }} />
                  ) : (
                    <ExpandMore style={{ marginLeft: "auto" }} />
                  )}
                </>
              )}
            </ListItem>
            {menuItem.subMenus && (
              <Collapse
                in={openMenus[menuItem.name]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {menuItem.subMenus.map((subMenu, subIndex) => (
                    <ListItem
                      key={subIndex}
                      button
                      onClick={() => handleMenuItemClick(subMenu.key)}
                      style={{
                        paddingLeft: 30,
                        backgroundColor:
                          selectedMenu === subMenu.key ? "#d3d3d3" : "inherit",
                      }}
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
