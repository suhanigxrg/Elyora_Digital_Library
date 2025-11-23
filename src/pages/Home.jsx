import React, { useState } from 'react';
import Modal from '../components/Modal';
// Import your book data
import books from '../data/books';

const Home = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Convert books object to array for easier mapping
  const booksArray = Object.values(books);

  // Get only first 3 books for recommendations
  const recommendedBooks = booksArray.slice(0, 3);

  // Categories data
  const categories = [
    'Fiction',
    'Non-Fiction',
    'Self-Help',
    'Business',
    'Fantasy',
    'Mystery',
    'Romance',
    'Sci-Fi'
  ];

  // Function to open modal
  const openBookModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    // Optional: Clear selected book after animation
    setTimeout(() => setSelectedBook(null), 300);
  };

  return (
    <div className="home-page">
      {/* Welcome Section */}
      <section className="welcome-section">
        <h1>Welcome to <span className="brand">ELYORA</span></h1>
        <p>Your gateway to infinite stories</p>
        <div className="content-buttons">
          <button>E-Books</button>
          <button>Journals</button>
          <button>Articles</button>
        </div>
      </section>

      {/* Recommendations Section - ONLY 3 BOOKS */}
      <section className="recommendations">
        <h2>
          Book Recommendations
          <div className="heading-arrows">
            <button><i className="fas fa-chevron-left"></i></button>
            <button><i className="fas fa-chevron-right"></i></button>
          </div>
        </h2>
        <div className="scroll-wrapper">
          <div className="book-card-container">
            {recommendedBooks.map((book) => (
              <div key={book.id} className="book-card">
                <div className="book-visual">
                  <img src={book.cover} alt={book.title} />
                  
                  {/* Hover UI */}
                  <div className="hover-ui">
                    <button 
                      className="view-btn"
                      onClick={() => openBookModal(book)}
                    >
                      <i className="fas fa-book-open"></i> View Book
                    </button>
                    <button className="icon-btn">
                      <i className="fas fa-download"></i>
                    </button>
                  </div>

                  {/* Favorite Button */}
                  <button className="fav-btn">
                    <i className="far fa-heart"></i>
                  </button>
                </div>

                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <span className="tag">{book.totalChapters} Chapters</span>
                <span className="rating">★ {book.rating}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Browse by Category</h2>
        <div className="category-card-container">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              {category}
            </div>
          ))}
        </div>
      </section>

      {/* All Books Section */}
      <section className="all-books">
        <h2>
          All Books
          <div className="heading-arrows">
            <button><i className="fas fa-chevron-left"></i></button>
            <button><i className="fas fa-chevron-right"></i></button>
          </div>
        </h2>
        <div className="scroll-wrapper">
          <div className="all-books-container">
            {booksArray.map((book) => (
              <div key={book.id} className="book-card">
                <div className="book-visual">
                  <img src={book.cover} alt={book.title} />
                  
                  <div className="hover-ui">
                    <button 
                      className="view-btn"
                      onClick={() => openBookModal(book)}
                    >
                      <i className="fas fa-book-open"></i> View Book
                    </button>
                    <button className="icon-btn">
                      <i className="fas fa-download"></i>
                    </button>
                  </div>

                  <button className="fav-btn">
                    <i className="far fa-heart"></i>
                  </button>
                </div>

                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <span className="tag">{book.totalChapters} Chapters</span>
                <span className="rating">★ {book.rating}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Component */}
      <Modal 
        book={selectedBook} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default Home;