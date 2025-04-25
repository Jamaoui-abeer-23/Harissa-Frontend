import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <h1>{recipe.title}</h1>
          <img src={recipe.imageUrl || 'https://via.placeholder.com/600x400'} alt={recipe.title} className="img-fluid mb-4" />
          <p>{recipe.description}</p>
          <h4>Ingredients:</h4>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h4>Steps:</h4>
          <ol>
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Details</h5>
              <p><strong>Prep Time:</strong> {recipe.prepTime} mins</p>
              <p><strong>Cook Time:</strong> {recipe.cookTime} mins</p>
              <p><strong>Servings:</strong> {recipe.servings}</p>
              <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
            </div>
          </div>
        </div>
      </div>
      <Link to="/" className="btn btn-secondary mt-4">Back to Home</Link>
    </div>
  );
};

export default RecipeDetailPage;