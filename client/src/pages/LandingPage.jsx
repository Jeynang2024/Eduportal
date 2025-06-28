import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="homepage">
      <div className="hero-content">
        <h1>Empowering Communities Globally</h1>
        <p className="img-content">
          Visions Global Empowerment India is a nonprofit organization committed to implementing
          meaningful education & community development efforts for under-served populations through
        </p>
        <p className="agenda">EDUCATION – LEADERSHIP – TECHNOLOGY – HEALTH</p>
        <Link to="/about" className="cta-button">Explore More</Link>
      </div>
    </div>
  );
};

export default LandingPage;