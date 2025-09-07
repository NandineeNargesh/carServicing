import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you re-installed react-router-dom for login/signup
import axios from 'axios'; // Import axios

function SignupPage() {
  // 1. State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    password: ''
  });

  // State for messages (e.g., success or error)
  const [message, setMessage] = useState('');

  // 2. Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 3. Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setMessage(''); // Clear previous messages

    try {
      // Send a POST request to the backend's register endpoint
      const response = await axios.post('http://localhost:3001/api/auth/register', formData);
      
      // Handle success
      setMessage(response.data.message); // Show success message from backend
      
      // Optionally, clear the form
      setFormData({ name: '', email: '', phone_number: '', password: '' });

    } catch (error) {
      // Handle error
      if (error.response && error.response.data.message) {
        setMessage(error.response.data.message); // Show error message from backend
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
        
        {/* We now use our handleSubmit function */}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            {/* Connect input to state */}
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            {/* IMPORTANT: name attribute must match the state and backend */}
            <input type="tel" id="phone" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>

        {/* Display success or error message */}
        {message && <p className="auth-message">{message}</p>}
        
        <p className="auth-switch">Already have an account? <Link to="/login">Log In</Link></p>
      </div>
    </div>
  );
}

export default SignupPage;