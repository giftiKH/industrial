import React from "react";

function StatusReport({ requestId }) {
  return (
    <div>
      <h3>Status Report</h3>
      <p>Request ID: {requestId}</p>
      {/* Add additional status report details here */}
    </div>
  );
}

export default StatusReport;
