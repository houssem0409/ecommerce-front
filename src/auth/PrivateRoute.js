import React  from "react";
import {  Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

const PrivateRoute = ({ children }) => {
    const authed = isAuthenticated() // isauth() returns true or false based on localStorage
    
    return authed ? children : <Navigate to="/signin" />;
  }
export default PrivateRoute;