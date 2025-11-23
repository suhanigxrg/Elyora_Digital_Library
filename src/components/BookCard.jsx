import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BookCard({ book, onOpenModal }) {
  const navigate = useNavigate();
  const [fav, setFav] = useState(() => {
    try {
      return localStorage.getItem(`fav_${book.id}`) === "1";
    } catch {
      return false;
    }
  });

  function toggleFav(e) {
    e.stopPropagation();
    const next = !fav;
    setFav(next);
    try {
      localStorage.setItem(`fav_${book.id}`, next ? "1" : "0");
    } catch {}
  }

  function handleView(e) {
    e.stopPropagation();
    if (onOpenModal) return onOpenModal(book);
    navigate(`/reader/${book.id}`);
  }

  function handleDownload(e) {
    e.stopPropagation();
    alert(`Download requested for "${book.title}". Implement download logic.`);
  }

  return (
    <div className="book-card" onClick={() => navigate(`/reader/${book.id}`)}>
      <div className="book-visual">
        <img src={book.cover} alt={book.title} />
        <button
          className={`fav-btn ${fav ? "active" : ""}`}
          onClick={toggleFav}
          aria-pressed={fav}
          title="Toggle favorite"
        >
          <i className={fav ? "fa-solid fa-heart" : "fa-regular fa-heart"} />
        </button>

        <div className="hover-ui">
          <button
            className="view-btn"
            onClick={handleView}
            data-title={book.title}
            data-author={book.author}
            data-bookid={book.id}
          >
            <i className="fa-solid fa-eye" /> View Book
          </button>

          <button
            className="icon-btn download-btn"
            onClick={handleDownload}
            title="Download"
          >
            <i className="fa-solid fa-download" />
          </button>
        </div>
      </div>

      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <span className="tag">{book.category || book.genre}</span>
      <span className="rating">⭐ {book.rating ?? "—"}</span>
    </div>
  );
}
