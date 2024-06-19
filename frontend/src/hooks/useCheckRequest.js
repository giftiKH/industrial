// hooks/useCheckRequest.js
import { useEffect, useState } from "react";
import { useTextbookRequestContext } from "../context/TextbookRequestContext";
import tokenDecoder from "../utils/tokenDecoder";

const useCheckRequest = () => {
  const { getAllTextbookRequestsByYear } = useTextbookRequestContext();
  const [requestData, setRequestData] = useState({
    requestId: null,
    submission: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userData = tokenDecoder();
  const organizationId = userData?.organizationId; // Safely access organizationId


  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const requests = await getAllTextbookRequestsByYear(currentYear);
        

        const organizationRequest = requests.find(
          (request) => request.userID?.organization?._id === organizationId
        );
       

        if (organizationRequest) {
          setRequestData({
            requestId: organizationRequest._id,
            submission: organizationRequest.submission,
          });
        } else {
          setRequestData({
            requestId: "no request",
            submission: null,
          });
        }
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [organizationId, currentYear, getAllTextbookRequestsByYear]);

  return { requestData, loading, error };
};

export default useCheckRequest;
