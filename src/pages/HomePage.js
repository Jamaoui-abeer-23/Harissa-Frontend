import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Recipes</h1>
      <div className="row">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="col-md-4 mb-4">
            <div className="card">
              <img src={recipe.imageUrl || 'https://via.placeholder.com/300'} alt={recipe.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.description.slice(0, 50)}...</p>
                <Link to={`/recipe/${recipe._id}`} className="btn btn-primary">
                  View Recipe
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;