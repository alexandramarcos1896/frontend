import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('access');

  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000; // JWT 'exp' is in seconds

    if (decoded.exp < now) {
      localStorage.removeItem('access'); // Clean up
      return <Navigate to="/" />;
    }
  } catch (err) {
    console.error("Invalid token:", err);
    localStorage.removeItem('access');
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
