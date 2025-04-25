import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snacks'];
  const pages = ['Home', 'About', 'Contact', 'Profile', 'Create Recipe'];

  return (
    <div
      className="bg-light text-dark py-5"
      style={{
        boxShadow: '0px -4px 15px rgba(0, 0, 0, 0.1)', // Shadow for the entire footer
        marginTop: '50px', // Space above the footer
      }}
    >
      {/* Top Section */}
      <div className="container">
        <div className="row">
          {/* Left Section */}
          <div className="col-md-4 text-center text-md-start">
            {/* Logo */}
            <img
              src="/assets/logo.png" // Replace with your actual logo path
              alt="Harissa Hub Logo"
              style={{ height: '100px' }} // Adjust size as needed
              className="mb-3"
            />
            {/* Newsletter */}
            <h6
              className="fw-bold mb-3"
              style={{
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
              Subscribe to Our Newsletter
            </h6>
            <form className="d-flex">
              <input
                type="email"
                className="form-control me-2"
                placeholder="Enter your email"
                required
              />
              <button type="submit" className="btn btn-danger">
                Subscribe
              </button>
            </form>
          </div>

          {/* Center Section */}
          <div className="col-md-4 text-center">
            <h6
              className="fw-bold mb-3"
              style={{
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
              Categories
            </h6>
            <ul className="list-unstyled">
              {categories.map((category, index) => (
                <li key={index} className="mb-2">
                  <a
                    href="#"
                    className="text-decoration-none text-dark"
                    style={{
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
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section */}
          <div className="col-md-4 text-center">
            <h6
              className="fw-bold mb-3"
              style={{
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
              Pages
            </h6>
            <ul className="list-unstyled">
              {pages.map((page, index) => (
                <li key={index} className="mb-2">
                  <a
                    href="#"
                    className="text-decoration-none text-dark"
                    style={{
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
                    {page}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <hr className="my-4 mx-auto w-75" style={{ borderTop: '3px solid rgba(0, 0, 0, 0.1)' }} />

      {/* Bottom Section */}
      <div className="container text-center mt-4">
        {/* Social Media Icons */}
        <div className="d-flex justify-content-center gap-4 mb-4">
          {[faFacebook, faInstagram, faTwitter, faYoutube].map((icon, index) => (
            <a
              key={index}
              href="https://github.com/Jamaoui-abeer-23"
              className="text-decoration-none text-dark fs-4"
              style={{
                transition: 'all 0.3s ease',
                borderRadius: '50%',
                padding: '10px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#D32F2F'; // Red on hover
                e.target.style.textShadow = '2px 2px 8px rgba(0, 0, 0, 0.3)';
                e.target.style.backgroundColor = '#FFE0E0'; // Light red background
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#000'; // Revert to black
                e.target.style.textShadow = 'none';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              <FontAwesomeIcon icon={icon} />
            </a>
          ))}
        </div>

        {/* Separator Line */}
        <hr className="my-4 mx-auto w-75" style={{ borderTop: '3px solid rgba(0, 0, 0, 0.1)' }} />

        {/* Copyright */}
        <p className="mb-0 small text-muted">
          &copy; {new Date().getFullYear()} Harissa Hub. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;