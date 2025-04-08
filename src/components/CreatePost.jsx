import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/posts`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onPostCreated(res.data);
      setContent('');
    } catch (err) {
      console.error('Erreur lors de la création du post', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-post-container">
      <div className="d-flex align-items-center mb-3">
        <div className="avatar-container me-3">
          <div className="user-avatar">
            <i className="bi bi-person-fill"></i>
          </div>
        </div>
        <h5 className="mb-0">Quoi de neuf ?</h5>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <textarea
            className="form-control post-textarea"
            placeholder="Exprime-toi !"
            id="postContent"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            style={{ height: '100px' }}
          ></textarea>
          <label htmlFor="postContent">Exprime-toi !</label>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className="post-actions"></div>

          <button 
            type="submit" 
            className="btn btn-primary px-4 rounded-pill publish-btn"
            disabled={isSubmitting || !content.trim()}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Publication...
              </>
            ) : (
              <>
                <i className="bi bi-send-fill me-2"></i>
                Publier
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
