import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-logo">CarServices</h2>
      <nav className="sidebar-nav">
        <ul>
          {/* We will add more links here later */}
          <li><NavLink to="/dashboard" end>My Vehicles</NavLink></li>
          <li><NavLink to="/dashboard/book-service">Book a Service</NavLink></li>
          <li><NavLink to="/dashboard/history">Booking History</NavLink></li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;