import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./index.css";

import App from "./App.jsx";

import AdminLogin from "./pages/AdminLogin.jsx";

import AdminDashboard from "./pages/AdminDashboard.jsx";

createRoot(document.getElementById("root")).render(

  <StrictMode>

    <BrowserRouter>

      <Routes>

        {/* HOME PAGE */}
        <Route
          path="/"
          element={<App />}
        />

        {/* LOGIN PAGE */}
        <Route
          path="/login"
          element={<AdminLogin />}
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

      </Routes>

    </BrowserRouter>

  </StrictMode>

);