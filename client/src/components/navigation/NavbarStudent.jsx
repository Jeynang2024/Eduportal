import React, { useEffect } from 'react';

const NavbarStudent = () => {
  const handleClick = (id) => {
    if (typeof window.handleNavClick === 'function') {
      window.handleNavClick(id);
    } else {
      console.warn('No handleNavClick found on window.');
    }
  };

  useEffect(() => {
    console.log("NavbarStudent loaded");
  }, []);

  return (
    <nav className="bg-[#004d7a] text-white p-4 shadow">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Student Dashboard</div>
        <ul className="flex space-x-6 text-sm font-medium">
          <li><a href="#" onClick={() => handleClick('home')} className="hover:text-yellow-300">Home</a></li>
          <li><a href="#" onClick={() => handleClick('scholorship')} className="hover:text-yellow-300">Scholorship</a></li>
          <li><a href="#" onClick={() => handleClick('profile')} className="hover:text-yellow-300">Student Profile</a></li>
        </ul>
      </div>
    </nav>
  );
};
console.log("Navbar");
export default NavbarStudent;
