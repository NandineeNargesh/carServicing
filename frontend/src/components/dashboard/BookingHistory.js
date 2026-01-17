import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// YAHAN CHECK KAREIN: Localhost hi hona chahiye
const API_URL = 'http://localhost:3001/api/bookings/history';

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  const fetchBookingHistory = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found.');

      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      // Request bhejte waqt console check
      console.log("Fetching from:", API_URL);
      const response = await axios.get(API_URL, config);
      
      console.log("Data received from Backend:", response.data);
      setBookings(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError('Could not load your booking history.');
    }
  }, []);

  useEffect(() => {
    fetchBookingHistory();
  }, [fetchBookingHistory]);

  const formatDate = (dateString) => {
    if(!dateString) return "N/A";
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
                  <td>{booking.make ? `${booking.make} ${booking.model}` : 'Unknown Vehicle'}</td>
                  <td>{booking.service_type}</td>
                  <td>{formatDate(booking.booking_date)}</td>
                  <td>{booking.time_slot}</td>
                  <td>
                    {/* Status null hone par 'Pending' dikhayega */}
                    <span className={`status-badge status-${(booking.status || 'Pending').toLowerCase()}`}>
                      {booking.status || 'Pending'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>
                  No bookings found. Please book a service first.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingHistory;