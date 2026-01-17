import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '', // State key should match the input "name" attribute
    password: ''
  });
  const [message, setMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      // NOTE: Make sure this URL matches your backend route exactly
      // If your backend is /api/auth/signup, change it here
      const response = await axios.post(
        'http://localhost:3001/api/auth/signup', 
        formData
      );

      setMessage(response.data.message);

      // Clear form after successful signup
      setFormData({ name: '', email: '', phone_number: '', password: '' });
    } catch (error) {
      if (error.response && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="logo-auth">CarServices</h1>
        <h2>Create Your Account</h2>
        <p>Get started with a free account</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label htmlFor="phone_number">Phone Number</label>
            <input 
              type="text" 
              id="phone_number"
              name="phone_number" // Matches the key in formData
              placeholder="+919876543210" 
              value={formData.phone_number} 
              onChange={handleChange} 
              required 
              className="auth-input"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>

        {message && <p className="auth-message">{message}</p>}
        <p className="auth-switch">Already have an account? <Link to="/login">Log In</Link></p>
      </div>
    </div>
  );
}

export default SignupPage;