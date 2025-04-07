import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const RegisterForm = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        username: form.username,
        email: form.email,
        password: form.password
      });
      
      navigate('/login', { state: { message: 'Inscription réussie ! Vous pouvez maintenant vous connecter.' } });
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Erreur lors de l\'inscription. Veuillez réessayer.'
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
                <i className="bi bi-person-plus-fill"></i>
              </div>
              <h2 className="login-title">Créez votre compte</h2>
              <p className="text-muted">Rejoignez notre communauté dès aujourd'hui</p>
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
                  type="text" 
                  className="form-control" 
                  id="username"
                  name="username"
                  placeholder="JohnDoe"
                  value={form.username}
                  onChange={handleChange} 
                  required 
                />
                <label htmlFor="username">Nom d'utilisateur</label>
              </div>
              
              <div className="form-floating mb-3">
                <input 
                  type="email" 
                  className="form-control" 
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleChange} 
                  required 
                />
                <label htmlFor="email">Adresse email</label>
              </div>
              
              <div className="form-floating mb-3">
                <input 
                  type="password" 
                  className="form-control" 
                  id="password"
                  name="password"
                  placeholder="Mot de passe"
                  value={form.password}
                  onChange={handleChange} 
                  required 
                />
                <label htmlFor="password">Mot de passe</label>
              </div>
              
              <div className="form-floating mb-4">
                <input 
                  type="password" 
                  className="form-control" 
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirmer mot de passe"
                  value={form.confirmPassword}
                  onChange={handleChange} 
                  required 
                />
                <label htmlFor="confirmPassword">Confirmer mot de passe</label>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary w-100 py-3 login-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Inscription en cours...
                  </>
                ) : (
                  <>
                    <i className="bi bi-person-plus me-2"></i>
                    Créer mon compte
                  </>
                )}
              </button>
              
              <div className="social-login mt-4">
                <p className="text-center text-muted mb-3">Ou inscrivez-vous avec</p>
                <div className="d-flex justify-content-center gap-3">
                  <button type="button" className="btn btn-outline-secondary social-btn">
                    <i className="bi bi-google"></i>
                  </button>
                  <button type="button" className="btn btn-outline-secondary social-btn">
                    <i className="bi bi-facebook"></i>
                  </button>
                  <button type="button" className="btn btn-outline-secondary social-btn">
                    <i className="bi bi-twitter-x"></i>
                  </button>
                </div>
              </div>
            </form>
            
            <div className="text-center mt-4">
              <p className="mb-0">
                Déjà inscrit ? 
                <Link to="/login" className="signup-link ms-1">
                  Connectez-vous
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;