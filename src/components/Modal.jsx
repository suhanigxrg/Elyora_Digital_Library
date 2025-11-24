// src/components/Modal.jsx
import React, { useEffect } from "react";
import "../css/style.css";

const Modal = ({ book, isOpen, onClose, onStartReading }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
      const modalContent = document.querySelector(".modal-content");
      if (modalContent) modalContent.scrollTop = 0;
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) onClose && onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) onClose && onClose();
  };

  if (!isOpen || !book) return null;

  const renderStars = (rating) => {
    const full = Math.floor(rating || 0);
    const half = (rating || 0) % 1 !== 0;
    const empty = 5 - Math.ceil(rating || 0);
    return "★".repeat(full) + (half ? "⭐" : "") + "☆".repeat(empty);
  };

  return (
    <div className={`modal ${isOpen ? "show" : ""}`} onClick={handleOverlayClick}>
      <div className="modal-content" role="dialog" aria-modal="true">
        <button className="close-btn" onClick={() => onClose && onClose()}>×</button>

        <div className="modal-header">
          <div className="modal-image">
            <img src={book.cover} alt={book.title} />
          </div>

          <div className="modal-info">
            <h2>{book.title}</h2>
            <p className="modal-author">{book.author}</p>

            <div style={{ margin: "8px 0" }}>
              {book.category && <span className="category-tag">{book.category}</span>}
            </div>

            <p className="modal-description">{book.description}</p>

            <div style={{ marginTop: 12 }}>
              {book.tags && book.tags.map((t) => <span key={t} className="category-tag" style={{ marginRight: 6 }}>{t}</span>)}
            </div>

            <div className="modal-actions" style={{ marginTop: 12 }}>
              <button
                className="start-btn"
                onClick={() => onStartReading && onStartReading(book)}
              >
                <i className="fas fa-play" /> Start Reading
              </button>

              <button
                className="fav-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  const key = `fav_${book.id}`;
                  const next = localStorage.getItem(key) !== "1";
                  localStorage.setItem(key, next ? "1" : "0");
                  e.currentTarget.classList.toggle("active", next);
                }}
                title="Toggle favourite"
              >
                <i className="fas fa-heart" />
              </button>

              <button
                className="download-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  alert("Download clicked (implement logic).");
                }}
                title="Download"
              >
                <i className="fas fa-download" />
              </button>
            </div>
          </div>
        </div>

        <div className="modal-reviews">
          <h3>Reviews & Ratings</h3>
          <div className="ratings-summary">
            <div className="summary-left">
              <div className="average-rating">{book.rating ?? "—"}</div>
              <div className="stars">{renderStars(book.rating ?? 0)}</div>
              <p>{Math.floor(Math.random() * 50) + 10} reviews</p>
            </div>

            <div className="rating-bars">
              <div className="rating-bar"><span>5★</span><div className="bar"><div style={{width:"75%"}}/></div><span>45</span></div>
              <div className="rating-bar"><span>4★</span><div className="bar"><div style={{width:"15%"}}/></div><span>8</span></div>
              <div className="rating-bar"><span>3★</span><div className="bar"><div style={{width:"5%"}}/></div><span>2</span></div>
              <div className="rating-bar"><span>2★</span><div className="bar"><div style={{width:"3%"}}/></div><span>1</span></div>
              <div className="rating-bar"><span>1★</span><div className="bar"><div style={{width:"2%"}}/></div><span>1</span></div>
            </div>
          </div>

          <div className="review-filters">
            <span>Filter:</span>
            <button className="filter-btn active">All</button>
            <button className="filter-btn">5★</button>
            <button className="filter-btn">4★</button>
            <button className="filter-btn">3★</button>
            <button className="filter-btn">2★</button>
            <button className="filter-btn">1★</button>
          </div>

          <div className="reviews-list">
            {(book.reviews || []).length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              (book.reviews || []).map((r, i) => (
                <div key={i} className="review">
                  <div className="review-header">
                    <strong>{r.name}</strong>
                    <span className="stars">{"★".repeat(r.stars) + "☆".repeat(5 - r.stars)}</span>
                  </div>
                  <p>{r.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
