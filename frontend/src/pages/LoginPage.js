import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isAdminLogin, setIsAdminLogin] = useState(false); // State for the checkbox
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Use the special admin password if the checkbox is checked
    const loginPayload = {
      email: formData.email,
      password: isAdminLogin ? 'admin123' : formData.password,
    };

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', loginPayload);
      const { token, isAdmin } = response.data;
      
      localStorage.setItem('token', token);

      // Redirect based on admin status
      if (isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }

    } catch (error) {
      if (error.response && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="logo-auth">CarServices</h1>
        <h2>Welcome Back!</h2>
        <p>Please log in to your account</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          
          {/* Admin Login Checkbox */}
          <div className="input-group-checkbox">
            <input 
              type="checkbox" 
              id="admin-login" 
              checked={isAdminLogin} 
              onChange={(e) => setIsAdminLogin(e.target.checked)}
            />
            <label htmlFor="admin-login">Log in as Admin</label>
          </div>

          <button type="submit" className="btn btn-primary">Log In</button>
        </form>
        {message && <p className="auth-message">{message}</p>}
        <p className="auth-switch">Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;