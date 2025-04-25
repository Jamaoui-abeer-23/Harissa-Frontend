import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient'; // Use the centralized API client

const CreateRecipePage = () => {
  const { id } = useParams(); // Get the recipe ID from the URL (for editing)
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]); // List of categories
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [''], // Array for ingredients
    steps: [''], // Array for steps
    prepTime: '',
    cookTime: '',
    servings: '',
    difficulty: 'Easy',
    category: '',
    imageUrl: '',
  });

  // Fetch categories on page load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();

    // If editing a recipe, fetch its details
    if (id) {
      const fetchRecipe = async () => {
        try {
          const response = await apiClient.get(`/recipes/${id}`);
          const { ingredients, steps, ...rest } = response.data;
          setFormData({
            ...rest,
            ingredients: ingredients || [''], // Ensure ingredients is an array
            steps: steps || [''], // Ensure steps is an array
          });
        } catch (error) {
          console.error('Error fetching recipe:', error);
        }
      };
      fetchRecipe();
    }
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle array inputs (ingredients and steps)
  const handleArrayChange = (index, field, value) => {
    const updatedField = [...formData[field]];
    updatedField[index] = value;
    setFormData({ ...formData, [field]: updatedField });
  };

  // Add a new ingredient or step
  const addField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  // Remove an ingredient or step
  const removeField = (index, field) => {
    const updatedField = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updatedField });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Update an existing recipe
        await apiClient.put(`/recipes/${id}`, formData);
        alert('Recipe updated successfully!');
      } else {
        // Create a new recipe
        await apiClient.post('/recipes', formData);
        alert('Recipe created successfully!');
      }
      navigate('/'); // Redirect to the Home Page
    } catch (error) {
      console.error('Error submitting recipe:', error);
      alert('Failed to submit recipe. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h1>{id ? 'Edit Recipe' : 'Create Recipe'}</h1>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            required
          ></textarea>
        </div>

        {/* Ingredients */}
        <div className="mb-3">
          <label className="form-label">Ingredients</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                value={ingredient}
                onChange={(e) => handleArrayChange(index, 'ingredients', e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeField(index, 'ingredients')}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => addField('ingredients')}
          >
            Add Ingredient
          </button>
        </div>

        {/* Steps */}
        <div className="mb-3">
          <label className="form-label">Steps</label>
          {formData.steps.map((step, index) => (
            <div key={index} className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                value={step}
                onChange={(e) => handleArrayChange(index, 'steps', e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeField(index, 'steps')}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => addField('steps')}
          >
            Add Step
          </button>
        </div>

        {/* Prep Time */}
        <div className="mb-3">
          <label htmlFor="prepTime" className="form-label">Prep Time (minutes)</label>
          <input
            type="number"
            className="form-control"
            id="prepTime"
            name="prepTime"
            value={formData.prepTime}
            onChange={handleChange}
            required
          />
        </div>

        {/* Cook Time */}
        <div className="mb-3">
          <label htmlFor="cookTime" className="form-label">Cook Time (minutes)</label>
          <input
            type="number"
            className="form-control"
            id="cookTime"
            name="cookTime"
            value={formData.cookTime}
            onChange={handleChange}
            required
          />
        </div>

        {/* Servings */}
        <div className="mb-3">
          <label htmlFor="servings" className="form-label">Servings</label>
          <input
            type="number"
            className="form-control"
            id="servings"
            name="servings"
            value={formData.servings}
            onChange={handleChange}
            required
          />
        </div>

        {/* Difficulty */}
        <div className="mb-3">
          <label htmlFor="difficulty" className="form-label">Difficulty</label>
          <select
            className="form-select"
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            required
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Category */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            className="form-select"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image URL */}
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">Image URL (optional)</label>
          <input
            type="text"
            className="form-control"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          {id ? 'Update Recipe' : 'Create Recipe'}
        </button>
      </form>
    </div>
  );
};

export default CreateRecipePage;