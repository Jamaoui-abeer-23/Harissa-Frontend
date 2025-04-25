import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios

// Create the Auth Context
export const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores the current user
  const [token, setToken] = useState(localStorage.getItem('token') || null); // Stores the JWT token
  const [loading, setLoading] = useState(true); // Loading state for fetching user data

  // Function to log in the user
  const login = async (userData) => {
    try {
      const response = await axios.post('/api/auth/login', userData);
      const { token } = response.data;
      localStorage.setItem('token', token); // Save token to localStorage
      setToken(token);
      fetchUserData(); // Fetch user details
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid credentials');
    }
  };

  // Function to register a new user
  const signup = async (userData) => {
    try {
      await axios.post('/api/auth/signup', userData);
      alert('Account created successfully! Please log in.');
    } catch (error) {
      console.error('Sign up failed:', error);
      throw new Error('Failed to create account');
    }
  };

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setToken(null);
    setUser(null);
  };

  // Fetch user data from the backend
  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data); // Set the user data in state
    } catch (error) {
      console.error('Error fetching user data:', error);
      logout(); // Log out if token is invalid
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Check if the user is authenticated on app load
  useEffect(() => {
    if (token) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Provide the auth context values to the app
  const value = {
    user,
    token,
    login,
    signup,
    logout,
    isAuthenticated: !!token, // Boolean indicating if the user is logged in
  };

  if (loading) {
    return <p>Loading...</p>; // Show a loading indicator while fetching user data
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};