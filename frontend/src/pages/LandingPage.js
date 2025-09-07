// src/pages/LandingPage.js

import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ServicesSection from './ServicesSection';
import BookingSection from '../components/BookingSection';
import PricingSection from '../components/PricingSection'; // 1. Import the new section
import DetailedServicesSection from '../components/DetailedServicesSection'; // 1. Import it

function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <PricingSection />
      <DetailedServicesSection />
      <BookingSection />
    </>
  );
}

export default LandingPage;
