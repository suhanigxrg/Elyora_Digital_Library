// src/pages/Home.jsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import Modal from "../components/Modal";
import books from "../data/books";
import "../css/style.css";

export default function Home() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const recRef = useRef(null);
  const allRef = useRef(null);
  const navigate = useNavigate();

  const booksArray = Object.values(books || {});
  const recommendedBooks = booksArray.slice(0, 3);

  function openBookModal(book) {
    setSelectedBook(book);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBook(null), 200);
  }

  // This runs when user clicks "Start Reading" inside the modal
  function startReading(book) {
    if (!book) return;
    // close modal then navigate
    setIsModalOpen(false);
    setSelectedBook(null);
    navigate(`/reader/${book.id}`);
  }

  function scrollLeft(ref) {
    if (!ref?.current) return;
    ref.current.scrollBy({ left: -300, behavior: "smooth" });
  }
  function scrollRight(ref) {
    if (!ref?.current) return;
    ref.current.scrollBy({ left: 300, behavior: "smooth" });
  }

  const categories = [
    "Fiction",
    "Non-Fiction",
    "Self-Help",
    "Business",
    "Fantasy",
    "Mystery",
    "Romance",
    "Sci-Fi",
  ];

  return (
    <div className="home-page">
      <section className="welcome-section">
        <h1>Welcome to <span className="brand">ELYORA</span></h1>
        <p>Your gateway to infinite stories</p>
      </section>

      <section className="recommendations">
        <h2>
          Book Recommendations
          <div className="heading-arrows">
            <button onClick={() => scrollLeft(recRef)}><i className="fas fa-chevron-left" /></button>
            <button onClick={() => scrollRight(recRef)}><i className="fas fa-chevron-right" /></button>
          </div>
        </h2>

        <div className="scroll-wrapper">
          <div className="book-card-container" ref={recRef}>
            {recommendedBooks.map((b) => (
              <BookCard key={b.id} book={b} onOpenModal={openBookModal} />
            ))}
          </div>
        </div>
      </section>

      <section className="categories">
        <h2>Browse by Category</h2>
        <div className="category-card-container">
          {categories.map((c) => (
            <div key={c} className="category-card" onClick={() => alert(`Category: ${c}`)}>{c}</div>
          ))}
        </div>
      </section>

      <section className="all-books">
        <h2>
          All Books
          <div className="heading-arrows">
            <button onClick={() => scrollLeft(allRef)}><i className="fas fa-chevron-left" /></button>
            <button onClick={() => scrollRight(allRef)}><i className="fas fa-chevron-right" /></button>
          </div>
        </h2>

        <div className="scroll-wrapper">
          <div className="all-books-container" ref={allRef}>
            {booksArray.map((b) => (
              <BookCard key={b.id} book={b} onOpenModal={openBookModal} />
            ))}
          </div>
        </div>
      </section>

      <Modal book={selectedBook} isOpen={isModalOpen} onClose={closeModal} onStartReading={startReading} />
    </div>
  );
}
