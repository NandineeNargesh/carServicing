// src/components/DetailedServicesSection.js
import React from 'react';
import { Link } from 'react-router-dom';
function DetailedServicesSection() {
  const services = [
    { id: '01', name: 'Full Vacuuming carpets, seats, & trunk' },
    { id: '02', name: 'Deep cleaning of upholstery or leather' },
    { id: '03', name: 'Leather conditioning (if applicable)' },
    { id: '04', name: 'Dashboard, console, and trim cleaning & shine' },
    { id: '05', name: 'Interior glass and mirror cleaning' },
    { id: '06', name: 'Odor elimination spray' },
  ];
 const isLoggedIn = !!localStorage.getItem('token');
  const bookNowLink = isLoggedIn ? "/dashboard/book-service" : "/login";
  return (
    <section id="detailed-services" className="detailed-services-section container">
      <div className="detailed-services-banner">
        <div className="banner-text">
          <h2>We offer a range of premium services</h2>
          <p>designed to protect and enhance your vehicle's appearance.</p>
        </div>
        <div className="banner-actions">
                   <Link to={bookNowLink} className="btn btn-primary">Book Now</Link>
          <button style={{padding: '15.2px'}} className="btn btn-secondary">Contact Us</button>

        </div>
        <div className="services-grid">
          {services.map(service => (
            <div className="service-item" key={service.id}>
              <span>[{service.id}]</span>
              <p>{service.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DetailedServicesSection;