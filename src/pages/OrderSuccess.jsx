import React from 'react';
import { Link } from 'react-router-dom';

// ...existing code...
import '../styles.css';
// ...existing code...

const OrderSuccess = () => {
  return (
    <div className="order-success-page">
      <div className="container">
        <div className="success-content">
          <div className="success-icon">✓</div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your purchase. We've received your order and will begin processing it right away.</p>
          
          <div className="order-details">
            <h2>Order Details</h2>
            <div className="detail-row">
              <span>Order Number:</span>
              <span>BK-{Math.floor(Math.random() * 1000000)}</span>
            </div>
            <div className="detail-row">
              <span>Order Date:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="detail-row">
              <span>Estimated Delivery:</span>
              <span>{new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="next-steps">
            <h2>What's Next?</h2>
            <ol>
              <li>You'll receive a confirmation email shortly</li>
              <li>We'll prepare your books for shipping</li>
              <li>You'll receive tracking information once your order ships</li>
              <li>Your books will arrive within 2-3 business days</li>
            </ol>
          </div>
          
          <div className="success-actions">
            <Link to="/" className="btn btn-primary">Continue Shopping</Link>
            <Link to="/account" className="btn btn-outline">View Order History</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
