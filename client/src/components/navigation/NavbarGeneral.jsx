import React from 'react';
import { Link } from 'react-router-dom';



import './NavbarGeneral.css';


function NavbarGeneral() {
  return (
    <nav className="navbar">
      <div className="logo-wrapper">
         <div className="logo-container"></div>
            {/* <span className="brand-name">Vision Global Empowerment</span> */}
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li className="become">
  <Link to="/register-educator" className="educator-button">Become an Educator</Link>
</li>
      </ul>
    </nav>
  );
}

export default NavbarGeneral;