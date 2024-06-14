import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import OrganizationPage from "./pages/OrganizationPage";
import AddUserPage from "./pages/AddUserPage";
import AddOrganizationPage from "./pages/AddOrganizationPage";
import TextbookPage from "./pages/TextbookPage";
import AddTextbookPage from "./pages/AddTextbookPage";
import PaymentPage from "./pages/PaymentPage";
import RequestSubmissionPage from "./pages/RequestSubmissionPage";
import RequestDetailPage from "./pages/RequestDetailPage";
import UserPage from "./pages/UserPage.js";
import AllRequestPage from "./pages/AllRequestPage.js";
import AvailableTextbooksPage from "./pages/AvailableTextbooksPage.js";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/organizations" element={<OrganizationPage />} />
        <Route path="/add-user" element={<AddUserPage />} />
        <Route path="/add-organization" element={<AddOrganizationPage />} />
        <Route path="/textbooks" element={<TextbookPage />} />
        <Route path="/add-textbook" element={<AddTextbookPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/request-submission" element={<RequestSubmissionPage />} />
        <Route path="/request-detail" element={<RequestDetailPage />} />
        <Route path="/request-list" element={<AllRequestPage />} />
        <Route
          path="/available-Textbooks"
          element={<AvailableTextbooksPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
