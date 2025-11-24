// src/components/Sidebar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem("sidebarExpanded") !== "true"
  );
  const [activePage, setActivePage] = useState("home");
  const navigate = useNavigate();

  const menuItems = [
    { id: "home", icon: "fa-solid fa-home", label: "Home", path: "/" },
    { id: "favourites", icon: "fa-regular fa-heart", label: "Favourites", path: "/favourites" },
    { id: "downloads", icon: "fa-regular fa-circle-down", label: "Downloads", path: "/downloads" },
    { id: "feedback", icon: "fa-regular fa-message", label: "Feedback", path: "/feedback" },
    { id: "help", icon: "fa-regular fa-circle-question", label: "Help", path: "/help" },
  ];

  const handleMenuClick = (item) => {
    setActivePage(item.id);
    navigate(item.path);
  };

  return (
    <div className={`sidebar ${collapsed ? "" : "expanded"}`} id="sidebar">
      <div className="menu-items">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`menu-item ${activePage === item.id ? "active" : ""}`}
            onClick={() => handleMenuClick(item)}
          >
            <span className="icon">
              <i className={item.icon}></i>
            </span>
            <span className="text">{item.label}</span>
          </div>
        ))}
      </div>

      <div
        className="toggle-btn"
        id="toggleBtn"
        onClick={() => {
          const nextState = !collapsed;
          setCollapsed(nextState);
          localStorage.setItem("sidebarExpanded", nextState ? "true" : "false");
        }}
      >
        <span>{collapsed ? "→" : "←"}</span>
      </div>
    </div>
  );
}
