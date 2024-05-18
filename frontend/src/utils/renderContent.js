import React from "react";
import UserTable from "../component/UserTable";
import SchoolData from "../component/SchoolData";
import CourseData from "../component/CourseData";
import Request from "../component/school/Request";
import Invoice from "../component/school/Invoice";
import Schedule from "../component/school/Schedule";

// Map to dynamically associate keys with components
const componentsMap = {
  "super-admin": {
    // defaultComponent: UserTable,
    dashboard: () => <div>Dashboard Content</div>, // Placeholder for dashboard content
    userData: UserTable,
    schoolData: SchoolData,
    courseData: CourseData,
    task1: () => <div>Task 1 Content</div>, // Placeholder for task 1 content
  },
  admin: {
    defaultComponent: UserTable, // You can change this to the appropriate default component for admin
    dashboard: () => <div>{<SchoolData />}</div>,
    staff: UserTable,
    task1: () => <div>Task 1 Content</div>,
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
