import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { books } from '../data/books';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
// ...existing code...
import '../styles.css';
// ...existing code...

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const featuredBooks = books.slice(0, 3);
  const popularBooks = books.slice(0, 6);
  
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Discover Your Next Favorite Book</h1>
            <p>Explore our vast collection of bestsellers, classics, and new releases.</p>
            <SearchBar onSearch={handleSearch} />
            {searchQuery && (
              <p className="search-results">
                Showing results for: <strong>{searchQuery}</strong>
              </p>
            )}
          </div>
        </div>
      </section>
      
      {/* Featured Books */}
      <section className="featured-section">
        <div className="container">
          <h2>Featured Books</h2>
          <div className="featured-books">
            {featuredBooks.map(book => (
              <div key={book.id} className="featured-book">
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Popular Books */}
      <section className="popular-section">
        <div className="container">
          <div className="section-header">
            <h2>Popular Books</h2>
            <Link to="/books" className="btn btn-outline">View All</Link>
          </div>
          <div className="books-grid">
            {popularBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <h2>Shop by Category</h2>
          <div className="categories-grid">
            {['Classic', 'Fantasy', 'Romance', 'Dystopian'].map(category => (
              <Link 
                key={category} 
                to={`/books?category=${category}`} 
                className="category-card"
              >
                <h3>{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

