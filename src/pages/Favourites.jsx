import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import books from "../data/books";

/**
 * Like (Favourites) page
 * - Reads favourites from localStorage
 * - Supports two storage patterns:
 *    1) centralized list: localStorage.getItem('favorites') => '["starlit-guide","harry-potter"]'
 *    2) per-book keys: localStorage.getItem(`fav_${bookId}`) => "1" or "0"
 * - Allows removing an item (updates localStorage)
 */

export default function Like() {
  const navigate = useNavigate();
  const [favIds, setFavIds] = useState([]);

  useEffect(() => {
    buildList();

    // keep list in sync in case other components update localStorage
    const onStorage = (e) => {
      if (!e.key) {
        // some browsers send null key for clear operations - rebuild anyway
        buildList();
        return;
      }
      if (e.key.startsWith("fav_") || e.key === "favorites") buildList();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function buildList() {
    // 1) try centralized array first
    try {
      const saved = JSON.parse(localStorage.getItem("favorites") || "null");
      if (Array.isArray(saved)) {
        setFavIds(saved.filter(Boolean));
        return;
      }
    } catch (err) {
      // ignore parse error and fallback
    }

    // 2) fallback: scan localStorage for keys like fav_<id> === "1"
    const ids = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      if (key.startsWith("fav_")) {
        const id = key.slice(4);
        if (localStorage.getItem(key) === "1") ids.push(id);
      }
    }
    setFavIds(ids);
  }

  function removeFav(bookId) {
    // remove both possible patterns
    try {
      // remove from centralized array if present
      const arr = JSON.parse(localStorage.getItem("favorites") || "null");
      if (Array.isArray(arr)) {
        const next = arr.filter((x) => x !== bookId);
        localStorage.setItem("favorites", JSON.stringify(next));
      }
    } catch {}
    // remove per-book key
    localStorage.setItem(`fav_${bookId}`, "0");
    // update state
    setFavIds((s) => s.filter((id) => id !== bookId));
  }

  function startReading(bookId) {
    navigate(`/reader/${bookId}`);
  }

  const favBooks = favIds
    .map((id) => books[id])
    .filter(Boolean);

  return (
    <div className="page favourites-page" style={{ padding: 20 }}>
      <div className="page-header">
        <h1><span className="icon">❤️</span> My favourites</h1>
        <p className="sub-text">{favBooks.length} favourite book{favBooks.length !== 1 ? "s" : ""} saved</p>
      </div>

      {favBooks.length === 0 ? (
        <div className="container" style={{ padding: 30 }}>
          <div className="card_1" style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
            <div className="icon" style={{ fontSize: 48 }}>🫶🏻</div>
            <h2>No favourites yet</h2>
            <p>Save your favourite books to easily access them anytime.</p>
            <button className="btn" onClick={() => navigate("/")}>Browse Books</button>
          </div>
        </div>
      ) : (
        <div className="favourites-grid" style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))" }}>
          {favBooks.map((b) => (
            <div key={b.id} className="fav-card book-card" style={{
              background: "white",
              padding: 12,
              borderRadius: 12,
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              display: "flex",
              gap: 12,
              alignItems: "flex-start"
            }}>
              <img src={b.cover} alt={b.title} style={{ width: 80, height: 120, objectFit: "cover", borderRadius: 8 }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0 }}>{b.title}</h3>
                <p style={{ margin: "6px 0", color: "#666" }}>{b.author}</p>
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <button className="start-btn" onClick={() => startReading(b.id)}>Start Reading</button>
                  <button className="fav-btn" onClick={() => removeFav(b.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
