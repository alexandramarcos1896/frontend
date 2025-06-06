// src/pages/LandingPage.js
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MainMenu.css'; // reuse styling

const LandingPage = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    useEffect(() => {
    const svgs = document.querySelectorAll('.bg-svg');
    svgs.forEach((svg, index) => {
    setTimeout(() => {
    svg.classList.add('show');
    }, index * 100);
    });

    setTimeout(() => {
      const card = document.querySelector('.card');
      if (card) card.classList.add('visible');
    }, svgs.length * 100 + 500);
    }, []);

    const handleLogin = async () => {
      if (!credentials.username || !credentials.password) {
        alert("Please enter username and password.");
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/token/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) throw new Error("Login failed");

        const data = await response.json();
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);

        navigate('/main');
      } catch (err) {
        alert("Invalid credentials");
      }
    };

  return (
    <div>
    {/* Background SVGs */}
      {[...Array(12)].map((_, i) => (
        <img
          key={i}
          className={`bg-svg svg${i + 1}`}
          src={`/data/${getSvgFileName(i + 1)}`}
          alt=""
        />
      ))}

      <main className="card">
        <h1>Welcome!</h1>
        <p>This is your private journal. Start by logging in or creating a new account.</p>

        {!showLoginForm ? (
          <div className="icons">
            <button className="icon login" onClick={() => setShowLoginForm(true)}>Log In</button>
            <button className="icon newuser" onClick={() => navigate('/profile')}>New User</button>
          </div>
        ) : (
          <div className="login-form">
            <input
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={e => setCredentials({ ...credentials, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={e => setCredentials({ ...credentials, password: e.target.value })}
            />
            <button onClick={handleLogin} className="icon personal">Enter</button>
          </div>
        )}
      </main>
    </div>
  );
};

const getSvgFileName = (index) => {
  const filenames = [
    'music-svgrepo-com.svg',
    'anime-away-face-svgrepo-com.svg',
    'valentines-rose-svgrepo-com.svg',
    'inequality-svgrepo-com.svg',
    'books-and-people-svgrepo-com.svg',
    'cherry-svgrepo-com.svg',
    'cherry-tree-svgrepo-com-2.svg',
    'boxing-svgrepo-com.svg',
    'people-who-support-svgrepo-com.svg',
    'shortcake-svgrepo-com.svg',
    'squirrel-svgrepo-com.svg',
    'cherry-tree-svgrepo-com.svg'
  ];
  return filenames[index - 1];
};

export default LandingPage;
