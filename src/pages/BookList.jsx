import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BookCard from '../components/BookCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import '../styles.css';
import { getBooks } from '../services/bookService';

const BookList = () => {
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch books from Firestore
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getBooks();
        setBooks(booksData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Get categories from loaded books
  const categories = [...new Set(books.map(book => book.category))];

  // Handle category from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('all');
    }
  }, [location.search]);

  // Filter books whenever books, selectedCategory, or searchQuery changes
  useEffect(() => {
    let result = books;
    if (selectedCategory !== 'all') {
      result = result.filter(book => book.category === selectedCategory);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
      );
    }
    setFilteredBooks(result);
  }, [books, selectedCategory, searchQuery]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  if (loading) {
    return <div className="container">Loading books...</div>;
  }

  return (
    <div className="book-list-page">
      <div className="container">
        <div className="page-header">
          <h1>Our Books</h1>
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="books-layout">
          <div className="sidebar">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
          <div className="books-content">
            {filteredBooks.length === 0 ? (
              <div className="no-results">
                <h3>No books found</h3>
                <p>Try a different search or category</p>
              </div>
            ) : (
              <div className="books-grid">
                {filteredBooks.map(book => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookList;