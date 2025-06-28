import React from 'react';
import './AboutUs.css';
import aboutImage from '../assets/aboutimg.jpg';

const AboutUs = () => {
  return (
    <section className="about-section" id="aboutus">
      <div className="about-header">
        <h2 className="section-title">About Us</h2>
        <p className="tagline">EDUCATION • TECHNOLOGY • LEADERSHIP • HEALTH</p>
      </div>

      <div className="about-content">
        <img
          src={aboutImage}
          alt="Visions Global Empowerment India"
          className="about-img"
        />

        <div className="about-text">
          <p>
            <strong>Visions Global Empowerment – India</strong> (“Visions India”) is a registered nonprofit trust under
            the Indian Trusts Act (Reg. No. 65/16) and accredited under the Foreign Contribution Regulation Act (FCRA No. 076040441). 
            Building on the impactful legacy of Visions Global Empowerment (USA)—active in India since 2008—Visions India continues
            to implement transformative educational and community development programs that empower under-served populations.
          </p>

          <h3 className="mission-heading">Our Mission</h3>
          <ul className="mission-list">
            <li>
              Empower youth and communities impacted by poverty, disability, and social inequities through education, technology, leadership, and health.
            </li>
            <li>
              Foster sustainable community development that enhances well-being and supports a vibrant, inclusive civil society.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;