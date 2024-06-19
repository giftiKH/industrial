import React from "react";
import useCheckRequest from "../../hooks/useCheckRequest";
import CreateRequestform from "./CreateRequestform";
import StatusReport from "./StatusReport";
import RequestForm from "./RequestForm";

function RequestCon() {
  const { requestData, loading, error } = useCheckRequest();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {requestData.requestId === "no request" ? (
        <CreateRequestform />
      ) : requestData.submission ? (
        <StatusReport requestId={requestData.requestId} />
      ) : (
        <RequestForm requestId={requestData.requestId} />
      )}
    </div>
  );
}

export default RequestCon;
