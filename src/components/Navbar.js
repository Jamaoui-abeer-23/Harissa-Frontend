import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false); // Track scroll state
  const token = localStorage.getItem('token'); // Check if the user is logged in

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the JWT token
    navigate('/login'); // Redirect to the login page
  };

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
  className="navbar fixed-top bg-white" // Always white background
  style={{
    transition: 'box-shadow 0.3s ease', // Smooth shadow transition
    boxShadow: scrolled ? '0px 4px 10px rgba(0, 0, 0, 0.1)' : 'none', // Shadow when scrolled
    padding: '0',
  }}
>
      {/* First Line */}
      <div
        className="container-fluid d-flex justify-content-between align-items-center py-3"
        style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}
      >
        {/* App Name */}
        <div className="d-flex align-items-center ps-4">
          <span
            style={{
              fontFamily: "'Faculty-Glyphic', serif",
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#D32F2F', // Deep red for elegance
              transition: 'all 0.3s ease', // Smooth hover effect
            }}
            onMouseEnter={(e) => {
              e.target.style.textShadow = '2px 2px 8px rgba(0, 0, 0, 0.3)';
              e.target.style.color = '#B71C1C'; // Darker red on hover
            }}
            onMouseLeave={(e) => {
              e.target.style.textShadow = 'none';
              e.target.style.color = '#D32F2F'; // Revert to original color
            }}
          >
            Harissa Hub
          </span>
        </div>

        {/* Logo */}
        <div className="flex-grow-1 text-center">
        <img
  src="/assets/logo.png" // Path to your logo
  alt="Harissa Hub Logo"
  style={{
    height: '100px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Shadow for the logo
    borderRadius: '50%', // Makes the shadow circular
    transition: 'all 0.3s ease',
  }}
  onMouseEnter={(e) => {
    e.target.style.boxShadow = '0px 6px 15px rgba(0, 0, 0, 0.2)'; // Stronger shadow on hover
  }}
  onMouseLeave={(e) => {
    e.target.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.1)'; // Revert to original shadow
  }}
/>
        </div>

        {/* Login / Sign Up */}
        <div className="d-flex gap-3 pe-4">
          {!token ? (
            <>
              <Link to="/login" className="btn btn-outline-danger">
                Login
              </Link>
              <Link to="/signup" className="btn btn-danger">
                Sign Up
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Second Line */}
      <div className="container-fluid bg-light py-2">
        <div className="d-flex justify-content-center w-100">
          {/* Navbar Links */}
          <ul className="navbar-nav d-flex flex-row gap-4 justify-content-center">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link text-dark fw-semibold"
                style={{
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#D32F2F'; // Red on hover
                  e.target.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#000'; // Revert to black
                  e.target.style.textDecoration = 'none';
                }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                className="nav-link text-dark fw-semibold"
                style={{
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#D32F2F';
                  e.target.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#000';
                  e.target.style.textDecoration = 'none';
                }}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contact"
                className="nav-link text-dark fw-semibold"
                style={{
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#D32F2F';
                  e.target.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#000';
                  e.target.style.textDecoration = 'none';
                }}
              >
                Contact
              </Link>
            </li>
            {token && (
              <>
                <li className="nav-item">
                  <Link
                    to="/profile"
                    className="nav-link text-danger fw-bold"
                    style={{
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.textShadow = '2px 2px 8px rgba(0, 0, 0, 0.3)';
                      e.target.style.color = '#B71C1C'; // Darker red on hover
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.textShadow = 'none';
                      e.target.style.color = '#D32F2F'; // Revert to original color
                    }}
                  >
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/create-recipe"
                    className="nav-link text-danger fw-bold"
                    style={{
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.textShadow = '2px 2px 8px rgba(0, 0, 0, 0.3)';
                      e.target.style.color = '#B71C1C'; // Darker red on hover
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.textShadow = 'none';
                      e.target.style.color = '#D32F2F'; // Revert to original color
                    }}
                  >
                    Create Recipe
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;