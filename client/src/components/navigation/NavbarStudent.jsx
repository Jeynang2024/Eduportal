const NavbarStudent = () => {

  return (
    <nav className="bg-[#004d7a] text-white p-4 shadow">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Student Dashboard</div>
        <ul className="flex space-x-6 text-sm font-medium">
          <li><a href="/student/dashboard" className="hover:text-yellow-300">Home</a></li>
          <li><a href="/student/scholarships" className="hover:text-yellow-300">Scholorship</a></li>
          <li><a href="/student/profile" className="hover:text-yellow-300">Student Profile</a></li>
        </ul>
      </div>
    </nav>
  );
};
console.log("Navbar");
export default NavbarStudent;
