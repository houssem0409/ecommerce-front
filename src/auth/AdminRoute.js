import React  from "react";
import {  Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

const AdminRoute = ({ children }) => {
    // isauth() returns true or false based on localStorage
    
    return isAuthenticated().user.role === 1 ? children : <Navigate to="/signin" />;
  }
export default AdminRoute;