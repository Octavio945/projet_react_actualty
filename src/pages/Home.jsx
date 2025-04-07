import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`);
        setPosts(res.data);
      } catch (err) {
        console.error('Erreur de chargement des posts', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="home-container">
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            {/* Section de création de post avec effet shadow */}
            <div className="card shadow-sm mb-4 create-post-card border-0 rounded-3">
              <div className="card-body">
                <CreatePost onPostCreated={newPost => setPosts([newPost, ...posts])} />
              </div>
            </div>
            
            {/* Titre de section avec style personnalisé */}
            <div className="d-flex align-items-center mb-3">
              <h2 className="news-feed-title">Fil d'actualités</h2>
              <div className="feed-divider flex-grow-1 ms-3"></div>
            </div>
            
            {/* État de chargement */}
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-grow text-primary" role="status">
                  <span className="visually-hidden">Chargement...</span>
                </div>
              </div>
            ) : posts.length === 0 ? (
              <div className="card shadow-sm border-0 rounded-3">
                <div className="card-body text-center py-5">
                  <i className="bi bi-inbox-fill display-1 text-secondary"></i>
                  <p className="mt-3 text-muted">Aucun post disponible. Sois le premier à publier !</p>
                </div>
              </div>
            ) : (
              <div className="posts-container">
                {posts.map(post => (
                  <div className="mb-4 post-card-wrapper" key={post.id}>
                    <Post post={post} showComments={true} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;