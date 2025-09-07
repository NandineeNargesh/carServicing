// src/components/HeroSection.js

import React from 'react';
import detailImg from '../assets/washingcar.webp';
import blackCarImg from '../assets/bl.webp';
import trustedImg from '../assets/bll.png';
import { Link } from 'react-router-dom';
function HeroSection() {
   const isLoggedIn = !!localStorage.getItem('token');
  
  // 3. Determine the correct link for the "Book Now" button
  const bookNowLink = isLoggedIn ? "/dashboard/book-service" : "/login";
   return (
    <section id="home" className="hero container"> 
      <div className="hero-content">
        <div className="hero-text-and-buttons">
                   <h1>Bringing Your Car's Shine Back to Life</h1>
                   <p>Professional detailing, advanced technology, and showroom-quality results.</p>
                   <div className="hero-buttons">
                   <Link to={bookNowLink} className="btn btn-primary">Book Now</Link>
            <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
                   </div>
                 </div>
                 
                 {/* The three small images now live here */}
                 <div className="hero-feature-grid">
                   <div className="hero-feature-card">
                     <img src={detailImg} alt="Attention to detail" />
                     <div className="feature-card-overlay">
                       <h4>ATTENTION TO DETAIL</h4>
                     </div>
                   </div>
                   <div className="hero-feature-card">
                     <img src={blackCarImg} alt="Black car" />
                   </div>
                   <div className="hero-feature-card">
                     <img src={trustedImg} alt="Trusted service" />
                   </div>
                 </div>   
                    </div>
      <div className="hero-images">
        <div className="green-car-bg">
         <div className="hero-image-card card-1">
              <div className="card-text">
                <h3>Professional Detailing</h3>
              </div>
            </div>
            <div className="hero-image-card card-2">
              <div className="card-text">
                <h3>Booking anytime, anywhere</h3>
              </div>
            </div>
         </div>
      </div>
    </section>
  );
}

export default HeroSection;