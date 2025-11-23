import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // optional, remove if not using routing
import "../css/style.css";


export default function Navbar() {
  const navigate = useNavigate ? useNavigate() : null; // optional navigation
  const [openMenu, setOpenMenu] = useState(null); // "all" | "reader" | "user" | null
  const [search, setSearch] = useState("");
  const [themeDark, setThemeDark] = useState(false);

  const navRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleDocClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("click", handleDocClick);
    return () => document.removeEventListener("click", handleDocClick);
  }, []);

  // Toggle theme by adding/removing a class on body (you can adapt)
  useEffect(() => {
    document.body.classList.toggle("dark-theme", themeDark);
  }, [themeDark]);

  function handleMenuClick(label) {
    // central place to react to menu items
    console.log("menu clicked:", label);
    // example: navigate to a route (uncomment if using react-router)
    // if (label === "My Library") navigate("/library");
    setOpenMenu(null);
  }

  function onSearchSubmit(e) {
    e.preventDefault();
    console.log("search for:", search);
    // implement actual search logic or navigation
    // e.g., navigate(`/search?q=${encodeURIComponent(search)}`)
  }

  return (
    <nav className="navbar" ref={navRef}>
      {/* Logo Section */}
      <div className="logo" role="banner">
        <div className="logo-circle">E</div>
        <span className="logo-text">ELYORA</span>
      </div>

      {/* Middle Section */}
      <div className="middle-section">
        {/* All Dropdown */}
        <div className="dropdown">
          <button
            className="dropdown-btn"
            onClick={() => setOpenMenu((s) => (s === "all" ? null : "all"))}
            aria-haspopup="true"
            aria-expanded={openMenu === "all"}
            type="button"
          >
            All <span className="arrow">▼</span>
          </button>

          {openMenu === "all" && (
            <div className="dropdown-menu">
              <button onClick={() => handleMenuClick("All Books")}>All Books</button>
              <button onClick={() => handleMenuClick("Fiction")}>Fiction</button>
              <button onClick={() => handleMenuClick("Non-Fiction")}>Non-Fiction</button>
              <button onClick={() => handleMenuClick("Science")}>Science</button>
              <button onClick={() => handleMenuClick("History")}>History</button>
            </div>
          )}
        </div>

       {/* Search Bar */}
<div className="search-box">
  <input
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    type="text"
    placeholder="Search books..."
    className="search-input"
  />
  <span className="search-icon">🔍</span>
</div>


      </div>

      {/* Right Section */}
      <div className="right-section">
        {/* Theme Toggle */}
        <button
          className="theme-btn"
          onClick={() => setThemeDark((v) => !v)}
          aria-pressed={themeDark}
          title="Toggle theme"
        >
          <span className="theme-icon">{themeDark ? "☀️" : "🌙"}</span>
        </button>

        {/* Reader Dropdown */}
        <div className="dropdown">
          <button
            className="dropdown-btn"
            onClick={() => setOpenMenu((s) => (s === "reader" ? null : "reader"))}
            aria-haspopup="true"
            aria-expanded={openMenu === "reader"}
            type="button"
          >
            Reader <span className="arrow">▼</span>
          </button>

          {openMenu === "reader" && (
            <div className="dropdown-menu">
              <button onClick={() => handleMenuClick("My Library")}>📚 My Library</button>
              <button onClick={() => handleMenuClick("Bookmarks")}>🔖 Bookmarks</button>
              <button onClick={() => handleMenuClick("Settings")}>⚙️ Settings</button>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="dropdown">
          <button
            className="user-btn"
            onClick={() => setOpenMenu((s) => (s === "user" ? null : "user"))}
            aria-haspopup="true"
            aria-expanded={openMenu === "user"}
            type="button"
            title="User menu"
          >
            👤
          </button>

          {openMenu === "user" && (
            <div className="dropdown-menu user-dropdown">
              <div className="user-info">
                <div className="user-avatar">J</div>
                <div className="user-details">
                  <div className="user-name">John Doe</div>
                  <div className="user-email">john@example.com</div>
                </div>
              </div>

              <hr />

              <button onClick={() => handleMenuClick("Profile")}>👤 Profile</button>
              <button onClick={() => handleMenuClick("Settings")}>⚙️ Settings</button>
              <button className="logout" onClick={() => handleMenuClick("Sign Out")}>
                🚪 Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
