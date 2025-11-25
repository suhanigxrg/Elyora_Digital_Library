// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./App.jsx";

// pages
import Home from "./pages/Home.jsx";
import Reader from "./pages/Reader.jsx";
import Favourites from "./pages/Favourites.jsx";
import Downloads from "./pages/Downloads.jsx";
import Feedback from "./pages/Feedback.jsx";
import Help from "./pages/Help.jsx";

// CSS
import "./css/reader.css";
import "./css/style.css";


const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="reader/:bookId" element={<Reader />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="downloads" element={<Downloads />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
