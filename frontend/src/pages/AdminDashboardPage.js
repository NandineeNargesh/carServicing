import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function AdminDashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchAllBookings = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('http://localhost:3001/api/admin/bookings', config);
      setBookings(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load bookings.');
    }
  }, []);

  useEffect(() => {
    fetchAllBookings();
  }, [fetchAllBookings]);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.put(`http://localhost:3001/api/admin/bookings/${bookingId}/status`, { status: newStatus }, config);
        setMessage(response.data.message);
        // Refresh the bookings list to show the updated status
        fetchAllBookings();
    } catch (err) {
        setError(err.response?.data?.message || 'Failed to update status.');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage all customer service bookings.</p>
      </header>
      <main className="admin-content">
        {error && <p className="auth-message error">{error}</p>}
        {message && <p className="auth-message success">{message}</p>}
        <div className="history-table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Service</th>
                <th>Date & Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.user_name}<br/><small>{booking.email}</small></td>
                    <td>{booking.make} {booking.model}<br/><small>{booking.registration_number}</small></td>
                    <td>{booking.service_type}</td>
                    <td>{formatDate(booking.booking_date)} at {booking.time_slot}</td>
                    <td>
                      <select 
                        defaultValue={booking.status} 
                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                        className="status-select"
                      >
                        <option>Booking Confirmed</option>
                        <option>Vehicle Dropped Off</option>
                        <option>Service In Progress</option>
                        <option>Service Completed</option>
                        <option>Ready for Pickup</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No bookings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboardPage;