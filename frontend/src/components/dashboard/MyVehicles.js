// frontend/src/components/dashboard/MyVehicles.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function MyVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({ make: '', model: '', registration_number: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchVehicles = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('http://localhost:3001/api/vehicles', config);
      setVehicles(response.data);
    } catch (err) {
      setError('Could not load your vehicles.');
    }
  }, []);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.post('http://localhost:3001/api/vehicles/add', formData, config);
      setMessage(response.data.message);
      setFormData({ make: '', model: '', registration_number: '' });
      fetchVehicles();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add vehicle.');
    }
  };

  return (
    <div className="content-section">
      <h2>My Vehicles</h2>
      {message && <p className="auth-message success">{message}</p>}
      {error && <p className="auth-message error">{error}</p>}

      <div className="dashboard-columns">
        <div className="dashboard-col">
          <form onSubmit={handleSubmit} className="add-vehicle-form">
            <h3>Add a New Vehicle</h3>
            <div className="input-group">
              <label htmlFor="make">Make</label>
              <input type="text" id="make" name="make" value={formData.make} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="model">Model</label>
              <input type="text" id="model" name="model" value={formData.model} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="registration_number">Registration Number</label>
              <input type="text" id="registration_number" name="registration_number" value={formData.registration_number} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary">Add Vehicle</button>
          </form>
        </div>
        <div className="dashboard-col">
          <div className="vehicle-list">
            <h4>Your Registered Vehicles</h4>
            {vehicles.length > 0 ? (
              <ul>{vehicles.map((v, i) => <li key={i}>{v.make} {v.model} - {v.registration_number}</li>)}</ul>
            ) : (
              <p>No vehicles added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyVehicles;