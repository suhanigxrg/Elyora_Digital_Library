// src/components/Modal.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/style.css";

/**
 * Modal component
 * Props:
 *  - book: book object { id, title, author, cover, description, rating, tags, reviews, ... }
 *  - isOpen: boolean
 *  - onClose: function
 *
 * Behavior:
 *  - prevents body scroll when open
 *  - toggles favorite & download and writes both:
 *      1) centralized array in localStorage ('favorites' / 'downloads')
 *      2) per-book key localStorage.setItem(`fav_${id}`, '1'|'0'), same for download
 *  - start reading navigates to /reader/:bookId
 */

const Modal = ({ book, isOpen, onClose }) => {
  const navigate = useNavigate();

  // local UI state for toggles so icon updates immediately
  const [isFav, setIsFav] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  // helpers for centralized list management
  function readArray(key) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "null");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  function writeArray(key, arr) {
    try {
      localStorage.setItem(key, JSON.stringify(arr));
    } catch {}
  }

  function ensureFavConsistency(id, enable) {
    // update per-book key
    try {
      localStorage.setItem(`fav_${id}`, enable ? "1" : "0");
    } catch {}
    // update centralized array
    const arr = readArray("favorites");
    const exists = arr.includes(id);
    if (enable && !exists) {
      arr.push(id);
      writeArray("favorites", arr);
    } else if (!enable && exists) {
      writeArray("favorites", arr.filter((x) => x !== id));
    }
    // dispatch storage event for same-tab listeners (optional)
    try {
      window.dispatchEvent(new StorageEvent("storage", { key: "favorites", newValue: JSON.stringify(readArray("favorites")) }));
    } catch {}
  }

  function ensureDownloadConsistency(id, enable) {
    try {
      localStorage.setItem(`download_${id}`, enable ? "1" : "0");
    } catch {}
    const arr = readArray("downloads");
    const exists = arr.includes(id);
    if (enable && !exists) {
      arr.push(id);
      writeArray("downloads", arr);
    } else if (!enable && exists) {
      writeArray("downloads", arr.filter((x) => x !== id));
    }
    try {
      window.dispatchEvent(new StorageEvent("storage", { key: "downloads", newValue: JSON.stringify(readArray("downloads")) }));
    } catch {}
  }

  // initialize local toggle state whenever modal opens / book changes
  useEffect(() => {
    if (!isOpen || !book) return;
    // lock body scroll
    document.body.classList.add("modal-open");
    // read per-book keys and central arrays to determine initial state
    const favKey = localStorage.getItem(`fav_${book.id}`);
    const dlKey = localStorage.getItem(`download_${book.id}`);
    const favArr = readArray("favorites");
    const dlArr = readArray("downloads");

    setIsFav(favKey === "1" || favArr.includes(book.id));
    setIsDownloaded(dlKey === "1" || dlArr.includes(book.id));

    // reset modal scroll top if present
    setTimeout(() => {
      const mc = document.querySelector(".modal-content");
      if (mc) mc.scrollTop = 0;
    }, 10);

    return () => {
      document.body.classList.remove("modal-open");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, book?.id]);

  // close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && isOpen) onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen || !book) return null;

  // click overlay to close
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) onClose?.();
  };

  const toggleFav = () => {
    const next = !isFav;
    setIsFav(next);
    ensureFavConsistency(book.id, next);
  };

  const toggleDownload = () => {
    const next = !isDownloaded;
    setIsDownloaded(next);
    ensureDownloadConsistency(book.id, next);
    if (next) {
      // optional: show quick feedback
      // you can replace with a nicer toast in your project
      // alert(`${book.title} added to downloads`);
    }
  };

  const startReading = () => {
    onClose?.();
    // small delay so modal close animation can run (if any)
    setTimeout(() => {
      navigate(`/reader/${book.id}`);
    }, 120);
  };

  // simple star render
  const renderStars = (rating) => {
    const full = Math.floor(rating || 0);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return "★".repeat(full) + (half ? "⭐" : "") + "☆".repeat(empty);
  };

  return (
    <div className={`modal ${isOpen ? "show" : ""}`} onClick={handleOverlayClick}>
      <div className="modal-content" role="dialog" aria-modal="true">
        <button className="close-btn" onClick={onClose} aria-label="Close">×</button>

        <div className="modal-header">
          <div className="modal-image">
            <img src={book.cover} alt={book.title} style={{ width: "140px", height: "200px", objectFit: "cover", borderRadius: 8 }} />
          </div>

          <div className="modal-info">
            <h2>{book.title}</h2>
            <p style={{ margin: "6px 0", color: "#666" }}>{book.author}</p>

            <div style={{ margin: "8px 0" }}>
              <span className="category-tag" style={{ marginRight: 6 }}>{book.category || book.genre || "Uncategorized"}</span>
              {(book.tags || []).slice(0, 3).map((t) => (
                <span key={t} className="category-tag" style={{ marginRight: 6 }}>{t}</span>
              ))}
            </div>

            <p style={{ marginTop: 10 }}>{book.description}</p>

            <div className="modal-actions" style={{ marginTop: 12 }}>
              <button className="start-btn" onClick={startReading}>
                <i className="fas fa-play" /> Start Reading
              </button>

              <button
                className={`fav-btn ${isFav ? "active" : ""}`}
                onClick={toggleFav}
                title={isFav ? "Remove from favourites" : "Add to favourites"}
                style={{ marginLeft: 8 }}
              >
                <i className={isFav ? "fas fa-heart" : "far fa-heart"} /> 
              </button>

              <button
                className={`download-btn ${isDownloaded ? "active" : ""}`}
                onClick={toggleDownload}
                title={isDownloaded ? "Remove download" : "Download for offline"}
                style={{ marginLeft: 8 }}
              >
                <i className={isDownloaded ? "fas fa-download" : "far fa-arrow-alt-circle-down"} /> 
              </button>
            </div>
          </div>
        </div>

        <div className="modal-reviews">
          <h3>Reviews & Ratings</h3>

          <div className="ratings-summary">
            <div className="summary-left">
              <span style={{ fontSize: 20, fontWeight: 700 }}>{book.rating ?? "—"}</span>
              <div className="stars">{renderStars(book.rating || 0)}</div>
              <p style={{ marginTop: 6 }}>{(book.reviews || []).length} reviews</p>
            </div>

            <div className="rating-bars">
              {/* sample static bars — you can compute from book.reviews if you want */}
              <div className="rating-bar"><span>5★</span><div className="bar"><div style={{ width: "70%" }} /></div><span>70</span></div>
              <div className="rating-bar"><span>4★</span><div className="bar"><div style={{ width: "15%" }} /></div><span>15</span></div>
              <div className="rating-bar"><span>3★</span><div className="bar"><div style={{ width: "8%" }} /></div><span>8</span></div>
              <div className="rating-bar"><span>2★</span><div className="bar"><div style={{ width: "5%" }} /></div><span>5</span></div>
              <div className="rating-bar"><span>1★</span><div className="bar"><div style={{ width: "2%" }} /></div><span>2</span></div>
            </div>
          </div>

          <div className="review-filters" style={{ marginTop: 8 }}>
            <span>Filter: </span>
            <button className="filter-btn active">All</button>
            <button className="filter-btn">5★</button>
            <button className="filter-btn">4★</button>
            <button className="filter-btn">3★</button>
            <button className="filter-btn">2★</button>
            <button className="filter-btn">1★</button>
          </div>

          <div className="reviews-list" style={{ marginTop: 12 }}>
            {(book.reviews || []).length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              (book.reviews || []).map((r, i) => (
                <div className="review" key={i}>
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
