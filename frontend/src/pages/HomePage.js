import BasicInfo from "../component/common/BasicInfo"
import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar";
import { UserProvider } from "../context/UserContext";

import "../index.css";

function HomePage() {
  return (
    <div>
      <div className="layout">
        <Header type="dashboard" />
        <div className="main-content">
          <Sidebar role="admin" currentPage="/add-textbook" />
          <div className="content">
            <UserProvider>
              <BasicInfo />
            </UserProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage