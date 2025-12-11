import React from 'react';
import { Link } from 'react-router-dom';
// ...existing code...
import '../styles.css';
// ...existing code...

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>BookHaven</h3>
            <p>Your one-stop shop for all things literary. Discover, explore, and indulge in the world of books.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/books">Books</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Categories</h4>
            <ul>
              <li><Link to="/books?category=Classic">Classic</Link></li>
              <li><Link to="/books?category=Fantasy">Fantasy</Link></li>
              <li><Link to="/books?category=Romance">Romance</Link></li>
              <li><Link to="/books?category=Dystopian">Dystopian</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>Email: info@bookhaven.com</p>
            <p>Phone: (123) 456-7890</p>
            <p>Address: 123 Book Street, Literary City</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} BookHaven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
