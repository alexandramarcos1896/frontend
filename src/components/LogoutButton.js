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

  return (
    <button className="logout-button" onClick={handleLogout}>
      <img src="/menu-icon/logout-svgrepo-com.svg" alt="Logout" />
      <span>Logout</span>
    </button>
    );
};


export default LogoutButton;
