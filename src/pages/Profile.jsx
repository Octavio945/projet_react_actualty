import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
    
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement du profil', error);
        setError('Impossible de charger les données du profil');
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);
    
  // Style CSS personnalisé
  const styles = {
    profileCard: {
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      border: 'none',
      transition: 'all 0.3s ease'
    },
    profileHeader: {
      background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
      color: 'white',
      padding: '25px',
      position: 'relative'
    },
    avatar: {
      width: '120px',
      height: '120px',
      objectFit: 'cover',
      borderRadius: '50%',
      border: '4px solid white',
      boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
    },
    tabButton: {
      border: 'none',
      borderRadius: '30px',
      padding: '8px 20px',
      margin: '0 5px',
      fontWeight: 'bold',
      transition: 'all 0.3s ease'
    },
    activeTabButton: {
      background: 'white',
      color: '#6e8efb',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
    },
    inactiveTabButton: {
      background: 'rgba(255,255,255,0.2)',
      color: 'white'
    },
    infoIcon: {
      background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
      color: 'white',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '15px',
      boxShadow: '0 5px 10px rgba(0,0,0,0.1)'
    },
    infoLabel: {
      color: '#a777e3',
      fontWeight: 'bold',
      marginBottom: '5px'
    },
    infoValue: {
      fontWeight: 'normal',
      fontSize: '1.1rem',
      paddingLeft: '10px',
      borderLeft: '3px solid #6e8efb'
    },
    editButton: {
      borderRadius: '30px',
      padding: '10px 25px',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
      border: 'none',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease'
    }
  };

  const renderTabContent = () => {
    if (activeTab === 'info') {
      return (
        <div className="fade-in">
          <div className="row g-4 mt-2">
            <div className="col-md-6">
              <div className="d-flex align-items-center mb-3">
                <div style={styles.infoIcon}>
                  <i className="bi bi-person-fill"></i>
                </div>
                <div>
                  <div style={styles.infoLabel}>Nom d'utilisateur</div>
                  <div style={styles.infoValue}>{user.username}</div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center mb-3">
                <div style={styles.infoIcon}>
                  <i className="bi bi-envelope-fill"></i>
                </div>
                <div>
                  <div style={styles.infoLabel}>Email</div>
                  <div style={styles.infoValue}>{user.email}</div>
                </div>
              </div>
            </div>
            {user.phone && (
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-3">
                  <div style={styles.infoIcon}>
                    <i className="bi bi-telephone-fill"></i>
                  </div>
                  <div>
                    <div style={styles.infoLabel}>Téléphone</div>
                    <div style={styles.infoValue}>{user.phone}</div>
                  </div>
                </div>
              </div>
            )}
            {user.location && (
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-3">
                  <div style={styles.infoIcon}>
                    <i className="bi bi-geo-alt-fill"></i>
                  </div>
                  <div>
                    <div style={styles.infoLabel}>Localisation</div>
                    <div style={styles.infoValue}>{user.location}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    } else if (activeTab === 'stats') {
      return (
        <div className="fade-in">
          <div className="row mt-3">
            <div className="col-md-4 text-center">
              <div className="card p-3" style={{ borderRadius: '12px', border: 'none', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                <h1 className="display-4 text-primary fw-bold">12</h1>
                <p className="text-muted">Projets créés</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="card p-3" style={{ borderRadius: '12px', border: 'none', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                <h1 className="display-4 text-success fw-bold">8</h1>
                <p className="text-muted">Projets terminés</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="card p-3" style={{ borderRadius: '12px', border: 'none', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                <h1 className="display-4 text-info fw-bold">4</h1>
                <p className="text-muted">En cours</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };
    
  return (
    <div className="container mt-5">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .hover-lift:hover {
            transform: translateY(-5px);
          }
        `}
      </style>
      
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-grow text-primary mx-1" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <div className="spinner-grow text-secondary mx-1" role="status" style={{ animationDelay: '0.2s' }}>
            <span className="visually-hidden">Chargement...</span>
          </div>
          <div className="spinner-grow text-primary mx-1" role="status" style={{ animationDelay: '0.4s' }}>
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger fade-in" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>{error}
        </div>
      ) : user ? (
        <div className="card fade-in hover-lift" style={styles.profileCard}>
          <div style={styles.profileHeader}>
            <div className="row align-items-center">
              <div className="col-md-3 text-center text-md-start">
                <img 
                  src={user.avatar || 'https://via.placeholder.com/150'} 
                  alt="Avatar" 
                  style={styles.avatar}
                  className="mb-3 mb-md-0"
                />
              </div>
              <div className="col-md-6">
                <h2 className="mb-0">{user.username}</h2>
                <p className="mb-3"><i className="bi bi-envelope me-2"></i>{user.email}</p>
                <div className="d-flex flex-wrap">
                  <button 
                    className="mb-2"
                    style={activeTab === 'info' ? {...styles.tabButton, ...styles.activeTabButton} : {...styles.tabButton, ...styles.inactiveTabButton}}
                    onClick={() => setActiveTab('info')}
                  >
                    <i className="bi bi-person me-2"></i>Informations
                  </button>
                  <button 
                    className="mb-2"
                    style={activeTab === 'stats' ? {...styles.tabButton, ...styles.activeTabButton} : {...styles.tabButton, ...styles.inactiveTabButton}}
                    onClick={() => setActiveTab('stats')}
                  >
                    <i className="bi bi-bar-chart me-2"></i>Statistiques
                  </button>
                </div>
              </div>
              <div className="col-md-3 text-center text-md-end mt-3 mt-md-0">
                <button className="btn text-white" style={styles.editButton}>
                  <i className="bi bi-pencil-square me-2"></i>Modifier
                </button>
              </div>
            </div>
          </div>
          <div className="card-body p-4">
            {renderTabContent()}
          </div>
          <div className="card-footer text-muted p-3 text-center text-md-end">
            <span><i className="bi bi-clock me-2"></i>Membre depuis: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning fade-in" role="alert">
          <i className="bi bi-info-circle me-2"></i>Aucune information de profil disponible
        </div>
      )}
    </div>
  );
};

export default Profile;