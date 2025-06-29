import React, { useEffect } from 'react';
import StudentProfile from './StudentProfile';
import Scholarships from './Scholarships';

const StudentDashboard = () => {
  const handleNavClick = (id) => {
    const sections = ['home', 'Scholorship', 'profile'];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) element.classList.add('hidden');
    });

    const target = document.getElementById(id);
    if (target) target.classList.remove('hidden');
  };

  useEffect(() => {
    window.handleNavClick = handleNavClick;
    return () => {
      delete window.handleNavClick;
    };
  }, []);

  return (
    <div className="p-6 space-y-10">
      <div id="home" className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-[#004d7a]">🏠 Home Section</h2>
        <p className="text-gray-600 mt-2">Welcome to the student dashboard home!</p>
      </div>

      {/* <div id="My grades" className="hidden bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-[#004d7a]">My grades</h2>
        <p className="text-gray-600 mt-2">Progress Tracking</p>
      </div> */}

    </div>
  );
};

export default StudentDashboard;
