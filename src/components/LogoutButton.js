// src/components/LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LogoutButton.css'; // Style it as you like

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/');
  };

  return <button onClick={handleLogout}>Log Out</button>;
};


export default LogoutButton;
