// src/App.jsx
import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";


export default function AppLayout() {
  return (
    <div className="app-root">
      <Navbar />

      <div className="app-body">
        <Sidebar />

        <main className="app-main">
          {/* All routed pages will load here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
