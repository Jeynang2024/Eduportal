import { Outlet } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";

const RootLayout = () => {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
};
export default RootLayout;
