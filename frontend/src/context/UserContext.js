import React, { createContext, useContext, useReducer, useEffect } from "react";
import userServices from "../api/userServices"; // Adjust path as necessary

// Initial state for user context
const initialState = {
  loading: false,
  error: null,
  users: [],
  user: null,
};

// Action types for user actions
const ACTIONS = {
  ADD_USER_REQUEST: "ADD_USER_REQUEST",
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",
  ADD_USER_FAILURE: "ADD_USER_FAILURE",
  EDIT_USER_REQUEST: "EDIT_USER_REQUEST",
  EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
  EDIT_USER_FAILURE: "EDIT_USER_FAILURE",
  DELETE_USER_REQUEST: "DELETE_USER_REQUEST",
  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  DELETE_USER_FAILURE: "DELETE_USER_FAILURE",
  GET_ALL_USERS_REQUEST: "GET_ALL_USERS_REQUEST",
  GET_ALL_USERS_SUCCESS: "GET_ALL_USERS_SUCCESS",
  GET_ALL_USERS_FAILURE: "GET_ALL_USERS_FAILURE",
  GET_USER_BY_ID_REQUEST: "GET_USER_BY_ID_REQUEST",
  GET_USER_BY_ID_SUCCESS: "GET_USER_BY_ID_SUCCESS",
  GET_USER_BY_ID_FAILURE: "GET_USER_BY_ID_FAILURE",
  GET_USERS_BY_ORGANIZATION_REQUEST: "GET_USERS_BY_ORGANIZATION_REQUEST",
  GET_USERS_BY_ORGANIZATION_SUCCESS: "GET_USERS_BY_ORGANIZATION_SUCCESS",
  GET_USERS_BY_ORGANIZATION_FAILURE: "GET_USERS_BY_ORGANIZATION_FAILURE",
  GET_USERS_BY_ROLE_REQUEST: "GET_USERS_BY_ROLE_REQUEST",
  GET_USERS_BY_ROLE_SUCCESS: "GET_USERS_BY_ROLE_SUCCESS",
  GET_USERS_BY_ROLE_FAILURE: "GET_USERS_BY_ROLE_FAILURE",
};

// Reducer function to handle state updates
// Reducer function to handle state updates
const userReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_USER_REQUEST:
    case ACTIONS.EDIT_USER_REQUEST:
    case ACTIONS.DELETE_USER_REQUEST:
    case ACTIONS.GET_ALL_USERS_REQUEST:
    case ACTIONS.GET_USER_BY_ID_REQUEST:
    case ACTIONS.GET_USERS_BY_ORGANIZATION_REQUEST:
    case ACTIONS.GET_USERS_BY_ROLE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ACTIONS.ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload.user], // Ensure state.users is an array
      };
    case ACTIONS.EDIT_USER_SUCCESS:
      // Update logic based on your API response
      return {
        ...state,
        loading: false,
        // Update state accordingly
      };
    case ACTIONS.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user._id !== action.payload.userId), // Ensure state.users is an array
      };
    case ACTIONS.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.users, // Ensure action.payload.users is an array
      };
    case ACTIONS.GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user, // Ensure action.payload.user is correctly set
      };
    case ACTIONS.GET_USERS_BY_ORGANIZATION_SUCCESS:
      // Update logic based on your API response
      return {
        ...state,
        loading: false,
        // Update state accordingly
      };
    case ACTIONS.GET_USERS_BY_ROLE_SUCCESS:
      // Update logic based on your API response
      return {
        ...state,
        loading: false,
        // Update state accordingly
      };
    case ACTIONS.ADD_USER_FAILURE:
    case ACTIONS.EDIT_USER_FAILURE:
    case ACTIONS.DELETE_USER_FAILURE:
    case ACTIONS.GET_ALL_USERS_FAILURE:
    case ACTIONS.GET_USER_BY_ID_FAILURE:
    case ACTIONS.GET_USERS_BY_ORGANIZATION_FAILURE:
    case ACTIONS.GET_USERS_BY_ROLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};


// Create user context
const UserContext = createContext();

// User Provider component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    getAllUsers(); // Fetch users on component mount
  }, []);

  // Example service methods
  const addUser = async (userData) => {
    try {
      dispatch({ type: ACTIONS.ADD_USER_REQUEST });
      const user = await userServices.addUser(userData);
      dispatch({ type: ACTIONS.ADD_USER_SUCCESS, payload: { user } });
    } catch (error) {
      dispatch({ type: ACTIONS.ADD_USER_FAILURE, payload: { error } });
    }
  };

  const editUser = async (id, userData) => {
    try {
      dispatch({ type: ACTIONS.EDIT_USER_REQUEST });
      const user = await userServices.editUser(id, userData);
      dispatch({ type: ACTIONS.EDIT_USER_SUCCESS, payload: { user } });
    } catch (error) {
      dispatch({ type: ACTIONS.EDIT_USER_FAILURE, payload: { error } });
    }
  };

  const deleteUser = async (id) => {
    try {
      dispatch({ type: ACTIONS.DELETE_USER_REQUEST });
      await userServices.deleteUser(id);
      dispatch({ type: ACTIONS.DELETE_USER_SUCCESS, payload: { userId: id } });
    } catch (error) {
      dispatch({ type: ACTIONS.DELETE_USER_FAILURE, payload: { error } });
    }
  };

  const getAllUsers = async () => {
    try {
      dispatch({ type: ACTIONS.GET_ALL_USERS_REQUEST });
      const users = await userServices.getAllUsers();
      dispatch({ type: ACTIONS.GET_ALL_USERS_SUCCESS, payload: { users } });
    } catch (error) {
      dispatch({ type: ACTIONS.GET_ALL_USERS_FAILURE, payload: { error } });
    }
  };

  const getUserById = async (id) => {
    try {
      dispatch({ type: ACTIONS.GET_USER_BY_ID_REQUEST });
      const user = await userServices.getUserById(id);
      dispatch({ type: ACTIONS.GET_USER_BY_ID_SUCCESS, payload: { user } });
    } catch (error) {
      dispatch({ type: ACTIONS.GET_USER_BY_ID_FAILURE, payload: { error } });
    }
  };

  const getUsersByOrganization = async (organizationId) => {
    try {
      dispatch({ type: ACTIONS.GET_USERS_BY_ORGANIZATION_REQUEST });
      const users = await userServices.getUsersByOrganization(organizationId);
      dispatch({
        type: ACTIONS.GET_USERS_BY_ORGANIZATION_SUCCESS,
        payload: { users },
      });
    } catch (error) {
      dispatch({
        type: ACTIONS.GET_USERS_BY_ORGANIZATION_FAILURE,
        payload: { error },
      });
    }
  };

  const getUsersByRole = async (role) => {
    try {
      dispatch({ type: ACTIONS.GET_USERS_BY_ROLE_REQUEST });
      const users = await userServices.getUsersByRole(role);
      dispatch({ type: ACTIONS.GET_USERS_BY_ROLE_SUCCESS, payload: { users } });
    } catch (error) {
      dispatch({ type: ACTIONS.GET_USERS_BY_ROLE_FAILURE, payload: { error } });
    }
  };

  // Expose state and service methods
  const value = {
    state,
    addUser,
    editUser,
    deleteUser,
    getAllUsers,
    getUserById,
    getUsersByOrganization,
    getUsersByRole,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use user context
export const useUserContext = () => {
  return useContext(UserContext);
};
