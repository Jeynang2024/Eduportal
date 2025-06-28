import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import Cookies from "js-cookie";

const RootLayout = () => {
const { userRole, userId } = useUser();
  const navigate = useNavigate();

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
