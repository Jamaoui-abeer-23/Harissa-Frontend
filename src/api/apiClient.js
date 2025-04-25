import axios from 'axios';

// Create an Axios instance with a base URL
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your backend API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token in headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get the JWT token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response; // Return the response data
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized: Please log in again.');
      // Optionally, redirect the user to the login page or clear the token
      localStorage.removeItem('token');
    }
    return Promise.reject(error); // Reject the error for handling in components
  }
);

export default apiClient;