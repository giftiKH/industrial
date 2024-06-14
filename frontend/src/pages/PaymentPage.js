import React from "react";
import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar";
import "../index.css";
import InvoiceDetail from "../component/schoolComponet/InvoiceDetail";


function PaymentPage() {
  return (
    <div className="layout">
      <Header type="dashboard" />
      <div className="main-content">
        <Sidebar role="admin" currentPage="/payment" />
        <div className="content">
          <InvoiceDetail />
        </div>
      </div>
    </div>
  );
}
export default PaymentPage;
