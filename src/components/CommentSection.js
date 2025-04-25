import React, { useState } from 'react';
import axios from 'axios';

const CommentSection = ({ recipeId, comments, setComments }) => {
  const [content, setContent] = useState('');

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `/api/comments/${recipeId}/comments`,
        { content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComments([...comments, response.data]); // Add new comment to the list
      setContent(''); // Clear input field
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment. Please try again.');
    }
  };

  return (
    <div className="mt-4">
      <h4>Comments</h4>
      <ul className="list-group mb-3">
        {comments.map((comment) => (
          <li key={comment._id} className="list-group-item">
            <strong>{comment.user.username}</strong>: {comment.content}
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddComment}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Add a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;
