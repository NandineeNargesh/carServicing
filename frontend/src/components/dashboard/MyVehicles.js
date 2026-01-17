import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function MyVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({ make: '', model: '', registration_number: '' });
  const [editingId, setEditingId] = useState(null); // Edit tracking ke liye
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // ⚠️ Note: Local testing ke liye localhost use karein, 
  // Deployment ke liye apni render wali URL.
  const API_URL = 'http://localhost:3001/api/vehicles'; 

  const fetchVehicles = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found. Please log in.');

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(API_URL, config);
      setVehicles(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load your vehicles.');
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
      if (!token) throw new Error('No token found. Please log in.');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (editingId) {
        // UPDATE Logic
        const response = await axios.put(`${API_URL}/${editingId}`, formData, config);
        setMessage(response.data.message);
      } else {
        // ADD Logic
        const response = await axios.post(`${API_URL}/add`, formData, config);
        setMessage(response.data.message);
      }

      setFormData({ make: '', model: '', registration_number: '' });
      setEditingId(null);
      fetchVehicles(); 
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process request.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this vehicle?")) return;
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`${API_URL}/${id}`, config);
      setMessage("Vehicle deleted successfully");
      fetchVehicles();
    } catch (err) {
      setError("Failed to delete vehicle");
    }
  };

  const startEdit = (v) => {
    setEditingId(v.id);
    setFormData({ make: v.make, model: v.model, registration_number: v.registration_number });
    window.scrollTo(0, 0); // Scroll to form
  };

 return (
    <div className="content-section">
      <h2>My Vehicles</h2>
      {message && <p className="auth-message success">{message}</p>}
      {error && <p className="auth-message error">{error}</p>}

      <div className="dashboard-columns">
        <div className="dashboard-col">
          <form onSubmit={handleSubmit} className="add-vehicle-form">
            <h3>{editingId ? "Edit Vehicle" : "Add a New Vehicle"}</h3>
            
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
            
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? "Update Vehicle" : "Add Vehicle"}
              </button>
              
              {editingId && (
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => { setEditingId(null); setFormData({make:'', model:'', registration_number:''}) }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="dashboard-col">
          <div className="vehicle-list">
            <h4>Your Registered Vehicles</h4>
            {vehicles.length > 0 ? (
              <div className="vehicle-items-container">
                {vehicles.map((v) => (
                  <div key={v.id} className="vehicle-card">
                    <div className="vehicle-info">
                      <span className="vehicle-name">{v.make} {v.model}</span>
                      <span className="vehicle-reg">{v.registration_number}</span>
                    </div>
                    <div className="vehicle-actions">
                      <button onClick={() => startEdit(v)} className="btn-action btn-edit">Edit</button>
                      <button onClick={() => handleDelete(v.id)} className="btn-action btn-delete">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
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