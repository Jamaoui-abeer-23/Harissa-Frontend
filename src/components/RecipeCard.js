import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="card mb-4">
      {/* Recipe Image */}
      <img
        src={recipe.imageUrl || 'https://via.placeholder.com/300'} // Use placeholder if no image URL exists
        alt={recipe.title} // Alt text for accessibility
        className="card-img-top"
        style={{ height: '200px', objectFit: 'cover' }} // Ensure the image fits nicely in the card
      />

      {/* Card Body */}
      <div className="card-body">
        {/* Recipe Title */}
        <h5 className="card-title">{recipe.title}</h5>

        {/* Recipe Description (Truncated to 50 characters) */}
        <p className="card-text">{recipe.description.slice(0, 50)}...</p>

        {/* Button to View Full Recipe */}
        <Link to={`/recipe/${recipe._id}`} className="btn btn-primary">
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;