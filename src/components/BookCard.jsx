// src/components/BookCard.jsx
import React from "react";

export default function BookCard({ book, onOpenModal }) {
  if (!book) return null;

  return (
    <div className="book-card" onClick={() => onOpenModal && onOpenModal(book)}>
      <div className="book-visual">
        <img src={book.cover} alt={book.title} />

        {/* Favorite Button */}
        <button
          className="fav-btn"
          onClick={(e) => {
            e.stopPropagation();
            const key = `fav_${book.id}`;
            const next = localStorage.getItem(key) !== "1";
            localStorage.setItem(key, next ? "1" : "0");
            e.currentTarget.classList.toggle("active", next);
          }}
          aria-label="toggle favourite"
        >
          <i className="fa-regular fa-heart" />
        </button>

        {/* Hover UI (View opens modal) */}
        <div className="hover-ui">
          <button
            className="view-btn"
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal && onOpenModal(book);
            }}
            aria-label="view book"
          >
            <i className="fa-solid fa-eye" /> View Book
          </button>

          <button
            className="icon-btn download-btn"
            onClick={(e) => {
              e.stopPropagation();
              alert("Download clicked — implement your logic.");
            }}
            aria-label="download"
          >
            <i className="fa-solid fa-download" />
          </button>
        </div>
      </div>

      <h3>{book.title}</h3>
      <p>{book.author}</p>

      {book.category && <span className="tag">{book.category}</span>}
      <span className="rating">⭐ {book.rating ?? "—"}</span>
    </div>
  );
}
