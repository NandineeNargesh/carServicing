// src/components/PricingSection.js

import React from 'react';

// You will need to add these new images to your src/assets folder
import interior1 from '../assets/in1.jpeg';
import interior2 from '../assets/in2.jpg';
import interior3 from '../assets/in3.jpeg';


function PricingSection() {
  return (
    <section id="pricing" className="pricing-section container">
      <div className="pricing-content">

        {/* Left Side: Label and Images */}
        <div className="pricing-left">
          <p className="service-label">[SERVICE] [01] / INTERIOR DETAILING</p>
          <div className="pricing-image-gallery">
            <img src={interior1} alt="Car interior detailing 1" className="pricing-img img-1" />
            <img src={interior2} alt="Car interior detailing 2" className="pricing-img img-2" />
            <img src={interior3} alt="Car interior detailing 3" className="pricing-img img-3" />
          </div>
        </div>

        {/* Right Side: Price and Details */}
        <div className="pricing-right">
          <p className="service-label">[SERVICE] [01]</p>
          <h2 className="price-range">$60 - $120</h2>
          <h3>Specialist of Interior Detailing</h3>
          <p className="pricing-description">
            We provide a comprehensive refresh and protect your vehicle's interior, ensuring a truly clean and safe environment and driving experience.
          </p>
        </div>

      </div>

       <div className="more-services">
        <div className="service-option-card">
          <p className="service-label">[SERVICE] [02] / EXTERIOR WASH</p>
          <h3>Gentle Exterior Wash Service</h3>
          <p>Bring back your car's shine with our gentle yet thorough exterior wash.</p>
          <div className="card-footer">
            <span className="price-range-small">$20 - $50</span>
            <button className="btn btn-primary btn-small">Book Now</button>
          </div>
        </div>
        <div className="service-option-card">
          <p className="service-label">[SERVICE] [03] / PAINT PROTECTION</p>
          <h3>Paint Protection and Coating</h3>
          <p>Protect your car's paint with advanced coatings that deliver lasting shine.</p>
          <div className="card-footer">
            <span className="price-range-small">$40 - $500</span>
            <button className="btn btn-primary btn-small">Book Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;