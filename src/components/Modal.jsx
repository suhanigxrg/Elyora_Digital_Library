import React, { useEffect } from 'react';
import '../css/style.css';

const Modal = ({ book, isOpen, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      // Reset scroll position to top
      const modalContent = document.querySelector('.modal-content');
      if (modalContent) {
        modalContent.scrollTop = 0;
      }
    } else {
      document.body.classList.remove('modal-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Handle click outside modal
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal')) {
      onClose();
    }
  };

  if (!isOpen || !book) return null;

  // Helper function to render stars based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);
    
    return '★'.repeat(fullStars) + (hasHalfStar ? '⭐' : '') + '☆'.repeat(emptyStars);
  };

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        
        {/* MAIN HEADER - Side by Side Layout */}
        <div className="modal-header">
          {/* Left Side - Book Image */}
          <div className="modal-image">
            <img src={book.cover} alt={book.title} />
          </div>

          {/* Right Side - Book Info */}
          <div className="modal-info">
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            
            {/* Category tag - "Novels" */}
            <div>
              <span className="category-tag">Novels</span>
            </div>

            <p>{book.description}</p>

            {/* Additional tags - fiction, romance, fantasy */}
            <div>
              <span className="category-tag">fiction</span>
              <span className="category-tag">romance</span>
              <span className="category-tag">fantasy</span>
            </div>

            {/* Action Buttons */}
            <div className="modal-actions">
              <button className="start-btn">
                <i className="fas fa-play"></i> Start Reading
              </button>
              <button className="fav-btn">
                <i className="fas fa-heart"></i>
              </button>
              <button className="download-btn">
                <i className="fas fa-download"></i>
              </button>
            </div>
          </div>
        </div>

        {/* REVIEWS SECTION - Below the header */}
        <div className="modal-reviews">
          <h3>Reviews & Ratings</h3>

          {/* Ratings Summary */}
          <div className="ratings-summary">
            <div className="summary-left">
              <span>{book.rating}</span>
              <div className="stars">{renderStars(book.rating)}</div>
              <p>{Math.floor(Math.random() * 50) + 10} reviews</p>
            </div>

            <div className="rating-bars">
              <div className="rating-bar">
                <span>5★</span>
                <div className="bar">
                  <div style={{ width: '75%' }}></div>
                </div>
                <span>45</span>
              </div>
              <div className="rating-bar">
                <span>4★</span>
                <div className="bar">
                  <div style={{ width: '15%' }}></div>
                </div>
                <span>8</span>
              </div>
              <div className="rating-bar">
                <span>3★</span>
                <div className="bar">
                  <div style={{ width: '5%' }}></div>
                </div>
                <span>2</span>
              </div>
              <div className="rating-bar">
                <span>2★</span>
                <div className="bar">
                  <div style={{ width: '3%' }}></div>
                </div>
                <span>1</span>
              </div>
              <div className="rating-bar">
                <span>1★</span>
                <div className="bar">
                  <div style={{ width: '2%' }}></div>
                </div>
                <span>1</span>
              </div>
            </div>
          </div>

          {/* Review Filters */}
          <div className="review-filters">
            <span>Filter:</span>
            <button className="filter-btn active">All</button>
            <button className="filter-btn">5★</button>
            <button className="filter-btn">4★</button>
            <button className="filter-btn">3★</button>
            <button className="filter-btn">2★</button>
            <button className="filter-btn">1★</button>
          </div>

          {/* Reviews List */}
          <div className="reviews-list">
            <div className="review">
              <div className="review-header">
                <strong>Nia</strong>
                <span className="stars">★★★★★</span>
              </div>
              <p>Loved the pacing and magical elements!</p>
            </div>
            <div className="review">
              <div className="review-header">
                <strong>Arjun</strong>
                <span className="stars">★★★★★</span>
              </div>
              <p>Great characters and world-building</p>
            </div>
            <div className="review">
              <div className="review-header">
                <strong>Maya</strong>
                <span className="stars">★★★★★</span>
              </div>
              <p>Captivating story, couldn't put it down</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;