import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthRoute = ({ children }) => {
  const token = Cookies.get("jwt_token");

  return token ? <Navigate to="/" /> : children;
};

export default AuthRoute;
