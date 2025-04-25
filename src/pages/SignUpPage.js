import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/auth.css'; // Import global CSS

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Simulate an API call to create a new user
      await axios.post('/api/auth/signup', { name, email, password });

      // Redirect to the login page after successful signup
      navigate('/login');
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="authPage">
      <div className="formContainer">
        <h1 className="title">Sign Up</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSignUp} className="form">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            required
          />
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
            Sign Up
          </button>
          <p className="linkText">
            Already have an account?{' '}
            <Link to="/login" className="link">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;