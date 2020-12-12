import React, { createContext, useReducer } from "react";
import { authReducer } from "../reducer/authReducer";
export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [auth, dispatch] = useReducer(authReducer, {}, () => {
    const user = localStorage.getItem("user");
    return user ? { user: JSON.parse(user) } : { user: null };
  });
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    dispatch({ type: "LOGIN", payload: userData });
  };
  const logout = () => {
    localStorage.removeItem("user");
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
