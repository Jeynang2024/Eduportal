import NavbarEducator from "./NavbarEducator";
import NavbarStudent from "./NavbarStudent";
import NavbarGeneral from "./NavbarGeneral";

const Navbar = ({ userType }) => {
  switch (userType) {
    case "educator":
      return <NavbarEducator />;
    case "student":
      return <NavbarStudent />;
    default:
      return <NavbarGeneral />;
  }
};

export default Navbar;
