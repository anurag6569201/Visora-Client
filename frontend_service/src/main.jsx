import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from './landing.jsx';
import MainPage from './mainpage.jsx';
import ProtectedRoute from './components/authentication/ProtectedRoute'; // Add ProtectedRoute component
import PublicRoute from "./components/authentication/PublicRoute";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Public routes for Landing */}
        <Route path="/*" element={<PublicRoute><Landing /></PublicRoute>} />

        {/* Protected route for MainPage */}
        <Route path="/app/*" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  </StrictMode>
);
