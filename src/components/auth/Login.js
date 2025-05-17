import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = ({ onLogin }) => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (isNewUser && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Since we aren't doing real validation, we'll just store in localStorage for demo purposes
    const userData = {
      username: formData.username,
      isLoggedIn: true
    };

    localStorage.setItem('moodJournalUser', JSON.stringify(userData));
    
    // Call the onLogin function from props
    onLogin(userData);
    
    // Navigate to home page
    navigate('/');
  };

  const toggleMode = () => {
    setIsNewUser(!isNewUser);
    setError('');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">{isNewUser ? 'Create Account' : 'Welcome Back'}</h2>
          <div className="auth-subtitle">
            {isNewUser 
              ? 'Create an account to start your mood tracking journey' 
              : 'Log in to continue your mood tracking journey'}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="animate-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="animate-input"
            />
          </div>

          {isNewUser && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="animate-input"
              />
            </div>
          )}

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-button">
            {isNewUser ? 'Create Account' : 'Login'}
          </button>
        </form>

        <div className="auth-footer">
          {isNewUser ? (
            <p>Already have an account? <span onClick={toggleMode} className="auth-toggle">Log in</span></p>
          ) : (
            <p>Don't have an account? <span onClick={toggleMode} className="auth-toggle">Sign up</span></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;