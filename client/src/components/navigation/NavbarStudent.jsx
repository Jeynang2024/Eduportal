import { useEffect } from "react";

const NavbarStudent = () => {

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
    <nav className="bg-[#004d7a] text-white p-4 shadow">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Student Dashboard</div>
        <div className="flex justify-end p-2 bg-blue-50">
          <div id="google_translate_element"></div>
        </div>
        <ul className="flex space-x-6 text-sm font-medium">
          <li>
            <a href="/student/dashboard" className="hover:text-yellow-300">
              Home
            </a>
          </li>
          <li>
            <a href="/student/leaderboard" className="hover:text-yellow-300">
              Leaderboard
            </a>
          </li>
          <li>
            <a href="/student/scholarships" className="hover:text-yellow-300">
              Scholorship
            </a>
          </li>
          <li>
            <a href="/student/profile" className="hover:text-yellow-300">
              Student Profile
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
console.log("Navbar");
export default NavbarStudent;
