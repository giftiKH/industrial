import React from "react";
import Request from "../component/school/Request";
import Invoice from "../component/school/Invoice";
import Schedule from "../component/school/Schedule";
import AllUsers from "../component/admin/AllUsers";
import AllOrg from "../component/admin/AllOrg";
import Profile from "../component/common/Profile";
import UserForm from "../component/admin/UserForm";
import Test from "../component/Test";
import File from "../component/File"
import OrgForm from "../component/admin/OrgForm"
import AddTB from "../component/admin/AddTB";
import TextbookList from "../component/admin/TextbookList";
import RequestList from "../component/subcity/RequestList";



// Map to dynamically associate keys with components
const componentsMap = {
  "super-admin": {
    dashboard: AllUsers,
    allUsers: AllUsers,
    allOrganizations: AllOrg,
    newUser: UserForm,
    textbooks: TextbookList,
    profile: Profile,
    test: Test,
    openFile: File,
    addOrg: OrgForm,
    tbForm: AddTB,
    payment: Invoice,
    requestForm: Request,
    requestList: RequestList,
    schedule: Schedule,
  },
  admin: {
    dashboard: AllUsers, // Placeholder for dashboard content
    allUsers: AllUsers,
    allOrganizations: AllOrg,
    textbooks: TextbookList,
  },
  "school-admin": {
    dashboard: Request,
    requestForm: Request,
    payment: Invoice,
    schedule: Schedule,
    profile: () => <div>basic inforation</div>,
  },
  "sub-city-staff": {
    dashboard: RequestList,
    requestList: RequestList,
    subciry1: () => <div>basic inforation for subciry1</div>,
    subciry2: () => <div>basic inforation for subciry2</div>,
    subciry3: () => <div>basic inforation for subciry3</div>,
  },
};

const renderContent = (selectedKey, userRole, handleButtonClick) => {
  const roleComponents = componentsMap[userRole];

  if (!roleComponents) {
    return <h1>No components found for the specified user role</h1>;
  }

  const SelectedComponent =
    roleComponents[selectedKey] || roleComponents.defaultComponent;

  // Pass the handleButtonClick function as a prop to the selected component
  return <SelectedComponent handleButtonClick={handleButtonClick} />;
};

export default renderContent;

