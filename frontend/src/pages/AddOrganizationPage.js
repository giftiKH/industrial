import AddOrganizationForm from "../component/adminComponent/AddOrganizationForm";
import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar";
import { OrganizationProvider } from "../context/OrganizationContext";
import "../index.css"

function AddOrganizationPage() {
  return (
    <div className="layout">
      <Header type="dashboard" />

      <div className="main-content">
        <Sidebar role="admin" currentPage="/add-organization" />
        <div className="content">
          <OrganizationProvider>
            <AddOrganizationForm />
          </OrganizationProvider>
        </div>
      </div>
    </div>
  );
}
export default AddOrganizationPage


