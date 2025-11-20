// src/pages/Home.jsx
import React, { useEffect, useRef, useState } from "react";
import BookCard from "../components/BookCard";
import books from "../data/books";
import { useNavigate } from "react-router-dom";

/**
 * Home page - renders welcome, recommendations, categories, all books.
 * Provides modal for book details (populated from books data).
 */
export default function Home() {
  const [modalBook, setModalBook] = useState(null);
  const navigate = useNavigate();
  const recRef = useRef(null);
  const allRef = useRef(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // optional: restore any UI state
  }, []);

  // Open modal (called from BookCard)
  function openModal(book) {
    setModalBook(book);
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    setModalBook(null);
    document.body.style.overflow = "auto";
  }

  function startReading(book) {
    closeModal();
    navigate(`/reader/${book.id}`);
  }

  function searchBooks(q) {
    setQuery(q);
  }

  const filteredBooks = Object.values(books).filter((b) =>
    b.title.toLowerCase().includes(query.toLowerCase()) ||
    (b.author && b.author.toLowerCase().includes(query.toLowerCase()))
  );

  // helpers for carousel arrows
  function scrollLeft(ref) {
    if (!ref?.current) return;
    ref.current.scrollBy({ left: -300, behavior: "smooth" });
  }
  function scrollRight(ref) {
    if (!ref?.current) return;
    ref.current.scrollBy({ left: 300, behavior: "smooth" });
  }

  return (
    <div className="page home-page">
      {/* Welcome */}
      <section className="welcome-section">
        <h1>
          Welcome to <span className="brand">ELYORA</span>
        </h1>
        <p>Your gateway to infinite stories</p>
        <div className="content-buttons">
          <button>E-Books</button>
          <button>Journals</button>
          <button>Articles</button>
        </div>
      </section>

      {/* Search bar (local) */}
      <div style={{ padding: "12px 24px" }}>
        <input
          placeholder="Search books..."
          value={query}
          onChange={(e) => searchBooks(e.target.value)}
          className="search-input"
          style={{ width: "100%", maxWidth: 480 }}
        />
      </div>

      {/* Recommendations */}
      <section className="recommendations">
        <h2>
          Book Recommendations
          <div className="heading-arrows">
            <button className="scroll-left" onClick={() => scrollLeft(recRef)}>
              <i className="fa-solid fa-chevron-left" />
            </button>
            <button className="scroll-right" onClick={() => scrollRight(recRef)}>
              <i className="fa-solid fa-chevron-right" />
            </button>
          </div>
        </h2>

        <div className="scroll-wrapper">
          <div className="book-card-container" ref={recRef}>
            {filteredBooks.slice(0, 3).map((b) => (
              <BookCard key={b.id} book={b} onOpenModal={openModal} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <h2>Books by Category</h2>
        <div className="category-card-container">
          <div className="category-card" onClick={() => alert("Comics")}>
            Comics
          </div>
          <div className="category-card" onClick={() => alert("Novels")}>
            Novels
          </div>
          <div className="category-card" onClick={() => alert("Study Material")}>
            Study Material
          </div>
          <div className="category-card" onClick={() => alert("Inspiration")}>
            Inspiration
          </div>
          <div className="category-card" onClick={() => alert("Business")}>
            Business
          </div>
          <div className="category-card" onClick={() => alert("Self Improvement")}>
            Self Improvement
          </div>
        </div>
      </section>

      {/* All Books */}
      <section className="all-books">
        <h2>
          All Books
          <div className="heading-arrows">
            <button className="scroll-left" onClick={() => scrollLeft(allRef)}>
              <i className="fa-solid fa-chevron-left" />
            </button>
            <button className="scroll-right" onClick={() => scrollRight(allRef)}>
              <i className="fa-solid fa-chevron-right" />
            </button>
          </div>
        </h2>

        <div className="scroll-wrapper">
          <div className="all-books-container" ref={allRef}>
            {filteredBooks.map((b) => (
              <BookCard key={b.id} book={b} onOpenModal={openModal} />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalBook && (
        <div id="bookModal" className="modal show" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={closeModal}>
              <i className="fa-solid fa-xmark" />
            </span>

            <div className="modal-header">
              <div className="modal-image">
                <img id="modal-book-img" src={modalBook.cover} alt={modalBook.title} />
              </div>

              <div className="modal-info">
                <h2 id="modal-title">{modalBook.title}</h2>
                <p id="modal-author">{modalBook.author}</p>
                <span id="modal-category" className="category-tag">
                  {modalBook.category || modalBook.genre}
                </span>

                <p id="modal-description">{modalBook.description}</p>

                <div className="modal-actions">
                  <button className="start-btn" onClick={() => startReading(modalBook)}>
                    <i className="fa-solid fa-play" /> Start Reading
                  </button>
                  <button
                    className="fav-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      const k = `fav_${modalBook.id}`;
                      const next = localStorage.getItem(k) !== "1";
                      localStorage.setItem(k, next ? "1" : "0");
                      alert(next ? "Added to favourites" : "Removed from favourites");
                    }}
                  >
                    <i className="fa-solid fa-heart" />
                  </button>
                  <button className="download-btn" onClick={() => alert("Download placeholder")}>
                    <i className="fa-solid fa-download" />
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-reviews">
              <h3>Reviews & Ratings</h3>
              <div className="reviews-list">
                {(modalBook.reviews || []).length === 0 ? (
                  <p>No reviews yet — you can add one later.</p>
                ) : (
                  modalBook.reviews.map((r, i) => (
                    <div key={i} className="review">
                      <div className="review-header">
                        <strong>{r.name}</strong>
                        <span className="stars">
                          {"★".repeat(r.stars) + "☆".repeat(5 - r.stars)}
                        </span>
                      </div>
                      <p>{r.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
