import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/auth.css'; // Import global CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Simulate an API call to authenticate the user
      const response = await axios.post('/api/auth/login', { email, password });
      const token = response.data.token;

      // Save the token to localStorage
      localStorage.setItem('token', token);

      // Redirect to the home page
      navigate('/');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="authPage">
      <div className="formContainer">
        <h1 className="title">Login</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin} className="form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
          <button type="submit" className="button">
            Login
          </button>
          <p className="linkText">
            Don't have an account?{' '}
            <Link to="/signup" className="link">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;