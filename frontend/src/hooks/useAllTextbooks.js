import { useState, useEffect } from "react";
import textbookServices from "../api/textbookServices";

const useAllTextbooks = () => {
  const [textbooks, setTextbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTextbooks = async () => {
      try {
        const data = await textbookServices.getAllTextbooks();
        setTextbooks(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTextbooks();
  }, []);

  return { textbooks, loading, error };
};

export default useAllTextbooks;
