import NavbarAdmin from "./NavbarAdmin";
import NavbarEducator from "./NavbarEducator";
import NavbarStudent from "./NavbarStudent";
import NavbarGeneral from "./NavbarGeneral";

const Navbar = ({ userType }) => {
  switch (userType) {
    case "admin":
      return <NavbarAdmin />;
    case "educator":
      return <NavbarEducator />;
    case "student":
      return <NavbarStudent />;
    default:
      return <NavbarGeneral />;
  }
};

export default Navbar;
