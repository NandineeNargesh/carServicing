import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import './App.css';
// Import Components
import AdminDashboardPage from './pages/AdminDashboardPage'; // 1. Import AdminDashboardPage
import AdminRoute from './components/auth/AdminRoute';
import ProtectedRoute from './components/auth/ProtectedRoute';
import MyVehicles from './components/dashboard/MyVehicles';
import BookService from './components/dashboard/BookService';
import BookingHistory from './components/dashboard/BookingHistory';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />}>
              {/* Nested Dashboard Routes */}
              <Route index element={<MyVehicles />} />
              <Route path="book-service" element={<BookService />} />
              <Route path="history" element={<BookingHistory />} />
            </Route>
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;