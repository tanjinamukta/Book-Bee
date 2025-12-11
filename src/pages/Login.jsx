import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-form">
            <h1>Login to BookHaven</h1>
            {error && <div className="auth-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            
            <div className="divider">
              <span>OR</span>
            </div>
            
            <div className="auth-footer">
              <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
              <p><Link to="/forgot-password">Forgot Password?</Link></p>
            </div>
          </div>
          <div className="auth-info">
            <h2>Welcome Back!</h2>
            <p>Login to access your account, view order history, and manage your preferences.</p>
            <div className="auth-features">
              <div className="feature">
                <span className="feature-icon">📚</span>
                <p>Access your personal bookshelf</p>
              </div>
              <div className="feature">
                <span className="feature-icon">🚚</span>
                <p>Track your orders</p>
              </div>
              <div className="feature">
                <span className="feature-icon">💳</span>
                <p>Save payment methods</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;