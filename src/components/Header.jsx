import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header = ({ isAuthenticated, onLogout }) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <div className="brand-icon me-2">
              <i className="bi bi-people-fill"></i>
            </div>
            <span className="brand-text">RéseauSocial</span>
          </Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarContent" 
            aria-controls="navbarContent" 
            aria-expanded={!isNavCollapsed ? true : false} 
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            <i className="bi bi-list"></i>
          </button>
          
          <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarContent">
            <div className="d-lg-none mt-3 mb-2">
              <div className="search-bar-mobile">
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-end-0">
                    <i className="bi bi-search"></i>
                  </span>
                  <input 
                    type="text" 
                    className="form-control border-start-0" 
                    placeholder="Rechercher..." 
                  />
                </div>
              </div>
            </div>
            
            <div className="search-bar-desktop d-none d-lg-block mx-auto">
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0">
                  <i className="bi bi-search"></i>
                </span>
                <input 
                  type="text" 
                  className="form-control border-start-0" 
                  placeholder="Rechercher..." 
                />
              </div>
            </div>
            
            <ul className="navbar-nav ms-auto">
              {!isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link nav-btn login-btn" to="/login">
                      <i className="bi bi-box-arrow-in-right me-1"></i> Connexion
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link nav-btn signup-btn" to="/register">
                      <i className="bi bi-person-plus me-1"></i> Inscription
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <a 
                      className="nav-link dropdown-toggle" 
                      href="#" 
                      id="navbarDropdown" 
                      role="button" 
                      data-bs-toggle="dropdown" 
                      aria-expanded="false"
                    >
                      <div className="d-inline-block position-relative me-1">
                        <i className="bi bi-bell-fill"></i>
                        <span className="notification-badge">3</span>
                      </div>
                      Notifications
                    </a>
                    <ul className="dropdown-menu notification-dropdown" aria-labelledby="navbarDropdown">
                      <li><a className="dropdown-item" href="#">Marie a aimé votre post</a></li>
                      <li><a className="dropdown-item" href="#">Pierre a commenté votre photo</a></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><a className="dropdown-item text-center" href="#">Voir toutes les notifications</a></li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      <i className="bi bi-person-circle me-1"></i> Profil
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/create">
                      <i className="bi bi-plus-circle me-1"></i> Créer
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link logout-btn" onClick={onLogout}>
                      <i className="bi bi-box-arrow-right me-1"></i> Déconnexion
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;