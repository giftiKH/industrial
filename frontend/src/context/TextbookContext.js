import React, { createContext, useState, useEffect } from "react";
import textbookServices from "../api/textbookServices";

const TextbookContext = createContext();

export const TextbookProvider = ({ children }) => {
  const [textbooks, setTextbooks] = useState([]);
  const [error, setError] = useState("");

  const fetchAllTextbooks = async () => {
    try {
      const data = await textbookServices.getAllTextbooks();
       console.log("Fetched textbook at context:", data);
      setTextbooks(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchAllTextbooks();
  }, []);

  const createTextbook = async (textbookData) => {
    try {
      const newTextbook = await textbookServices.createTextbook(textbookData);
      setTextbooks([...textbooks, newTextbook]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateTextbook = async (id, textbookData) => {
    try {
      const updatedTextbook = await textbookServices.updateTextbook(
        id,
        textbookData
      );
      setTextbooks(
        textbooks.map((textbook) =>
          textbook._id === id ? updatedTextbook : textbook
        )
      );
    } catch (err) {
      setError(err.message); 
    }
  };

  const deleteTextbook = async (id) => {
    try {
      await textbookServices.deleteTextbook(id);
      setTextbooks(textbooks.filter((textbook) => textbook._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const getTextbookById = async (id) => {
    try {
      return await textbookServices.getTextbookById(id);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <TextbookContext.Provider
      value={{
        textbooks,
        error,
        createTextbook,
        updateTextbook,
        deleteTextbook,
        getTextbookById,
      }}
    >
      {children}
    </TextbookContext.Provider>
  );
};

export default TextbookContext;
