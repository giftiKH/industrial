import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  useTheme,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import "../../index.css";

// Import the tokenDecoder function
import tokenDecoder from "../../utils/tokenDecoder";

const Sidebar = ({ currentPage }) => {
  const theme = useTheme();
  const location = useLocation();
  const [openCategory, setOpenCategory] = useState(null);
  const [userRole, setUserRole] = useState("");

  /*
  "super-admin",
      "AACEB-staff", 
      "admin",
      "sub-city-staff",
      "private-school-admin",
      "public-school-admin",
      
  */

  useEffect(() => {
    // Decode the token and extract the user's role
    const decodedToken = tokenDecoder();
    if (decodedToken) {
      setUserRole(decodedToken.role);
    }
  }, []);

  const handleToggleCategory = (category) => {
    setOpenCategory((prevOpenCategory) =>
      prevOpenCategory === category ? null : category
    );
  };

  const menuItems = [
    {
      icon: <GroupIcon />,
      text: "Users",
      category: "users",
      route: "#",
      roles: ["super-admin"],
      children: [
        {
          icon: <GroupIcon />,
          text: "Users",
          route: "/users",
          roles: ["super-admin"],
        },
        {
          icon: <AddCircleIcon />,
          text: "Add User",
          route: "/add-user",
          roles: ["super-admin"],
        },
      ],
    },
    {
      icon: <CorporateFareIcon />,
      text: "Organizations",
      category: "organizations",
      route: "#",
      roles: ["super-admin"],
      children: [
        {
          icon: <CorporateFareIcon />,
          text: "Organizations",
          route: "/organizations",
          roles: ["super-admin"],
        },
        {
          icon: <AddCircleIcon />,
          text: "Add Organization",
          route: "/add-organization",
          roles: ["super-admin"],
        },
      ],
    },
    {
      icon: <CollectionsBookmarkIcon />,
      text: "Textbooks",
      category: "textbooks",
      route: "#",
      roles: ["AACEB-staff", "super-admin"],
      children: [
        {
          icon: <CollectionsBookmarkIcon />,
          text: "Textbooks",
          route: "/textbooks",
          roles: ["AACEB-staff", "super-admin"],
        },
        {
          icon: <AddCircleIcon />,
          text: "Add Textbook",
          route: "/add-textbook",
          roles: ["AACEB-staff", "super-admin"],
        },
      ],
    },
    {
      icon: <AttachMoneyIcon />,
      text: "Payments",
      route: "/payment",
      roles: ["private-school-admin", "super-admin"],
    },
    {
      text: "Request Form",
      route: "/request-submission",
      roles: ["private-school-admin", "public-school-admin", "super-admin"],
    },
    {
      text: "Request List",
      route: "/request-list",
      roles: ["sub-city-staff", "super-admin"],
    },
    {
      icon: <CollectionsBookmarkIcon />,
      text: "Available Textbook",
      route: "/available-Textbooks",
      roles: ["AACEB-staff", "super-admin"],
    },
    {
      text: "test list",
      route: "/test",
      roles: ["super-admin"],
    },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <Box className="sidebar">
      <List>
        {filteredMenuItems.map((item, index) => (
          <div key={index}>
            <ListItem
              button
              component={item.route === "#" ? "div" : Link}
              to={item.route !== "#" ? item.route : undefined}
              onClick={
                item.route === "#"
                  ? () => handleToggleCategory(item.category)
                  : undefined
              }
              sx={{
                backgroundColor:
                  location.pathname === item.route
                    ? theme.palette.primary.light
                    : "inherit",
                "&:hover": {
                  backgroundColor: theme.palette.primary.light,
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
              {item.children &&
                (openCategory === item.category ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                ))}
            </ListItem>
            {item.children && (
              <Collapse
                in={openCategory === item.category}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {item.children.map((child, childIndex) => (
                    <ListItem
                      button
                      key={childIndex}
                      component={Link}
                      to={child.route}
                      sx={{
                        pl: 4,
                        backgroundColor:
                          location.pathname === child.route
                            ? theme.palette.primary.light
                            : "inherit",
                        "&:hover": {
                          backgroundColor: theme.palette.primary.light,
                        },
                      }}
                    >
                      <ListItemIcon>{child.icon}</ListItemIcon>
                      <ListItemText primary={child.text} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
