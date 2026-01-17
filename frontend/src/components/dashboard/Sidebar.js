import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  
  // User data localStorage se nikalna (Login ke waqt save kiya tha)
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'User' };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('token');
      localStorage.removeItem('user'); // User info bhi delete karein
      navigate('/login'); // Redirect to login
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <h2 className="sidebar-logo">CarServices</h2>
        
        {/* User Info Section */}
        <div className="user-profile-small">
          <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
          <div className="user-details">
            <p className="user-name">{user.name}</p>
            <p className="user-role">{user.is_admin ? 'Administrator' : 'Customer'}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li><NavLink title="My Vehicles" to="/dashboard" end>My Vehicles</NavLink></li>
            <li><NavLink title="Book Service" to="/dashboard/book-service">Book a Service</NavLink></li>
            <li><NavLink title="History" to="/dashboard/history">Booking History</NavLink></li>
            
            {/* Conditional Admin Link */}
            {user.is_admin && (
              <li><NavLink title="Admin Panel" to="/dashboard/admin">Admin Panel</NavLink></li>
            )}
          </ul>
        </nav>
      </div>

      <div className="sidebar-bottom">
        <button onClick={handleLogout} className="logout-btn">
          <span className="logout-icon">⏻</span> Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;