import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function BookService() {
  const [vehicles, setVehicles] = useState([]);
  const [bookingData, setBookingData] = useState({
    vehicle_id: '',
    service_type: 'General Service',
    booking_date: '',
    time_slot: '09:00 AM'
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchVehicles = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('https://carservicing.onrender.com/api/vehicles', config);
      
      setVehicles(response.data);

      if (response.data.length > 0) {
        setBookingData(prevData => ({ ...prevData, vehicle_id: response.data[0].id }));
      }

    } catch (err) {
      setError('Could not load your vehicles.');
    }
  }, []);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    if (!bookingData.vehicle_id) {
      setError("Please select a vehicle to book a service.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.post('https://carservicing.onrender.com/api/bookings/create', bookingData, config);
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    }
  };

  return (
    <div className="content-section">
      <h2>Book a New Service</h2>
      <form onSubmit={handleSubmit} className="booking-form-standalone">
        {message && <p className="auth-message success">{message}</p>}
        {error && <p className="auth-message error">{error}</p>}
        
        <div className="input-group">
          <label htmlFor="vehicle_id">Select Your Vehicle</label>
          <select name="vehicle_id" value={bookingData.vehicle_id} onChange={handleChange} required>
            {vehicles.length > 0 ? (
              vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.make} {vehicle.model} ({vehicle.registration_number})
                </option>
              ))
            ) : (
              <option value="" disabled>Please add a vehicle from the 'My Vehicles' page</option>
            )}
          </select>
        </div>
        
        <div className="input-group">
          <label htmlFor="service_type">Service Type</label>
          <select name="service_type" value={bookingData.service_type} onChange={handleChange} required>
            <option>General Service</option>
            <option>Oil Change</option>
            <option>Tire Rotation</option>
            <option>Full Detailing</option>
          </select>
        </div>
        
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="booking_date">Preferred Date</label>
            <input type="date" name="booking_date" value={bookingData.booking_date} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="time_slot">Time Slot</label>
            <select name="time_slot" value={bookingData.time_slot} onChange={handleChange} required>
              <option>09:00 AM</option>
              <option>11:00 AM</option>
              <option>01:00 PM</option>
              <option>03:00 PM</option>
            </select>
          </div>
        </div>
        
        <button type="submit" className="btn btn-primary">Request Booking</button>
      </form>
    </div>
  );
}

export default BookService;