import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "./NavbarGeneral.css";

function NavbarGeneral() {

  useEffect(() => {
      // Inject Google Translate script only once
      if (!window.googleTranslateElementInit) {
        window.googleTranslateElementInit = function () {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,hi,ta,te",
              layout:
                window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            "google_translate_element"
          );
        };
        const script = document.createElement("script");
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      }
    }, []);
  
  return (
    <nav className="navbar bg-[#004d7a]">
      <div className="logo-wrapper">
        <div className="logo-container"></div>
        <div className="flex justify-end p-2 bg-blue-50">
          <div id="google_translate_element"></div>
        </div>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/auth/login">Login</Link>
        </li>
        <li className="become">
          <Link to="/auth/register-educator" className="educator-button">
            Become an Educator
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarGeneral;
