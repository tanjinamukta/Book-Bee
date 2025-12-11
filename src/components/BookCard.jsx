import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
// ...existing code...
import '../styles.css';
// ...existing code...

const BookCard = ({ book }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(book);
  };

  return (
    <div className="book-card">
      <Link to={`/books/${book.id}`}>
        <div className="book-image">
          <img src={book.image} alt={book.title} />
        </div>
        <div className="book-info">
          <h3>{book.title}</h3>
          <p className="author">by {book.author}</p>
          <div className="book-meta">
            <span className="price">${book.price.toFixed(2)}</span>
            <span className="rating">⭐ {book.rating}</span>
          </div>
        </div>
      </Link>
      <button 
        onClick={handleAddToCart} 
        className="btn btn-primary add-to-cart"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default BookCard;
