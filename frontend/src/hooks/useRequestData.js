import { useState, useEffect } from "react";
import { useTextbookRequestContext } from "../context/TextbookRequestContext";

const useRequestData = (requestId) => {
  const { getTextbookRequest } = useTextbookRequestContext();
  const [requestData, setRequestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const data = await getTextbookRequest(requestId);
        setRequestData(data);
        
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestData();
  }, [requestId, getTextbookRequest]);

  return { requestData, loading, error };
};

export default useRequestData;
