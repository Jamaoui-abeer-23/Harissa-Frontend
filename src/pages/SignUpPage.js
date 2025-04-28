import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/signup', { username, email, password });
      alert('Account created successfully!');
      navigate('/login');
    } catch (error) {
      console.error('Sign up failed:', error);
      alert('Failed to create account. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-danger bg-gradient">
      <div className="card p-4 shadow-lg" style={{ width: '30rem', borderRadius: '1rem' }}>
        <h2 className="text-center mb-4 text-white">Create Your Account</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-white">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-light w-100 fw-bold">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-3 text-white">
          Already have an account? <a href="/login" className="text-light fw-bold">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
