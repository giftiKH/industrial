import React, { createContext, useContext, useReducer } from "react";
import userServices from "../api/userServices"; // Adjust path as necessary

// Define initial state for the user context
const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

// Define action types
const ACTIONS = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGOUT: "LOGOUT",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
};

// Define reducer function to handle state updates
const userReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };
    case ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
      };
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Create the AuthContext
const AuthContext = createContext();

// Define AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Login function
  const login = async (email, password) => {
    try {
      dispatch({ type: ACTIONS.LOGIN_REQUEST });
      const data = await userServices.login(email, password);
      dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ACTIONS.LOGIN_FAILURE,
        payload: { error: error.message },
      });
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await userServices.logout();
      dispatch({ type: ACTIONS.LOGOUT });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        loading: state.loading,
        error: state.error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};
