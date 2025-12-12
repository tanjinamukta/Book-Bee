import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { books } from '../data/books';
import { useCart } from '../context/CartContext';
import '../styles.css';
import { getBookById, getBooksByCategory } from '../services/bookService';

const BookDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookData = await getBookById(id);
        if (bookData) {
          setBook(bookData);
          
          // Fetch related books
          const related = await getBooksByCategory(bookData.category);
          setRelatedBooks(related.filter(b => b.id !== id).slice(0, 3));
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book:', error);
        setLoading(false);
      }
    };
    
    fetchBook();
  }, [id]);
  

if (loading) {
    return <div className="container">Loading book details...</div>;
  }
  
  if (!book) {
    return (
      <div className="container">
        <div className="not-found">
          <h2>Book Not Found</h2>
          <p>The book you're looking for doesn't exist.</p>
          <Link to="/books" className="btn">Back to Books</Link>
        </div>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(book);
    }
  };
  

  return (
    <div className="book-detail-page">
      <div className="container">
        <div className="book-detail">
          <div className="book-image">
            <img src={book.image} alt={book.title} />
          </div>
          
          <div className="book-info">
            <h1>{book.title}</h1>
            <p className="author">by {book.author}</p>
            <div className="book-meta">
              <span className="price">${book.price.toFixed(2)}</span>
              <span className="rating">⭐ {book.rating}</span>
              <span className="category">{book.category}</span>
            </div>
            
            <div className="description">
              <h3>Description</h3>
              <p>{book.description}</p>
            </div>
            
            <div className="purchase-section">
              <div className="quantity-selector">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="btn btn-sm"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="btn btn-sm"
                >
                  +
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="btn btn-primary add-to-cart-large"
              >
                Add to Cart - ${(book.price * quantity).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
        
        {relatedBooks.length > 0 && (
          <div className="related-books">
            <h2>Related Books</h2>
            <div className="books-grid">
              {relatedBooks.map(book => (
                <div key={book.id} className="related-book">
                  <Link to={`/books/${book.id}`}>
                    <img src={book.image} alt={book.title} />
                    <h3>{book.title}</h3>
                    <p className="author">{book.author}</p>
                    <p className="price">${book.price.toFixed(2)}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
