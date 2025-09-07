import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  const fetchBookingHistory = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('http://localhost:3001/api/bookings/history', config);
      setBookings(response.data);
    } catch (err) {
      setError('Could not load your booking history.');
    }
  }, []);

  useEffect(() => {
    fetchBookingHistory();
  }, [fetchBookingHistory]);

  // Helper function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="content-section">
      <h2>My Booking History</h2>
      {error && <p className="auth-message error">{error}</p>}
      
      <div className="history-table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Service Type</th>
              <th>Date</th>
              <th>Time Slot</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.make} {booking.model}</td>
                  <td>{booking.service_type}</td>
                  <td>{formatDate(booking.booking_date)}</td>
                  <td>{booking.time_slot}</td>
                  <td><span className={`status-badge status-${booking.status.replace(/\s+/g, '-').toLowerCase()}`}>{booking.status}</span></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">You have no booking history.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingHistory;