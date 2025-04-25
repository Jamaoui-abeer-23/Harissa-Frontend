import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [authoredRecipes, setAuthoredRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);

        // Fetch authored recipes
        const authoredResponse = await axios.get(`/api/recipes?author=${response.data._id}`);
        setAuthoredRecipes(authoredResponse.data);

        // Fetch favorite recipes
        const favoriteResponse = await axios.get(`/api/favorites`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavoriteRecipes(favoriteResponse.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchUserData();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h1>Profile</h1>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{user.username}</h5>
          <p className="card-text"><strong>Email:</strong> {user.email}</p>
        </div>
      </div>

      <h2>Authored Recipes</h2>
      <div className="row">
        {authoredRecipes.length > 0 ? (
          authoredRecipes.map((recipe) => (
            <div key={recipe._id} className="col-md-4 mb-4">
              <RecipeCard recipe={recipe} />
            </div>
          ))
        ) : (
          <p>No recipes authored yet.</p>
        )}
      </div>

      <h2>Favorites</h2>
      <div className="row">
        {favoriteRecipes.length > 0 ? (
          favoriteRecipes.map((recipe) => (
            <div key={recipe._id} className="col-md-4 mb-4">
              <RecipeCard recipe={recipe} />
            </div>
          ))
        ) : (
          <p>No favorite recipes yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;