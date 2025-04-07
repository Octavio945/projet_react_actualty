import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import CreatePost from './pages/CreatePost';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <Header isAuthenticated={!!token} onLogout={handleLogout} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm setToken={setToken} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile" element={token ? <Profile /> : <LoginForm setToken={setToken} />} />
          <Route path="/create" element={token ? <CreatePost /> : <LoginForm setToken={setToken} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
