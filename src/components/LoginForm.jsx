import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { 
        email, 
        password 
      });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Connexion échouée. Vérifie tes identifiants.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card card border-0 shadow-lg">
          <div className="card-body p-4 p-md-5">
            <div className="text-center mb-4">
              <div className="app-logo mb-3">
                <i className="bi bi-people-fill"></i>
              </div>
              <h2 className="login-title">Connexion</h2>
              <p className="text-muted">Heureux de te revoir !</p>
            </div>
            
            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
                <button type="button" className="btn-close" onClick={() => setError('')}></button>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input 
                  type="email" 
                  className="form-control" 
                  id="emailInput"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
                <label htmlFor="emailInput">Adresse email</label>
              </div>
              
              <div className="form-floating mb-3">
                <input 
                  type="password" 
                  className="form-control" 
                  id="passwordInput"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
                <label htmlFor="passwordInput">Mot de passe</label>
              </div>
              
             
              
              <button 
                type="submit" 
                className="btn btn-primary w-100 py-3 login-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Connexion en cours...
                  </>
                ) : (
                  <>
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Se connecter
                  </>
                )}
              </button>
              
             
            </form>
            
            <div className="text-center mt-4">
              <p className="mb-0">
                Pas encore de compte ? 
                <Link to="/register" className="signup-link ms-1">
                  S'inscrire
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;