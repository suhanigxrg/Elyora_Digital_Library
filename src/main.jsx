// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./App.jsx";
import Home from "./pages/Home.jsx";
import Reader from "./pages/Reader.jsx";

// Import CSS
import "./css/style.css";
import "./css/reader.css";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="reader/:bookId" element={<Reader />} />
          <Route path="favourites" element={<div style={{padding: 20}}>Favourites Page (Coming Soon)</div>} />
          <Route path="downloads" element={<div style={{padding: 20}}>Downloads Page (Coming Soon)</div>} />
          <Route path="feedback" element={<div style={{padding: 20}}>Feedback Page (Coming Soon)</div>} />
          <Route path="help" element={<div style={{padding: 20}}>Help Page (Coming Soon)</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);