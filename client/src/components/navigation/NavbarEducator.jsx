import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'; // or useHistory for v5

const NavbarEducator = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
const [cookies, , removeCookie] = useCookies(['authToken']);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the authentication cookie
    removeCookie('accessToken', { path: '/' });
    // Redirect to homepage
window.location.href = '/';
  };

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
    <nav className="bg-[#004d7a] px-6 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-6">
        <span className="text-white text-xl font-bold tracking-wide">
          EduPortal
        </span>
        <div className="flex justify-end p-2 bg-blue-50">
          <div id="google_translate_element"></div>
        </div>
        <a
          href="/educator/dashboard"
          className="text-white hover:text-blue-200 transition-colors font-medium"
        >
          Dashboard
        </a>
        <a
          href="/educator/leaderboard"
          className="text-white hover:text-blue-200 transition-colors font-medium"
        >
          Leaderboard
        </a>
        <a
          href="/educator/add-data"
          className="text-white hover:text-blue-200 transition-colors font-medium"
        >
          Add Data
        </a>
        <a
          href="/educator/add-students"
          className="text-white hover:text-blue-200 transition-colors font-medium"
        >
          Add Students
        </a>
      </div>
      <div className="relative">
        <button
          onClick={() => setDropdownOpen((open) => !open)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
        >
          <span className="font-semibold">Educator</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-blue-100 z-50 animate-fade-in">
            <div className="px-4 py-3 border-b border-blue-100">
              <div className="text-xs text-gray-500">Educator</div>
            </div>
            <a
              href="/educator/profile"
              className="block px-4 py-2 text-blue-700 hover:bg-blue-50 transition-colors"
            >
              Profile
            </a>
            <button 
              onClick={handleLogout}

            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarEducator;
