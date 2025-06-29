import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import Cookies from "js-cookie";

const RootLayout = () => {
  const { userRole, userId } = useUser();
  const navigate = useNavigate();

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

  useEffect(() => {
    // console.log("Cookie:", Cookies);
    // console.log("RootLayout useEffect triggered");
    if (userId && userRole === "student") {
      navigate("/student/dashboard", { replace: true });
    } else if (userId && userRole === "educator") {
      navigate("/educator/dashboard", { replace: true });
    }
    // No else: allow landing/about for unauthenticated users
  }, [userRole, userId, navigate]);

  return (
    <>
      <Navbar />
      
      <div>
        <Outlet />
      </div>
    </>
  );
};
export default RootLayout;
