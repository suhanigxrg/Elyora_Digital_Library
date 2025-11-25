import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import books from "../data/books";

/**
 * Downloads page
 * - Reads downloads from localStorage
 * - Supports:
 *    - centralized list: localStorage.getItem('downloads') => '["id1","id2"]'
 *    - per-book key: localStorage.getItem(`download_${bookId}`) => "1"
 * - Allows removing a downloaded book (updates localStorage)
 */

export default function Download() {
  const navigate = useNavigate();
  const [downloadIds, setDownloadIds] = useState([]);

  useEffect(() => {
    buildList();
    const onStorage = (e) => {
      if (!e.key) { buildList(); return; }
      if (e.key.startsWith("download_") || e.key === "downloads") buildList();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function buildList() {
    try {
      const saved = JSON.parse(localStorage.getItem("downloads") || "null");
      if (Array.isArray(saved)) {
        setDownloadIds(saved.filter(Boolean));
        return;
      }
    } catch {}

    // fallback: scan for download_<id> keys
    const ids = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      if (key.startsWith("download_")) {
        const id = key.slice(9);
        if (localStorage.getItem(key) === "1") ids.push(id);
      }
    }
    setDownloadIds(ids);
  }

  function removeDownload(bookId) {
    try {
      const arr = JSON.parse(localStorage.getItem("downloads") || "null");
      if (Array.isArray(arr)) {
        const next = arr.filter((x) => x !== bookId);
        localStorage.setItem("downloads", JSON.stringify(next));
      }
    } catch {}
    localStorage.setItem(`download_${bookId}`, "0");
    setDownloadIds((s) => s.filter((id) => id !== bookId));
  }

  function openReader(bookId) {
    navigate(`/reader/${bookId}`);
  }

  const downloadBooks = downloadIds.map((id) => books[id]).filter(Boolean);

  return (
    <div className="page downloads-page" style={{ padding: 20 }}>
      <div className="page-header">
        <h2><i className="fas fa-download" /> Downloaded Books</h2>
        <p id="total-books">{downloadBooks.length} downloaded book{downloadBooks.length !== 1 ? "s" : ""} (available offline)</p>
      </div>

      {downloadBooks.length === 0 ? (
        <div className="container" style={{ padding: 30 }}>
          <div className="card" style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
            <i className="fas fa-download" style={{ fontSize: 36 }}></i>
            <h3>No downloads yet</h3>
            <p id="download-para">Download books for offline reading by clicking the download button on any book.</p>
            <button onClick={() => navigate("/")} style={{ marginTop: 12 }}>Browse Books</button>
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))" }}>
          {downloadBooks.map((b) => (
            <div key={b.id} className="download-card book-card" style={{
              background: "white", padding: 12, borderRadius: 12, boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              display: "flex", gap: 12, alignItems: "flex-start"
            }}>
              <img src={b.cover} alt={b.title} style={{ width: 80, height: 120, objectFit: "cover", borderRadius: 8 }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0 }}>{b.title}</h3>
                <p style={{ margin: "6px 0", color: "#666" }}>{b.author}</p>
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <button className="start-btn" onClick={() => openReader(b.id)}>Open</button>
                  <button className="download-remove-btn" onClick={() => removeDownload(b.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
