// src/components/BookingSection.js
import React from 'react';
// Import icons
import { FaInstagram, FaTwitter, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import silverCarImage from '../assets/bll.png';

function BookingSection() {
  return (
    // Note: The ID is "booking" to match the navbar link, as requested.
    <section id="booking" className="contact-section container">
      <div className="contact-main">
        <div className="contact-left">
          <h2>Book Your Premium Car Wash Today</h2>
          <div className="contact-buttons">
            <button className="btn btn-primary">Book Now</button>
          <button 
  className="btn btn-secondary"
  onClick={() => window.location.href = "mailto:nandineenargesh@gmail.com?subject=Inquiry for Car Service&body=Hi Nandinee, I want to know more about..."}
>
  Contact Us
</button>
          </div>
        </div>
        <div className="contact-right">
          <img src={silverCarImage} alt="Silver classic car" />
        </div>
      </div>
      <footer className="footer-content">
        <div className="footer-contact-info">
          <div>
            <p>EMAIL</p>
            <h3>carservices@gmail.com</h3>
          </div>
          <div>
            <p>SOCIAL MEDIA</p>
            <div className="social-links">
              {/* Changed href="#" to href="/" */}
              <a href="/"><FaWhatsapp /></a>
              <a href="/"><FaInstagram /></a>
              <a href="/"><FaTiktok /></a>
              <a href="/"><FaTwitter /></a>
            </div>
          </div>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h4>Service</h4>
            <ul>
              {/* Changed href="#" to href="/" */}
              <li><a href="/">Exterior Wash</a></li>
              <li><a href="/">Interior Wash</a></li>
              <li><a href="/">Painting & Coating</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Official</h4>
            <ul>
              {/* Changed href="#" to href="/" */}
              <li><a href="/">Pune, IND</a></li>
              <li><a href="/">+91 123 456 789</a></li>
              <li><a href="/">08.00 - 16.00</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </section>
  );
}

export default BookingSection;