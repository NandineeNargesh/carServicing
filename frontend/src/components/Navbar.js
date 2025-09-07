// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-scroll'; 
import userProfileImg from '../assets/user.png';

function Navbar() {
  return (
    <nav className="navbar container"> 
      <div className="logo">CarServices</div>
      <ul className="nav-links">
         <li><Link to="home" spy={true} smooth={true} duration={500}>Home</Link></li>
        <li><Link to="services" spy={true} smooth={true} duration={500}>Service</Link></li>
        <li><Link to="booking" spy={true} smooth={true} duration={500}>Booking</Link></li>
        <li><Link to="pricing" spy={true} smooth={true} duration={500}>Pricing</Link></li>
        <li><Link to="contact" spy={true} smooth={true} duration={500}>Contact</Link></li>
      </ul>
      <div className="nav-extra">
         <a href="/login">
            <img src={userProfileImg} alt="User Profile" className="user-profile" />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;