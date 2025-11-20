// src/pages/Reader.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import books from "../data/books";

/**
 * Reader page implements:
 *  - load book by :bookId param
 *  - font size controls, theme toggle
 *  - chapter navigation and progress saving to localStorage
 *  - search in book (simple highlight)
 *  - highlight selected text (save highlights to localStorage)
 *  - notes modal (save to localStorage)
 */
export default function Reader() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const book = books[bookId] || null;

  const [fontSize, setFontSize] = useState(16);
  const [isDark, setIsDark] = useState(() => localStorage.getItem("readerTheme") === "dark");
  const [currentChapter, setCurrentChapter] = useState(1);
  const [notesOpen, setNotesOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [notePrivate, setNotePrivate] = useState(false);
  const [noteColor, setNoteColor] = useState("yellow");
  const chapterContentRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!book) {
      // redirect to home if not found
      navigate("/");
      return;
    }

    // restore progress
    try {
      const saved = JSON.parse(localStorage.getItem(`progress_${bookId}`) || "null");
      if (saved && saved.chapter) setCurrentChapter(saved.chapter);
    } catch {}

    // restore theme
    if (isDark) document.body.classList.add("dark-theme");
    else document.body.classList.remove("dark-theme");

    // initial font size
    document.documentElement.style.setProperty("--font-size", `${fontSize}px`);
  }, []); // eslint-disable-line

  useEffect(() => {
    if (!book) return;
    // persist progress
    try {
      localStorage.setItem(`progress_${bookId}`, JSON.stringify({ chapter: currentChapter }));
    } catch {}
  }, [currentChapter, bookId, book]);

  useEffect(() => {
    document.documentElement.style.setProperty("--font-size", `${fontSize}px`);
  }, [fontSize]);

  function goBack() {
    navigate(-1);
  }
  function prevChapter() {
    setCurrentChapter((c) => Math.max(1, c - 1));
    scrollTop();
  }
  function nextChapter() {
    setCurrentChapter((c) => Math.min(book.totalChapters, c + 1));
    scrollTop();
  }
  function goToChapter(n) {
    setCurrentChapter(() => Math.max(1, Math.min(book.totalChapters, n)));
    scrollTop();
  }

  function increaseFont() {
    setFontSize((s) => Math.min(24, s + 2));
  }
  function decreaseFont() {
    setFontSize((s) => Math.max(12, s - 2));
  }

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.body.classList.toggle("dark-theme", next);
    localStorage.setItem("readerTheme", next ? "dark" : "light");
  }

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // SEARCH IN BOOK (simple)
  function searchInBook(q) {
    setSearchQuery(q);
    const container = chapterContentRef.current;
    if (!container) return;
    // clear previous marks
    const marks = container.querySelectorAll("mark.search-highlight");
    marks.forEach((m) => {
      const parent = m.parentNode;
      parent.replaceChild(document.createTextNode(m.textContent), m);
      parent.normalize();
    });
    if (!q.trim()) return;

    const paragraphs = Array.from(container.querySelectorAll("p"));
    let found = false;
    paragraphs.forEach((p) => {
      const text = p.textContent;
      const regex = new RegExp(`(${escapeRegExp(q)})`, "gi");
      if (regex.test(text)) {
        found = true;
        p.innerHTML = text.replace(regex, `<mark class="search-highlight">$1</mark>`);
      }
    });
    if (found) {
      showToast(`Found "${q}" in current chapter`);
    } else {
      showToast(`"${q}" not found in current chapter`);
    }
  }

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // HIGHLIGHT SELECTED TEXT
  function highlightSelection() {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    if (!range || sel.toString().trim() === "") return;

    const text = sel.toString();
    // create span
    const span = document.createElement("span");
    const id = "hl-" + Date.now();
    span.className = "highlighted-text";
    span.id = id;
    span.style.backgroundColor = "rgba(255,235,59,0.4)";
    span.style.padding = "0.1rem 0.2rem";
    span.style.borderRadius = "3px";
    try {
      const content = range.extractContents();
      span.appendChild(content);
      range.insertNode(span);
      sel.removeAllRanges();

      // Save highlight metadata
      const rect = range.getBoundingClientRect();
      const chapterRect = chapterContentRef.current.getBoundingClientRect();
      const position = {
        top: rect.top - chapterRect.top,
        left: rect.left - chapterRect.left,
      };
      const highlightData = {
        id,
        text,
        chapter: currentChapter,
        book: bookId,
        timestamp: new Date().toISOString(),
        position,
      };
      try {
        const all = JSON.parse(localStorage.getItem("bookHighlights") || "{}");
        if (!all[bookId]) all[bookId] = [];
        all[bookId].push(highlightData);
        localStorage.setItem("bookHighlights", JSON.stringify(all));
      } catch {}
      showToast(`Highlighted: "${text.slice(0, 30)}${text.length > 30 ? "..." : ""}"`);
    } catch (err) {
      console.error("Highlight error", err);
      showToast("Could not highlight this selection");
    }
  }

  // Load highlights for current chapter
  function loadHighlights() {
    try {
      const all = JSON.parse(localStorage.getItem("bookHighlights") || "{}");
      const arr = (all[bookId] || []).filter((h) => h.chapter === currentChapter);
      // naive approach: search text and wrap — limited but works for exact matches
      const container = chapterContentRef.current;
      if (!container) return;
      arr.forEach((h) => {
        highlightTextInContainer(h.text, h.id);
      });
    } catch {}
  }

  // naive text highlight by replacing exact text occurrences
  function highlightTextInContainer(text, id) {
    const container = chapterContentRef.current;
    if (!container) return;
    const html = container.innerHTML;
    const safe = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(safe, "g");
    container.innerHTML = html.replace(
      regex,
      `<span id="${id}" class="highlighted-text" style="background-color: rgba(255,235,59,0.4); padding:0.1rem 0.2rem; border-radius:3px;">${text}</span>`
    );
  }

  useEffect(() => {
    // Whenever chapter changes, render its paragraphs and load highlights
    if (!book) return;
    const chapter = book.chapters[currentChapter];
    if (!chapter) return;
    const container = chapterContentRef.current;
    if (!container) return;
    container.innerHTML = "";
    chapter.content.forEach((p) => {
      const el = document.createElement("p");
      el.textContent = p;
      container.appendChild(el);
    });
    // apply highlights (after content set)
    loadHighlights();
    // clear search query
    setSearchQuery("");
    // update progress bar
    // (progress rendering handled in JSX by derived percent)
  }, [currentChapter, bookId]); // eslint-disable-line

  // NOTES: open/close/save
  function openNotesModal() {
    setNotesOpen(true);
    setTimeout(() => {
      const ta = document.getElementById("noteText");
      if (ta) ta.focus();
    }, 100);
  }
  function closeNotesModal() {
    setNotesOpen(false);
    setNoteText("");
    setNotePrivate(false);
    setNoteColor("yellow");
  }
  function saveNote() {
    const txt = noteText.trim();
    if (!txt) {
      showToast("Please enter a note before saving");
      return;
    }
    const note = {
      text: txt,
      chapter: currentChapter,
      private: notePrivate,
      color: noteColor,
      timestamp: new Date().toISOString(),
      book: bookId,
    };
    try {
      const all = JSON.parse(localStorage.getItem("bookNotes") || "{}");
      if (!all[bookId]) all[bookId] = [];
      all[bookId].push(note);
      localStorage.setItem("bookNotes", JSON.stringify(all));
      showToast("Note saved successfully!");
      closeNotesModal();
    } catch {
      showToast("Could not save note");
    }
  }

  function viewNotes() {
    const all = JSON.parse(localStorage.getItem("bookNotes") || "{}");
    const arr = all[bookId] || [];
    if (arr.length === 0) {
      showToast("No notes yet. Add one!");
      return;
    }
    // build simple modal content
    const content = arr
      .map(
        (n) =>
          `<div style="border-left:4px solid ${noteColorMap(n.color)}; padding:8px; margin-bottom:8px;">
            <div style="font-size:12px;color:#666;">Chapter ${n.chapter} • ${new Date(n.timestamp).toLocaleString()}</div>
            <div>${escapeHTML(n.text)}</div>
          </div>`
      )
      .join("");
    showCustomModal("Your Notes", content);
  }

  function noteColorMap(c) {
    const map = { yellow: "#ffeb3b", blue: "#2196f3", green: "#4caf50", pink: "#e91e63" };
    return map[c] || "#ffeb3b";
  }

  // small helper to show toasts (create if not present)
  function showToast(msg) {
    let toast = document.getElementById("toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
  }

  // custom modal helper
  function showCustomModal(title, contentHtml) {
    const modal = document.createElement("div");
    modal.className = "modal custom-modal show";
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>${escapeHTML(title)}</h3>
          <button class="close-btn">×</button>
        </div>
        <div class="modal-body">${contentHtml}</div>
      </div>
    `;
    modal.querySelector(".close-btn").addEventListener("click", () => modal.remove());
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add("show"), 10);
  }

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  return (
    <div className="reader-page">
      <nav className="top-navbar">
        <div className="nav-left">
          <button className="back-btn" onClick={goBack}>
            ←
          </button>
          <div className="book-info">
            <span className="greeting">Happy reading, User</span>
            <h1 className="book-title">{book?.title}</h1>
          </div>
        </div>

        <div className="nav-center">
          <div className="font-controls">
            <button className="font-btn" onClick={decreaseFont}>{`-`}</button>
            <span className="font-size" id="fontSizeDisplay">{fontSize}px</span>
            <button className="font-btn" onClick={increaseFont}>{`+`}</button>
          </div>

          <button className="theme-btn" onClick={toggleTheme}>{isDark ? "Light" : "Dark"}</button>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search in book..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="search-icon"
              onClick={() => {
                searchInBook(searchQuery);
              }}
            >
              🔍
            </button>
          </div>
        </div>

        <div className="nav-right">
          <img src={book?.cover} alt={book?.title} className="book-cover-small" />
        </div>
      </nav>

      <div className="main-container">
        <aside className="left-sidebar">
          <button className="sidebar-btn" onClick={() => {
            const el = document.getElementById("chapterIndex");
            if (el) el.style.display = el.style.display === "none" ? "block" : "none";
          }}>
            ☰
          </button>

          <button
            className="sidebar-btn"
            onClick={() => {
              highlightSelection();
            }}
            title="Highlight selected text"
          >
            ✎
          </button>

          <button className="sidebar-btn" onClick={openNotesModal} title="Add Notes">
            +
          </button>

          <button className="sidebar-btn" onClick={() => viewNotes()} title="View Notes">
            🔖
          </button>

          <button className="sidebar-btn" onClick={() => showToast("Settings coming soon")} title="Settings">
            ⚙️
          </button>
        </aside>

        <main className="content-area">
          <div className="book-cover-container">
            <img src={book?.cover} alt={book?.title} className="book-cover" />
          </div>

          <div className="chapter-container">
            <h2 className="chapter-title">{book?.chapters[currentChapter]?.title}</h2>
            <h3 className="chapter-subtitle">{book?.chapters[currentChapter]?.subtitle}</h3>

            <div
              className="chapter-content"
              id="chapterContent"
              ref={chapterContentRef}
              style={{ fontSize: `${fontSize}px` }}
            />
            <div className="chapter-navigation">
              <button className="nav-btn prev-btn" onClick={prevChapter} disabled={currentChapter === 1}>
                Previous
              </button>
              <span className="chapter-info">
                Chapter {currentChapter} of {book?.totalChapters}
              </span>
              <button className="nav-btn next-btn" onClick={nextChapter} disabled={currentChapter === book?.totalChapters}>
                Next
              </button>
            </div>
          </div>

          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${Math.round((currentChapter / book.totalChapters) * 100)}%`,
                }}
              />
            </div>
            <div className="progress-info">
              <span>{Math.round((currentChapter / book.totalChapters) * 100)}% complete</span>
              <span>{book.totalChapters} chapters</span>
            </div>
          </div>
        </main>

        <aside className="right-sidebar">
          <div className="book-details">
            <h3>{book?.title}</h3>
            <p className="author">{book?.author}</p>
            <p className="genre">{book?.genre || book?.category}</p>
            <p className="chapters">{book?.totalChapters} chapters</p>
            <div className="rating">
              <span className="star">★</span>
              <span>{book?.rating ?? "—"}</span>
            </div>
          </div>

          <div className="chapter-index" id="chapterIndex" style={{ display: "none" }}>
            <h4>Chapters</h4>
            <ul className="chapter-list">
              {Array.from({ length: book.totalChapters }).map((_, i) => (
                <li
                  key={i}
                  className={`chapter-item ${i + 1 === currentChapter ? "active" : ""}`}
                  onClick={() => goToChapter(i + 1)}
                >
                  <span className="chapter-number">{i + 1}</span>
                  <span className="chapter-name">{book.chapters[i + 1]?.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reading-schedule">
            <div className="schedule-header">
              <span>Reading Schedule</span>
            </div>
            <p className="schedule-desc">Set reading goals and track progress</p>
            <button className="configure-btn">Configure Schedule</button>
          </div>

          <div className="community-section">
            <div className="community-header">
              <span>Community</span>
            </div>
            <p className="community-desc">Connect with other readers</p>
            <button className="join-btn">Join Discussion</button>
            <p className="comments-count">0 comments on this book</p>
          </div>
        </aside>
      </div>

      {/* Notes Modal */}
      {notesOpen && (
        <div className="modal show" id="notesModal" onClick={closeNotesModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Note</h3>
              <button className="close-btn" onClick={closeNotesModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <textarea
                id="noteText"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Write your note here..."
              />
              <div className="note-options">
                <label>
                  <input type="checkbox" checked={notePrivate} onChange={(e) => setNotePrivate(e.target.checked)} />
                  Private note
                </label>
                <select value={noteColor} onChange={(e) => setNoteColor(e.target.value)} id="noteColor">
                  <option value="yellow">Yellow</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="pink">Pink</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={closeNotesModal}>
                Cancel
              </button>
              <button className="save-btn" onClick={saveNote}>
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// small utility used by the Reader component
function searchInBook(q) {
  // placeholder — this function is defined inline in component above
  // but exported here only to satisfy calls in code if needed
}
