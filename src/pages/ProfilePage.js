// src/pages/ProfilePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    github: '',
    twitter: '',
    instagram: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: form.username,
      password: form.password,
      profile: {
        username: form.username,
        first_name: form.first_name,
        last_name: form.last_name,
        github: form.github,
        twitter: form.twitter,
        instagram: form.instagram,
      },
    };

    try {
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('User created:', data);
        navigate('/main');
      } else {
        setError(data?.username?.[0] || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className="profile-page">
      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
          required
        />
        <input
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
          required
        />
        <input
          name="github"
          placeholder="GitHub URL"
          value={form.github}
          onChange={handleChange}
        />
        <input
          name="twitter"
          placeholder="Twitter URL"
          value={form.twitter}
          onChange={handleChange}
        />
        <input
          name="instagram"
          placeholder="Instagram URL"
          value={form.instagram}
          onChange={handleChange}
        />
        <button type="submit" className="icon personal">Create Account</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default ProfilePage;
