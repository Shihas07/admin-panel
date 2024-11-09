import React from 'react';
import { useNavigate, Navigate } from "react-router-dom";

export default function ProtectRoute({ children }) {
  const isAuthenticated = JSON.parse(localStorage.getItem("adminDetails"));

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
