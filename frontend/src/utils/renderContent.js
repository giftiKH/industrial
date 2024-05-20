import React from "react";
import Request from "../component/school/Request";
import Invoice from "../component/school/Invoice";
import Schedule from "../component/school/Schedule";
import AllUsers from "../component/admin/AllUsers";
import UsersAACEB from "../component/admin/UsersAACEB";
import UsersSubCity from "../component/admin/UsersSubCity";
import AllOrg from "../component/admin/AllOrg";
import OrgSubCity from "../component/admin/OrgSubCity";
import OrgSchools from "../component/admin/OrgSchools";
import Textbooks from "../component/admin/Textbooks";
import Profile from "../component/common/Profile";

// Map to dynamically associate keys with components
const componentsMap = {
  "super-admin": {
    dashboard: AllUsers, 
    allUsers: AllUsers,
    AACEB: UsersAACEB,
    subCity: UsersSubCity,
    allOrganizations: AllOrg,
    subCities: OrgSubCity,
    schools: OrgSchools,
    textbooks: Textbooks,
    profile: Profile,
  },
  admin: {
    dashboard: AllUsers, // Placeholder for dashboard content
    allUsers: AllUsers,
    AACEB: UsersAACEB,
    subCity: UsersSubCity,
    allOrganizations: AllOrg,
    subCities: OrgSubCity,
    schools: OrgSchools,
    textbooks: Textbooks,
  },
  school: {
    defaultComponent: Request, // You can change this to the appropriate default component for school-admin
    dashboard: () => <div>{<Request />}</div>,
    requestForm: Request,
    payment: Invoice,
    schedule: Schedule,
    profile: () => <div>basic inforation</div>,
  },
  "sub-city-staff": {
    defaultComponent: Request, // You can change this to the appropriate default component for school-admin
    dashboard: () => <div>{<Request />}</div>,
    requestForm: () => <div>basic inforation for subciry1</div>,
    subciry1: () => <div>basic inforation for subciry1</div>,
    subciry2: () => <div>basic inforation for subciry2</div>,
    subciry3: () => <div>basic inforation for subciry3</div>,
  },
};

const renderContent = (selectedKey, userRole) => {
  const roleComponents = componentsMap[userRole];

  if (!roleComponents) {
    return <h1>No components found for the specified user role</h1>;
  }

  const SelectedComponent =
    roleComponents[selectedKey] || roleComponents.defaultComponent;

  return <SelectedComponent />;
};

export default renderContent;
