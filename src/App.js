
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import CreateRecipePage from './pages/CreateRecipePage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Layout Component to conditionally render Navbar and Footer
const Layout = ({ children }) => {
  const location = useLocation();

  // List of routes where Navbar and Footer should NOT appear
  const excludeRoutes = ['/login', '/signup'];

  const shouldRenderLayout = !excludeRoutes.includes(location.pathname);

  return (
    <>
      {shouldRenderLayout && <Navbar />}
      <div style={{ minHeight: '80vh' }}> {/* Ensure content doesn't overlap with footer */}
        {children}
      </div>
      {shouldRenderLayout && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap all routes in the Layout component */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/login" element={<LoginPage />} /> {/* No Navbar/Footer */}
        <Route path="/signup" element={<SignUpPage />} /> {/* No Navbar/Footer */}
        <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
        <Route path="/recipe/:id" element={<Layout><RecipeDetailPage /></Layout>} />
        <Route path="/create-recipe" element={<Layout><CreateRecipePage /></Layout>} />
        <Route path="/edit-recipe/:id" element={<Layout><CreateRecipePage /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;