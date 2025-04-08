import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth'
const Post = ({ post, showComments = false }) => {
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [likes, setLikes] = useState(post.Likes?.length || 0);
  const [liked, setLiked] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [processingLike, setProcessingLike] = useState(false);

  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  useEffect(() => {
    if (showComments) {
      const fetchComments = async () => {
        setLoadingComments(true);
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments/post/${post.id}`);
          setComments(res.data);
        } catch (err) {
          console.error('Erreur de chargement des commentaires', err);
        } finally {
          setLoadingComments(false);
        }
      };
      fetchComments();
    }

    const checkIfLiked = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/${post.id}/likes`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLiked(res.data.liked);
        setLikes(res.data.count);
      } catch (err) {
        console.error('Erreur lors du chargement des likes', err);
      }
    };
    checkIfLiked();
  }, [post.id, showComments]);

  const handleCommentSubmit = async e => {
    e.preventDefault();

    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    if (!newComment.trim()) return;

    setSubmittingComment(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/comments`,
        { content: newComment, PostId: post.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(prev => [res.data, ...prev]);
      setNewComment('');
      reloadComments();
    } catch (err) {
      console.error("Erreur lors de l'envoi du commentaire", err);
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    if (processingLike) return;

    setProcessingLike(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/posts/${post.id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setLiked(res.data.liked);
      setLikes(res.data.count);
    } catch (err) {
      console.error('Erreur lors du like/unlike', err);
    } finally {
      setProcessingLike(false);
    }
  };

  const visibleComments = showAllComments ? comments : comments.slice(0, 3);
  const hasMoreComments = comments.length > 3;

  const reloadComments = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments/post/${post.id}`);
      setComments(res.data);
    } catch (err) {
      console.error('Erreur lors du rechargement des commentaires', err);
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-author">
          <div className="author-avatar">
            <i className="bi bi-person-fill"></i>
          </div>
          <div className="author-info">
            <Link to={`/profile/${post.UserId}`} className="author-name">
              {post.User?.username || `Utilisateur #${post.UserId}`}
            </Link>
            <span className="post-time">{formatDate(post.createdAt || new Date())}</span>
          </div>
        </div>
      </div>

      <div className="post-content">
        {post.content}
      </div>

      <div className="post-actions">
        <button 
          onClick={handleLike} 
          className={`btn-action ${liked ? 'liked' : ''}`}
          disabled={processingLike}
        >
          <i className={`bi ${liked ? 'bi-heart-fill' : 'bi-heart'}`}></i>
          <span>{likes}</span>
        </button>
        <button className="btn-action">
          <i className="bi bi-chat"></i>
          <span>{comments.length}</span>
        </button>
      </div>

      {showComments && (
        <div className="post-comments">
          <div className="comments-header">
            <h6 className="comments-title">Commentaires</h6>
            {hasMoreComments && (
              <button 
                className="btn-view-comments" 
                onClick={() => setShowAllComments(!showAllComments)}
              >
                {showAllComments ? 'Voir moins' : `Voir tous (${comments.length})`}
              </button>
            )}
          </div>

          {loadingComments ? (
            <div className="comments-loading">
              <div className="spinner-border spinner-border-sm text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
              <span>Chargement des commentaires...</span>
            </div>
          ) : comments.length === 0 ? (
            <p className="no-comments">Sois le premier à commenter ce post !</p>
          ) : (
            <div className="comments-list">
              {visibleComments.map(c => <Comment key={c.id} comment={c} />)}
            </div>
          )}

          <form onSubmit={handleCommentSubmit} className="comment-form">
            <div className="comment-avatar">
              <i className="bi bi-person-fill"></i>
            </div>
            <div className="comment-input-container">
              <input
                type="text"
                className="comment-input"
                placeholder="Écrire un commentaire..."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                required
              />
              <button 
                className="btn-send-comment" 
                type="submit"
                disabled={submittingComment || !newComment.trim()}
              >
                {submittingComment ? (
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Envoi...</span>
                  </div>
                ) : (
                  <i className="bi bi-send-fill"></i>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
