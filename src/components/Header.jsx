import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { user, userProfile, logout } = useAuth();
  const { getCartCount } = useCart();

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <h1>BookHaven</h1>
        </Link>
        
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        
        <div className="header-actions">
          <Link to="/cart" className="cart-icon">
            🛒 Cart ({getCartCount()})
          </Link>
          
          {user ? (
            <div className="user-menu">
              <div className="user-dropdown">
                <button className="user-btn">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.name} className="user-avatar" />
                  ) : (
                    <div className="user-avatar-placeholder">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span>{user.name}</span>
                </button>
                <div className="dropdown-content">
                  <Link to="/profile">My Profile</Link>
                  <Link to="/orders">My Orders</Link>
                  {userProfile?.role === 'admin' && (
                    <Link to="/admin">Admin Dashboard</Link>
                  )}
                  <button onClick={logout} className="logout-btn">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/signup" className="btn">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;