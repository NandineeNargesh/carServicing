// src/components/ServicesSection.js

import React from 'react';
// import { Link } from 'react-scroll'; 
import { Link } from 'react-router-dom';

import blackCarImage from '../assets/bl.webp';

function ServicesSection() {
  const isLoggedIn = !!localStorage.getItem('token');
  const bookNowLink = isLoggedIn ? "/dashboard/book-service" : "/login";
  return (
    <section id="services" className="services-content container">
      <div className="services-left-col">

          <div className="service-card dark-card">
            <p>To ensure your car looks stunning</p>
            <p>We deliver professional cleaning with cutting-edge technology.</p>
          </div>
          <div className="service-card">
            <h4>Premium Products & Technology</h4>
            <p>Highly skilled team dedicated to meticulous detailing.</p>
          </div>
          <div className="service-card">
            <h4>Safe Paint-Friendly Process</h4>
            <p>Our techniques protect your car's finish. We avoid harsh chemicals and abrasion methods.</p>
            <Link to="/contact" className="learn-more-link">Learn more</Link>
          </div>
    </div>
      <div className="services-right-col">
        <div className="service-main-heading">
          <h2>Your Car Deserves More than an Ordinary Wash</h2>
          <Link to={bookNowLink} className="btn btn-primary">Book Now</Link>
        </div>
        <div className="service-image-container">
          <img src={blackCarImage} alt="Detailed black car" />
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;