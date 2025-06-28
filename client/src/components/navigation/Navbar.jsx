const Navbar = ({ userType }) => (
  <nav>{userType ? `${userType} Navbar (Dummy)` : "Navbar (Dummy)"}</nav>
);
export default Navbar;
