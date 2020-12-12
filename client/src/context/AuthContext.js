import React, { createContext, useReducer } from "react";
import { authReducer } from "../reducer/authReducer";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [auth, dispatch] = useReducer(authReducer, { user: null });
  const login = (userData) => {
    dispatch({ type: "LOGIN", payload: userData });
  };
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    // value will have value = {login, logout, user}
    <AuthContext.Provider value={{ login, logout, ...auth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
